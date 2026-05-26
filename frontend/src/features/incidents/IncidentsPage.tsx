import { useEffect, useState } from "react";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { api } from "../../lib/api";
import type { Incident } from "../../types/incident";

export function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

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
          <h1 className="text-2xl font-bold text-slate-900">Incidents</h1>
          <p className="text-sm text-slate-500">
            장애 시뮬레이션 및 운영 이벤트 이력을 확인합니다.
          </p>
        </div>

        <button
          onClick={loadIncidents}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading incidents...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Severity</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Service</th>
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
                    No incidents found. Run a simulation first.
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
