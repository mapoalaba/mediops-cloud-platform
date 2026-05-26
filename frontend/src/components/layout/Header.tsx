import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../lib/auth";

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
        <div className="font-semibold text-slate-900">MediOps Cloud Platform</div>
        <div className="text-xs text-slate-500">Medical SaaS SRE · DevOps Dashboard</div>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="text-right">
            <div className="text-sm font-medium text-slate-900">{user.name}</div>
            <div className="text-xs text-slate-500">{user.role}</div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
