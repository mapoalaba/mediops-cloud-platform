import { FormEvent, useEffect, useState } from "react";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { api } from "../../lib/api";
import type { Appointment } from "../../types/appointment";

/**
 * 예약 관리 페이지
 * - 예약 목록 조회
 * - 병원 관리자 또는 시스템 관리자의 예약 생성
 */
export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // 예약 생성 폼 상태값
  const [patientId, setPatientId] = useState("1");
  const [department, setDepartment] = useState("내과");
  const [appointmentDate, setAppointmentDate] = useState("2026-06-03 09:00");
  const [message, setMessage] = useState("");

  /**
   * 예약 목록을 Backend API에서 불러온다.
   */
  const loadAppointments = () => {
    setLoading(true);

    api
      .get<Appointment[]>("/api/appointments")
      .then((response) => setAppointments(response.data))
      .catch(() => setMessage("예약 목록 조회에 실패했습니다. 로그인 권한을 확인하세요."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  /**
   * 예약 생성 요청
   * HOSPITAL_ADMIN 또는 SYSTEM_ADMIN 권한이 필요하다.
   */
  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      await api.post("/api/appointments", {
        patient_id: Number(patientId),
        department,
        appointment_date: appointmentDate,
      });

      setMessage("예약이 성공적으로 생성되었습니다.");
      loadAppointments();
    } catch {
      setMessage("예약 생성에 실패했습니다. 병원 관리자 또는 시스템 관리자 권한이 필요합니다.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">예약 관리</h1>
        <p className="text-sm text-slate-500">
          환자의 진료 예약을 조회하고 새 예약을 생성합니다.
        </p>
      </div>

      {message && (
        <div className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-4">새 예약 생성</h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                환자 ID
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                value={patientId}
                onChange={(event) => setPatientId(event.target.value)}
              />
              <p className="mt-1 text-xs text-slate-400">
                예시: 1번 환자에게 예약을 생성합니다.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                진료과
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                예약 일시
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                value={appointmentDate}
                onChange={(event) => setAppointmentDate(event.target.value)}
              />
              <p className="mt-1 text-xs text-slate-400">
                예시: 2026-06-03 09:00
              </p>
            </div>

            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              예약 생성
            </button>
          </form>

          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            예약 생성은 hospital@example.com 또는 admin@example.com 계정으로 로그인해야 합니다.
          </div>
        </div>

        <div className="xl:col-span-2 rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-slate-500">
              예약 목록을 불러오는 중입니다...
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-3 text-left">예약 ID</th>
                  <th className="p-3 text-left">환자 ID</th>
                  <th className="p-3 text-left">진료과</th>
                  <th className="p-3 text-left">예약 일시</th>
                  <th className="p-3 text-left">상태</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-t border-slate-100">
                    <td className="p-3">{appointment.id}</td>
                    <td className="p-3">{appointment.patient_id}</td>
                    <td className="p-3">{appointment.department}</td>
                    <td className="p-3">{appointment.appointment_date}</td>
                    <td className="p-3">
                      <StatusBadge status={appointment.status} />
                    </td>
                  </tr>
                ))}

                {appointments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500">
                      등록된 예약이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
