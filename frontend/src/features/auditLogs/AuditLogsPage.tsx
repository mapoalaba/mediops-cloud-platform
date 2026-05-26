import { useEffect, useState } from "react";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { api } from "../../lib/api";
import type { AuditLog } from "../../types/auditLog";

/**
 * 감사 로그 페이지
 * - 환자 조회, 예약 생성, 장애 시뮬레이션 등 주요 행위를 기록하고 조회한다.
 * - SECURITY_ADMIN 또는 SYSTEM_ADMIN 권한이 필요하다.
 */
export function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * 감사 로그 목록 조회
   */
  const loadLogs = () => {
    setLoading(true);
    setError("");

    api
      .get<AuditLog[]>("/api/audit-logs")
      .then((response) => setLogs(response.data))
      .catch(() => {
        setError("감사 로그 조회에 실패했습니다. 보안 관리자 또는 시스템 관리자 권한이 필요합니다.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">감사 로그</h1>
          <p className="text-sm text-slate-500">
            환자 조회, 예약 생성, 장애 시뮬레이션 등 주요 사용자 행위 기록을 확인합니다.
          </p>
        </div>

        <button
          onClick={loadLogs}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
        >
          새로고침
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            감사 로그를 불러오는 중입니다...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-left">로그 ID</th>
                <th className="p-3 text-left">사용자 ID</th>
                <th className="p-3 text-left">권한</th>
                <th className="p-3 text-left">행위</th>
                <th className="p-3 text-left">대상</th>
                <th className="p-3 text-left">결과</th>
                <th className="p-3 text-left">메시지</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t border-slate-100">
                  <td className="p-3">{log.id}</td>
                  <td className="p-3">{log.user_id || "-"}</td>
                  <td className="p-3">{log.user_role || "-"}</td>
                  <td className="p-3 font-medium">{log.action}</td>
                  <td className="p-3">
                    {log.resource_type || "-"} {log.resource_id ? `#${log.resource_id}` : ""}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={log.result} />
                  </td>
                  <td className="p-3">{log.message || "-"}</td>
                </tr>
              ))}

              {logs.length === 0 && !error && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    조회된 감사 로그가 없습니다.
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
