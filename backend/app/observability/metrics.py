import time

from prometheus_client import Counter, Histogram


# 전체 HTTP 요청 수
# method, path, status_code 기준으로 요청을 분류한다.
HTTP_REQUESTS_TOTAL = Counter(
    "mediops_http_requests_total",
    "전체 HTTP 요청 수",
    ["method", "path", "status_code"],
)


# HTTP 5xx 오류 수
# Backend 장애 감지용 핵심 지표다.
HTTP_5XX_ERRORS_TOTAL = Counter(
    "mediops_http_5xx_errors_total",
    "HTTP 5xx 오류 수",
    ["method", "path"],
)


# HTTP 요청 처리 시간
# p95 latency 계산에 사용된다.
HTTP_REQUEST_DURATION_SECONDS = Histogram(
    "mediops_http_request_duration_seconds",
    "HTTP 요청 처리 시간",
    ["method", "path"],
    buckets=[0.05, 0.1, 0.3, 0.5, 1, 2, 3, 5, 10],
)


# 장애 시뮬레이션 실행 수
SIMULATION_EXECUTED_TOTAL = Counter(
    "mediops_simulation_executed_total",
    "장애 시뮬레이션 실행 수",
    ["simulation_type"],
)


# Incident 생성 수
INCIDENT_CREATED_TOTAL = Counter(
    "mediops_incident_created_total",
    "Incident 생성 수",
    ["incident_type", "severity"],
)


async def prometheus_metrics_middleware(request, call_next):
    """
    FastAPI Middleware용 함수.

    모든 HTTP 요청에 대해:
    1. 요청 시작 시간 기록
    2. 실제 API 처리
    3. 응답 코드 기록
    4. 응답 시간 기록
    5. 5xx 오류면 오류 카운터 증가
    """
    start_time = time.time()

    method = request.method
    path = request.url.path

    try:
        response = await call_next(request)
        status_code = response.status_code
    except Exception:
        # 처리 중 예외가 발생하면 500으로 기록한 뒤 다시 예외를 발생시킨다.
        status_code = 500

        HTTP_REQUESTS_TOTAL.labels(
            method=method,
            path=path,
            status_code=str(status_code),
        ).inc()

        HTTP_5XX_ERRORS_TOTAL.labels(
            method=method,
            path=path,
        ).inc()

        HTTP_REQUEST_DURATION_SECONDS.labels(
            method=method,
            path=path,
        ).observe(time.time() - start_time)

        raise

    duration = time.time() - start_time

    HTTP_REQUESTS_TOTAL.labels(
        method=method,
        path=path,
        status_code=str(status_code),
    ).inc()

    HTTP_REQUEST_DURATION_SECONDS.labels(
        method=method,
        path=path,
    ).observe(duration)

    if status_code >= 500:
        HTTP_5XX_ERRORS_TOTAL.labels(
            method=method,
            path=path,
        ).inc()

    return response
