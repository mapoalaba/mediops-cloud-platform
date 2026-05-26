import { StatusBadge } from "../../components/ui/StatusBadge";

const checks = [
  {
    name: "JWT Authentication",
    status: "PASS",
    description: "사용자 로그인 후 JWT Access Token을 사용합니다.",
  },
  {
    name: "Role-Based Authorization",
    status: "PASS",
    description: "SRE, SECURITY_ADMIN, HOSPITAL_ADMIN 등 역할 기반 접근 제어를 적용합니다.",
  },
  {
    name: "Patient Data Masking",
    status: "PASS",
    description: "SRE/보안 계정에서는 환자 민감정보가 마스킹됩니다.",
  },
  {
    name: "Audit Log",
    status: "READY",
    description: "주요 사용자 행위 기록을 위한 감사 로그 구조를 준비합니다.",
  },
  {
    name: "Kubernetes RBAC",
    status: "PLANNED",
    description: "GKE 배포 단계에서 ServiceAccount와 Role을 분리합니다.",
  },
  {
    name: "Workload Identity Federation",
    status: "PLANNED",
    description: "GitHub Actions 인증에서 장기 JSON Key를 제거합니다.",
  },
];

export function SecurityPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Security Policy</h1>
        <p className="text-sm text-slate-500">
          IAM, RBAC, 데이터 마스킹, 감사 로그 등 보안 적용 상태를 확인합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map((check) => (
          <div key={check.name} className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-slate-900">{check.name}</h2>
                <p className="mt-2 text-sm text-slate-500">{check.description}</p>
              </div>

              <StatusBadge status={check.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
