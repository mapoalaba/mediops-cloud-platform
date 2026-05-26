import { NavLink } from "react-router-dom";

const menus = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Patients", path: "/patients" },
  { label: "Incidents", path: "/incidents" },
  { label: "Simulations", path: "/simulations" },
  { label: "Security", path: "/security" },
  { label: "Monitoring", path: "/monitoring" },
  { label: "Deployments", path: "/deployments" },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-slate-950 text-white p-4">
      <div className="mb-6">
        <div className="text-xl font-bold">MediOps</div>
        <div className="text-xs text-slate-400">GCP · GKE · SRE</div>
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
