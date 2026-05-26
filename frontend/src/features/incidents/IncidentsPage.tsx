import { useEffect, useState } from "react";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { api } from "../../lib/api";
import type { Incident } from "../../types/incident";

/**
 * 장애 이력 페이지
 * 장애 시뮬레이션 또는 운영 중 발생한 Incident 기록을 조회한다.
 */
export function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * 장애 이력 목록 조회
   */
  const loadIncidents = () => {
    setLoading(true);

    api
      .get<Incident[]>("/api/incidents")
      .then((response) => setIncidents(response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">장애 이력</h1>
          <p className="text-sm text-slate-500">
            장애 시뮬레이션 및 운영 이벤트 이력을 확인합니다.
          </p>
        </div>

        <button
          onClick={loadIncidents}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
        >
          새로고침
        </button>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            장애 이력을 불러오는 중입니다...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-left">장애 ID</th>
                <th className="p-3 text-left">제목</th>
                <th className="p-3 text-left">유형</th>
                <th className="p-3 text-left">심각도</th>
                <th className="p-3 text-left">상태</th>
                <th className="p-3 text-left">영향 서비스</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id} className="border-t border-slate-100">
                  <td className="p-3">{incident.id}</td>
                  <td className="p-3 font-medium">{incident.title}</td>
                  <td className="p-3">{incident.incident_type}</td>
                  <td className="p-3">
                    <StatusBadge status={incident.severity} />
                  </td>
                  <td className="p-3">
                    <StatusBadge status={incident.status} />
                  </td>
                  <td className="p-3">{incident.affected_service || "-"}</td>
                </tr>
              ))}

              {incidents.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500">
                    등록된 장애 이력이 없습니다. 장애 시뮬레이션을 먼저 실행해보세요.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
