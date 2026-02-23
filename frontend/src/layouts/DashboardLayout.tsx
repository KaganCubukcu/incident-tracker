import type React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Sidebar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <main className="ml-[220px] p-8">{children}</main>
    </div>
  );
}
