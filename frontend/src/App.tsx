import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
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
              <a
                href="/"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Dashboard
              </a>
              <a
                href="/incidents"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Incidents
              </a>
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
        </Routes>
      </main>
    </div>
  )
}

// Placeholder pages - will be implemented in separate files
function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-600 mt-1">
          Overview of all incidents and system health
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Open', value: '12', color: 'bg-red-500' },
          { label: 'In Progress', value: '8', color: 'bg-amber-500' },
          { label: 'Resolved', value: '24', color: 'bg-emerald-500' },
          { label: 'Total', value: '44', color: 'bg-blue-500' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${stat.color}`} />
              <span className="text-slate-600 font-medium">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Incidents
        </h3>
        <p className="text-slate-500">
          Connect to backend to see incidents...
        </p>
      </div>
    </div>
  )
}

function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Incidents</h2>
          <p className="text-slate-600 mt-1">Manage and track all incidents</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + New Incident
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <p className="text-slate-500">Incident list will appear here...</p>
        </div>
      </div>
    </div>
  )
}

function IncidentDetailPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Incident Details</h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <p className="text-slate-500">Incident details will appear here...</p>
      </div>
    </div>
  )
}

export default App
