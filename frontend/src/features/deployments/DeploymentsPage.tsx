import { StatusBadge } from "../../components/ui/StatusBadge";

export function DeploymentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Deployments</h1>
        <p className="text-sm text-slate-500">
          GitHub Actions, Artifact Registry, Argo CD 배포 상태를 확인하는 화면입니다.
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="font-medium text-slate-900">GitHub Actions CI</div>
              <div className="text-sm text-slate-500">Frontend/Backend test and build</div>
            </div>
            <StatusBadge status="NOT_CHECKED" />
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="font-medium text-slate-900">Artifact Registry</div>
              <div className="text-sm text-slate-500">Docker image push status</div>
            </div>
            <StatusBadge status="NOT_CHECKED" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900">Argo CD Sync</div>
              <div className="text-sm text-slate-500">GitOps deployment sync status</div>
            </div>
            <StatusBadge status="NOT_CHECKED" />
          </div>
        </div>
      </div>
    </div>
  );
}
