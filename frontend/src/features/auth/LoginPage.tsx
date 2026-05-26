import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { saveAuth } from "../../lib/auth";
import type { LoginResponse } from "../../types/user";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("sre@example.com");
  const [password, setPassword] = useState("sre1234");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post<LoginResponse>("/api/auth/login", {
        email,
        password,
      });

      saveAuth(response.data.access_token, response.data.user);
      navigate("/dashboard");
    } catch {
      setError("로그인에 실패했습니다. 계정 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8">
          <div className="text-2xl font-bold text-slate-900">MediOps Cloud Platform</div>
          <div className="mt-2 text-sm text-slate-500">
            Medical SaaS SRE · DevOps 운영 대시보드
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Login
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-slate-50 p-4 text-xs text-slate-600">
          <div className="font-semibold text-slate-800 mb-2">Demo Accounts</div>
          <div>SRE: sre@example.com / sre1234</div>
          <div>Admin: admin@example.com / admin1234</div>
          <div>Hospital: hospital@example.com / hospital1234</div>
          <div>Security: security@example.com / security1234</div>
        </div>
      </div>
    </div>
  );
}
