import { useNavigate, useParams } from "react-router-dom";
import {
  useIncident,
  useUpdateIncident,
  useDeleteIncident,
} from "../hooks/useIncidents";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

type UpdateForm = {
  status: string;
  priority: string;
};

export function IncidentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: incident, isLoading, error } = useIncident(id!);
  const updateMutation = useUpdateIncident();
  const deleteMutation = useDeleteIncident();

  const { register, handleSubmit, reset } = useForm<UpdateForm>();

  useEffect(() => {
    if (incident) {
      reset({
        status: incident.status,
        priority: incident.priority,
      });
    }
  }, [incident, reset]);

  if (isLoading) return <div className="p-8">Loading incident...</div>;
  if (error || !incident)
    return <div className="p-8 text-red-500">Incident not found</div>;

  const onUpdate = async (data: UpdateForm) => {
    try {
      await updateMutation.mutateAsync({ id: id!, data: data as any });
      toast.success("Updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete this incident?")) {
      try {
        await deleteMutation.mutateAsync(id!);
        toast.success("Incident deleted");
        navigate("/incidents");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-2"
        >
          ← Back to list
        </button>
        <button
          onClick={onDelete}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-100 transition-colors text-sm font-semibold"
        >
          Delete Incident
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded">
              ID: #{incident.id}
            </span>
            <span className="text-xs text-slate-400">
              Created on {new Date(incident.createdAt).toLocaleString()}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {incident.title}
          </h1>
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
            {incident.description || "No description provided."}
          </p>
        </div>

        <div className="p-8 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
            <h3 className="font-semibold text-slate-900">
              Manage Status & Priority
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {updateMutation.isPending ? "Updating..." : "Save Changes"}
            </button>
          </form>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Incident Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Reported BY</span>
                <span className="font-medium text-slate-900">
                  {incident.author?.email || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Last Updated</span>
                <span className="font-medium text-slate-900">
                  {new Date(incident.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
