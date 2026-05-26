import { useEffect, useState } from "react";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { api } from "../../lib/api";
import type { Patient } from "../../types/patient";

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
        <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
        <p className="text-sm text-slate-500">
          의료 SaaS 샘플 환자 데이터를 조회합니다. SRE 권한에서는 민감정보가 마스킹됩니다.
        </p>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading patients...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Birth Date</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Department</th>
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
                    No patients found.
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
