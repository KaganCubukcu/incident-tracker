import { AlertTriangle, LayoutDashboard, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const navItems = [
  {
    to: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    to: "/incident",
    icon: AlertTriangle,
    label: "Incidents",
  },
];

interface SidebarProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

export function Sidebar({ onLogout, isLoggedIn }: SidebarProps) {
  const location = useLocation();
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[220px] flex flex-col justify-between"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 px-5 py-6">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--accent-blue)" }}
          >
            <span className="text-white font-bold text-sm">IT</span>
          </div>
          <span
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Tracker
          </span>
        </div>
        {/* Nav Links */}
        <nav className="flex flex-col gap-1 px-3 mt-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive
                    ? "var(--accent-blue)"
                    : "transparent",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Bottom: Logout */}
      {isLoggedIn && (
        <div className="px-3 pb-6">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full transition-colors cursor-pointer"
            style={{ color: "var(--status-critical)" }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
