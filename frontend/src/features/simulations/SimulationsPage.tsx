import { useState } from "react";
import { api } from "../../lib/api";

/**
 * 장애 시뮬레이션 카드 타입
 */
type Simulation = {
  type: string;
  title: string;
  description: string;
  danger?: boolean;
};

/**
 * 화면에 표시할 장애 시뮬레이션 목록
 */
const simulations: Simulation[] = [
  {
    type: "latency",
    title: "API 응답 지연",
    description: "Backend API 응답을 의도적으로 지연시켜 Latency 증가 상황을 재현합니다.",
  },
  {
    type: "server-error",
    title: "HTTP 500 오류",
    description: "Backend에서 의도적으로 500 오류를 발생시켜 Error Rate 증가 상황을 재현합니다.",
    danger: true,
  },
  {
    type: "cpu",
    title: "CPU 부하",
    description: "Backend CPU 사용률을 일시적으로 증가시켜 부하 상황을 재현합니다.",
  },
];

/**
 * 장애 시뮬레이션 페이지
 * 운영자가 장애 상황을 직접 발생시켜 모니터링과 Incident 흐름을 확인할 수 있다.
 */
export function SimulationsPage() {
  const [message, setMessage] = useState("");

  /**
   * 선택한 장애 시뮬레이션 실행
   */
  const runSimulation = async (type: string) => {
    setMessage("");

    try {
      await api.post(`/api/simulations/${type}`);
      setMessage(`'${type}' 시뮬레이션이 실행되었습니다. 장애 이력 화면을 확인하세요.`);
    } catch {
      if (type === "server-error") {
        setMessage("500 오류 시뮬레이션이 실행되었습니다. 의도적으로 오류가 발생한 상태입니다.");
        return;
      }

      setMessage("시뮬레이션 실행에 실패했습니다. 권한, 토큰 또는 Backend 로그를 확인하세요.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">장애 시뮬레이션</h1>
        <p className="text-sm text-slate-500">
          장애를 직접 발생시켜 모니터링, 장애 이력, Runbook 대응 흐름을 검증합니다.
        </p>
      </div>

      {message && (
        <div className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {simulations.map((simulation) => (
          <div
            key={simulation.type}
            className="rounded-xl bg-white p-5 shadow-sm border border-slate-200"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {simulation.title}
            </h2>
            <p className="mt-2 min-h-16 text-sm text-slate-500">
              {simulation.description}
            </p>

            <button
              onClick={() => runSimulation(simulation.type)}
              className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white ${
                simulation.danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              시뮬레이션 실행
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
