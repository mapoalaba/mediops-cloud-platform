import { StatusBadge } from "../../components/ui/StatusBadge";

/**
 * 보안 점검 항목 목록
 */
const checks = [
  {
    name: "JWT 인증",
    status: "PASS",
    description: "사용자 로그인 후 JWT Access Token을 사용해 API 요청을 인증합니다.",
  },
  {
    name: "역할 기반 접근 제어",
    status: "PASS",
    description: "SRE, 보안 관리자, 병원 관리자, 시스템 관리자 등 역할별 권한을 구분합니다.",
  },
  {
    name: "환자 데이터 마스킹",
    status: "PASS",
    description: "권한에 따라 환자의 민감정보를 마스킹하여 노출을 제한합니다.",
  },
  {
    name: "감사 로그",
    status: "READY",
    description: "환자 조회, 예약 생성, 장애 시뮬레이션 등 주요 행위를 기록합니다.",
  },
  {
    name: "Kubernetes RBAC",
    status: "PLANNED",
    description: "GKE 배포 단계에서 ServiceAccount와 Role을 분리해 권한을 최소화합니다.",
  },
  {
    name: "Workload Identity Federation",
    status: "PLANNED",
    description: "GitHub Actions에서 장기 JSON Key 없이 GCP에 안전하게 인증하도록 구성합니다.",
  },
];

/**
 * 보안 정책 페이지
 * 현재 프로젝트에 적용했거나 적용 예정인 보안 요소를 보여준다.
 */
export function SecurityPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">보안 정책</h1>
        <p className="text-sm text-slate-500">
          인증, 인가, 데이터 마스킹, 감사 로그, IAM/RBAC 등 보안 적용 상태를 확인합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map((check) => (
          <div
            key={check.name}
            className="rounded-xl bg-white p-5 shadow-sm border border-slate-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-slate-900">{check.name}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {check.description}
                </p>
              </div>

              <StatusBadge status={check.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
