import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../lib/auth";

/**
 * 상단 헤더 컴포넌트
 * 현재 로그인한 사용자 정보와 로그아웃 버튼을 보여준다.
 */
export function Header() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
      <div>
        <div className="font-semibold text-slate-900">
          MediOps Cloud Platform
        </div>
        <div className="text-xs text-slate-500">
          의료 SaaS · 클라우드 DevOps/SRE 운영 대시보드
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="text-right">
            <div className="text-sm font-medium text-slate-900">
              {user.name}
            </div>
            <div className="text-xs text-slate-500">
              권한: {user.role}
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
