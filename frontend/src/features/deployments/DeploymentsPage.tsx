import { StatusBadge } from "../../components/ui/StatusBadge";

/**
 * 배포 현황 페이지
 * GitHub Actions, Artifact Registry, Argo CD, GKE 배포 흐름을 설명한다.
 */
export function DeploymentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">배포 현황</h1>
        <p className="text-sm text-slate-500">
          GitHub Actions, Artifact Registry, Argo CD 기반 배포 흐름을 확인합니다.
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="font-medium text-slate-900">GitHub Actions CI</div>
              <div className="text-sm text-slate-500">
                Frontend/Backend 테스트와 Docker 이미지 빌드를 자동으로 수행합니다.
              </div>
            </div>
            <StatusBadge status="NOT_CHECKED" />
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="font-medium text-slate-900">Artifact Registry</div>
              <div className="text-sm text-slate-500">
                빌드된 Docker 이미지를 GCP Artifact Registry에 저장합니다.
              </div>
            </div>
            <StatusBadge status="NOT_CHECKED" />
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="font-medium text-slate-900">Argo CD GitOps</div>
              <div className="text-sm text-slate-500">
                Git Repository의 Kubernetes Manifest 변경을 감지해 GKE에 자동 배포합니다.
              </div>
            </div>
            <StatusBadge status="NOT_CHECKED" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900">GKE 배포 상태</div>
              <div className="text-sm text-slate-500">
                Frontend, Backend, Worker Pod가 Kubernetes에서 정상 실행되는지 확인합니다.
              </div>
            </div>
            <StatusBadge status="PLANNED" />
          </div>
        </div>
      </div>
    </div>
  );
}
