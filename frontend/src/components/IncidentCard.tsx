import { Link } from "react-router-dom";
import type { Incident } from "../types";

interface Props {
  incident: Incident;
}

const severityColors = {
  LOW: "bg-blue-100 text-blue-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

const statusColors = {
  OPEN: "border-red-200 text-red-600",
  IN_PROGRESS: "border-amber-200 text-amber-600",
  RESOLVED: "border-emerald-200 text-emerald-600",
  CLOSED: "border-slate-200 text-slate-600",
};

export function IncidentCard({ incident }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:border-blue-300 transition-all group">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                severityColors[incident.priority]
              }`}
            >
              {incident.priority}
            </span>
            <span className="text-xs text-slate-400">
              #{incident.id.toString().padStart(4, "0")}
            </span>
          </div>
          <Link
            to={`/incidents/${incident.id}`}
            className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors block"
          >
            {incident.title}
          </Link>
          <p className="text-sm text-slate-500 line-clamp-2">
            {incident.description || "No description provided."}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
              statusColors[incident.status]
            }`}
          >
            {incident.status.replace("_", " ")}
          </span>
          <span className="text-xs text-slate-400">
            {new Date(incident.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
