import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateIncidentModal } from "./components/CreateIncidentModal";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { IncidentDetailPage } from "./pages/IncidentDetailPage";
import { useIncidents, useIncidentStats } from "./hooks/useIncidents";
import { IncidentCard } from "./components/IncidentCard";
import type { Incident } from "./types";
import { Toaster } from "react-hot-toast";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IT</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-900">
                Incident Tracker
              </h1>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/incidents"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Incidents
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 transition-colors font-medium border border-red-100 bg-red-50 px-3 py-1 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/incidents/:id" element={<IncidentDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </div>
  );
}

function HomePage() {
  const { data: stats, isLoading: statsLoading } = useIncidentStats();
  const { data: incidentsData, isLoading: incidentsLoading } = useIncidents(
    1,
    3,
  );

  if (statsLoading || incidentsLoading)
    return <div className="text-slate-500 p-8">Loading...</div>;

  const statCards = [
    { label: "Open", value: stats?.OPEN || 0, color: "bg-red-500" },
    {
      label: "In Progress",
      value: stats?.IN_PROGRESS || 0,
      color: "bg-amber-500",
    },
    { label: "Resolved", value: stats?.RESOLVED || 0, color: "bg-emerald-500" },
    { label: "Total", value: stats?.TOTAL || 0, color: "bg-blue-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-600 mt-1">
          Overview of all incidents and system health
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${stat.color}`} />
              <span className="text-slate-600 font-medium">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Latest Activity
        </h3>
        <Link
          to="/incidents"
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View All
        </Link>
      </div>
      <div>
        {incidentsData?.data?.length ? (
          incidentsData.data.map((incident: Incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))
        ) : (
          <p className="text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center">
            No recent activity found.
          </p>
        )}
      </div>
    </div>
  );
}

function IncidentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: response, isLoading } = useIncidents();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Incidents</h2>
          <p className="text-slate-600 mt-1">Manage and track all incidents</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + New Incident
        </button>
      </div>

      {isLoading ? (
        <div className="text-slate-500">Loading incidents...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {response?.data?.length ? (
            response.data.map((incident: Incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
              <p className="text-slate-500">
                No incidents found. Create your first one!
              </p>
            </div>
          )}
        </div>
      )}

      <CreateIncidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
