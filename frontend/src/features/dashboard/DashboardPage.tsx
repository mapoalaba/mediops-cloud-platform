import { MetricCard } from "../../components/ui/MetricCard";
import { StatusBadge } from "../../components/ui/StatusBadge";

export function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Service Dashboard</h1>
        <p className="text-sm text-slate-500">
          의료 SaaS 서비스와 DevOps/SRE 운영 상태를 한눈에 확인합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Service Status" value="NORMAL" description="All services are healthy" />
        <MetricCard title="API Success Rate" value="99.2%" description="Last 24 hours" />
        <MetricCard title="p95 Latency" value="320ms" description="Backend API" />
        <MetricCard title="Active Incidents" value="0" description="Open incidents" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-4">System Components</h2>

          <div className="space-y-3">
            {[
              ["Frontend", "RUNNING"],
              ["Backend API", "RUNNING"],
              ["Worker", "RUNNING"],
              ["PostgreSQL", "CONNECTED"],
              ["Redis", "CONNECTED"],
              ["GKE", "NOT_CHECKED"],
            ].map(([name, status]) => (
              <div key={name} className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="text-sm font-medium text-slate-700">{name}</div>
                <StatusBadge status={status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-4">Architecture Scope</h2>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-slate-50 p-3">GCP Infrastructure</div>
            <div className="rounded-lg bg-slate-50 p-3">GKE Kubernetes</div>
            <div className="rounded-lg bg-slate-50 p-3">Terraform IaC</div>
            <div className="rounded-lg bg-slate-50 p-3">GitHub Actions</div>
            <div className="rounded-lg bg-slate-50 p-3">Argo CD GitOps</div>
            <div className="rounded-lg bg-slate-50 p-3">Prometheus/Grafana</div>
            <div className="rounded-lg bg-slate-50 p-3">Incident Runbook</div>
            <div className="rounded-lg bg-slate-50 p-3">Security Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
