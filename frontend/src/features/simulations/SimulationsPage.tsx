import { useState } from "react";
import { api } from "../../lib/api";

type Simulation = {
  type: string;
  title: string;
  description: string;
  danger?: boolean;
};

const simulations: Simulation[] = [
  {
    type: "latency",
    title: "API Latency",
    description: "Backend API 응답을 3초 지연시켜 Latency 증가 상황을 시뮬레이션합니다.",
  },
  {
    type: "server-error",
    title: "HTTP 500 Error",
    description: "Backend에서 의도적으로 500 에러를 발생시켜 Error Rate 증가 상황을 만듭니다.",
    danger: true,
  },
  {
    type: "cpu",
    title: "CPU Load",
    description: "Backend CPU 사용률을 일시적으로 증가시켜 부하 상황을 시뮬레이션합니다.",
  },
];

export function SimulationsPage() {
  const [message, setMessage] = useState("");

  const runSimulation = async (type: string) => {
    setMessage("");

    try {
      await api.post(`/api/simulations/${type}`);
      setMessage(`Simulation '${type}' executed. Check Incidents page.`);
    } catch {
      if (type === "server-error") {
        setMessage("500 error simulation executed. Backend intentionally returned an error.");
        return;
      }

      setMessage("Simulation failed. Check permission, token, or backend logs.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Incident Simulation</h1>
        <p className="text-sm text-slate-500">
          장애를 직접 발생시켜 모니터링, Incident, Runbook 흐름을 검증합니다.
        </p>
      </div>

      {message && (
        <div className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {simulations.map((simulation) => (
          <div key={simulation.type} className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">{simulation.title}</h2>
            <p className="mt-2 min-h-16 text-sm text-slate-500">{simulation.description}</p>

            <button
              onClick={() => runSimulation(simulation.type)}
              className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white ${
                simulation.danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Run Simulation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
