from fastapi import APIRouter, Response
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest


router = APIRouter(tags=["모니터링"])


@router.get("/metrics")
def metrics():
    """
    Prometheus Metrics 노출 API.

    Prometheus는 이 엔드포인트를 주기적으로 호출해서
    Backend API 요청 수, 오류 수, 응답 시간 등의 지표를 수집한다.
    """
    return Response(
        content=generate_latest(),
        media_type=CONTENT_TYPE_LATEST,
    )
