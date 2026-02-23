interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

export function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div
      className="rounded-sm p-5 transition-all"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: `1px solid var(--border)`,
        boxShadow: `0 0 12px ${color}33`, // glow effect
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
        />
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-3xl font-bold"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>
    </div>
  );
}
