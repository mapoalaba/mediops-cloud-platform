type MetricCardProps = {
  title: string;
  value: string;
  description?: string;
};

export function MetricCard({ title, value, description }: MetricCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
      <div className="text-sm font-medium text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
      {description && (
        <div className="mt-2 text-xs text-slate-500">{description}</div>
      )}
    </div>
  );
}
