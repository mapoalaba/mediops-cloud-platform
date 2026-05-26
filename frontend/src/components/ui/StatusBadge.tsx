type StatusBadgeProps = {
  status: string;
};

function getStatusClass(status: string) {
  const normalized = status.toUpperCase();

  if (["NORMAL", "PASS", "RUNNING", "CONNECTED", "RESOLVED", "COMPLETED", "SUCCESS", "OK"].includes(normalized)) {
    return "bg-green-100 text-green-700 border-green-200";
  }

  if (["WARNING", "MEDIUM", "IN_PROGRESS", "ACKNOWLEDGED", "REQUESTED", "WAITING"].includes(normalized)) {
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }

  if (["CRITICAL", "HIGH", "OPEN", "FAIL", "FAILED", "ERROR"].includes(normalized)) {
    return "bg-red-100 text-red-700 border-red-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getStatusClass(status)}`}>
      {status}
    </span>
  );
}
