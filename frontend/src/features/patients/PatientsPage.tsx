import { useEffect, useState } from "react";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { api } from "../../lib/api";
import type { Patient } from "../../types/patient";

/**
 * 환자 관리 페이지
 * 로그인한 사용자의 권한에 따라 환자 정보가 마스킹되어 표시될 수 있다.
 */
export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Patient[]>("/api/patients")
      .then((response) => setPatients(response.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">환자 관리</h1>
        <p className="text-sm text-slate-500">
          의료 SaaS 샘플 환자 데이터를 조회합니다. 권한에 따라 민감정보가 마스킹될 수 있습니다.
        </p>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            환자 목록을 불러오는 중입니다...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-left">환자 코드</th>
                <th className="p-3 text-left">이름</th>
                <th className="p-3 text-left">생년월일</th>
                <th className="p-3 text-left">연락처</th>
                <th className="p-3 text-left">상태</th>
                <th className="p-3 text-left">진료과</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t border-slate-100">
                  <td className="p-3 font-medium">{patient.patient_code}</td>
                  <td className="p-3">{patient.name}</td>
                  <td className="p-3">{patient.birth_date}</td>
                  <td className="p-3">{patient.phone || "-"}</td>
                  <td className="p-3">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="p-3">{patient.department || "-"}</td>
                </tr>
              ))}

              {patients.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500">
                    등록된 환자 데이터가 없습니다.
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
