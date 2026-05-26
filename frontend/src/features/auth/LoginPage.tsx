import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { saveAuth } from "../../lib/auth";
import type { LoginResponse } from "../../types/user";

/**
 * 로그인 페이지
 * 사용자가 이메일/비밀번호로 로그인하면 JWT 토큰과 사용자 정보를 localStorage에 저장한다.
 */
export function LoginPage() {
  const navigate = useNavigate();

  // 기본값은 시연용 SRE 계정
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

      // 로그인 성공 시 토큰과 사용자 정보를 저장
      saveAuth(response.data.access_token, response.data.user);

      // 로그인 후 대시보드로 이동
      navigate("/dashboard");
    } catch {
      setError("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8">
          <div className="text-2xl font-bold text-slate-900">
            MediOps Cloud Platform
          </div>
          <div className="mt-2 text-sm text-slate-500">
            의료 SaaS 클라우드 운영 대시보드
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
              이메일
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              비밀번호
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            로그인
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-slate-50 p-4 text-xs text-slate-600">
          <div className="font-semibold text-slate-800 mb-2">시연용 계정</div>
          <div>SRE 운영자: sre@example.com / sre1234</div>
          <div>시스템 관리자: admin@example.com / admin1234</div>
          <div>병원 관리자: hospital@example.com / hospital1234</div>
          <div>보안 관리자: security@example.com / security1234</div>
        </div>
      </div>
    </div>
  );
}
