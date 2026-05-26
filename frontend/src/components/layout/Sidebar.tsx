import { NavLink } from "react-router-dom";

/**
 * Sidebar 메뉴 목록
 * path는 실제 라우팅 주소이고, label은 화면에 표시되는 한글 메뉴명이다.
 */
const menus = [
  { label: "대시보드", path: "/dashboard" },
  { label: "환자 관리", path: "/patients" },
  { label: "예약 관리", path: "/appointments" },
  { label: "장애 이력", path: "/incidents" },
  { label: "장애 시뮬레이션", path: "/simulations" },
  { label: "보안 정책", path: "/security" },
  { label: "감사 로그", path: "/audit-logs" },
  { label: "모니터링", path: "/monitoring" },
  { label: "배포 현황", path: "/deployments" },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-slate-950 text-white p-4">
      <div className="mb-6">
        <div className="text-xl font-bold">MediOps</div>
        <div className="text-xs text-slate-400">
          의료 SaaS 운영 플랫폼
        </div>
      </div>

      <nav className="space-y-1">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {menu.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
