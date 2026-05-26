/**
 * 모니터링 페이지
 * Prometheus, Grafana, Backend metrics, Swagger 문서로 이동할 수 있는 링크를 제공한다.
 */
export function MonitoringPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">모니터링</h1>
        <p className="text-sm text-slate-500">
          Prometheus와 Grafana를 통해 API 요청 수, 오류 수, 응답 시간 등 서비스 메트릭을 확인합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="http://localhost:9090"
          target="_blank"
          className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 hover:border-blue-400"
        >
          <h2 className="font-semibold text-slate-900">Prometheus</h2>
          <p className="mt-2 text-sm text-slate-500">
            Backend /metrics 엔드포인트를 수집하고 Alert Rule을 확인합니다.
          </p>
        </a>

        <a
          href="http://localhost:3001"
          target="_blank"
          className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 hover:border-blue-400"
        >
          <h2 className="font-semibold text-slate-900">Grafana</h2>
          <p className="mt-2 text-sm text-slate-500">
            API 응답 시간, 오류율, 장애 시뮬레이션 지표를 대시보드로 확인합니다.
          </p>
        </a>

        <a
          href="http://localhost:8000/metrics"
          target="_blank"
          className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 hover:border-blue-400"
        >
          <h2 className="font-semibold text-slate-900">Backend Metrics</h2>
          <p className="mt-2 text-sm text-slate-500">
            FastAPI Backend가 노출하는 Prometheus Metric 원본을 확인합니다.
          </p>
        </a>

        <a
          href="http://localhost:8000/docs"
          target="_blank"
          className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 hover:border-blue-400"
        >
          <h2 className="font-semibold text-slate-900">API 문서</h2>
          <p className="mt-2 text-sm text-slate-500">
            Swagger 화면에서 Backend API 명세와 테스트를 확인합니다.
          </p>
        </a>
      </div>
    </div>
  );
}
