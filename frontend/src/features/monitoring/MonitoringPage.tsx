export function MonitoringPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Monitoring</h1>
        <p className="text-sm text-slate-500">
          Prometheus와 Grafana를 통해 서비스 메트릭을 확인합니다.
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
            Backend /metrics 및 서비스 메트릭 수집 상태를 확인합니다.
          </p>
        </a>

        <a
          href="http://localhost:3001"
          target="_blank"
          className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 hover:border-blue-400"
        >
          <h2 className="font-semibold text-slate-900">Grafana</h2>
          <p className="mt-2 text-sm text-slate-500">
            API Latency, Error Rate, Pod 상태를 시각화합니다.
          </p>
        </a>

        <a
          href="http://localhost:8000/metrics"
          target="_blank"
          className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 hover:border-blue-400"
        >
          <h2 className="font-semibold text-slate-900">Backend /metrics</h2>
          <p className="mt-2 text-sm text-slate-500">
            FastAPI Backend에서 노출하는 Prometheus Metric 원본을 확인합니다.
          </p>
        </a>

        <a
          href="http://localhost:8000/docs"
          target="_blank"
          className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 hover:border-blue-400"
        >
          <h2 className="font-semibold text-slate-900">Swagger Docs</h2>
          <p className="mt-2 text-sm text-slate-500">
            Backend API 문서와 테스트 화면을 확인합니다.
          </p>
        </a>
      </div>
    </div>
  );
}
