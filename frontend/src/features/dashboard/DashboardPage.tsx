
import { MetricCard } from "../../components/ui/MetricCard";

import { StatusBadge } from "../../components/ui/StatusBadge";

/**

 * 대시보드 페이지

 * 서비스 상태, API 상태, 장애 현황, 전체 아키텍처 범위를 요약해서 보여준다.

 */

export function DashboardPage() {

  return (

    <div>

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-900">서비스 대시보드</h1>

        <p className="text-sm text-slate-500">

          의료 SaaS 서비스와 DevOps/SRE 운영 상태를 한눈에 확인합니다.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <MetricCard

          title="서비스 상태"

          value="정상"

          description="전체 서비스 정상 운영 중"

        />

        <MetricCard

          title="API 성공률"

          value="99.2%"

          description="최근 24시간 기준"

        />

        <MetricCard

          title="p95 응답시간"

          value="320ms"

          description="Backend API 기준"

        />

        <MetricCard

          title="진행 중 장애"

          value="0"

          description="현재 미해결 장애 수"

        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">

          <h2 className="font-semibold text-slate-900 mb-4">

            시스템 구성 요소

          </h2>

          <div className="space-y-3">

            {[

              ["Frontend", "RUNNING"],

              ["Backend API", "RUNNING"],

              ["Worker", "RUNNING"],

              ["PostgreSQL", "CONNECTED"],

              ["Redis", "CONNECTED"],

              ["GKE", "NOT_CHECKED"],

            ].map(([name, status]) => (

              <div

                key={name}

                className="flex items-center justify-between border-b border-slate-100 pb-3"

              >

                <div className="text-sm font-medium text-slate-700">

                  {name}

                </div>

                <StatusBadge status={status} />

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">

          <h2 className="font-semibold text-slate-900 mb-4">

            프로젝트 구현 범위

          </h2>

          <div className="grid grid-cols-2 gap-3 text-sm">

            <div className="rounded-lg bg-slate-50 p-3">GCP 클라우드 인프라</div>

            <div className="rounded-lg bg-slate-50 p-3">GKE Kubernetes</div>

            <div className="rounded-lg bg-slate-50 p-3">Terraform IaC</div>

            <div className="rounded-lg bg-slate-50 p-3">GitHub Actions</div>

            <div className="rounded-lg bg-slate-50 p-3">Argo CD GitOps</div>

            <div className="rounded-lg bg-slate-50 p-3">Prometheus/Grafana</div>

            <div className="rounded-lg bg-slate-50 p-3">장애 대응 Runbook</div>

            <div className="rounded-lg bg-slate-50 p-3">보안 정책</div>

          </div>

        </div>

      </div>

    </div>

  );

}

