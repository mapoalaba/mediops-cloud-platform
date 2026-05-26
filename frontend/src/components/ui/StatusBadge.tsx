type StatusBadgeProps = {
  status: string;
};

/**
 * 상태값에 따라 배지 색상을 다르게 적용한다.
 */
function getStatusClass(status: string) {
  const normalized = status.toUpperCase();

  if (["NORMAL", "PASS", "RUNNING", "CONNECTED", "RESOLVED", "COMPLETED", "SUCCESS", "OK"].includes(normalized)) {
    return "bg-green-100 text-green-700 border-green-200";
  }

  if (["WARNING", "MEDIUM", "IN_PROGRESS", "ACKNOWLEDGED", "REQUESTED", "WAITING", "READY"].includes(normalized)) {
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  }

  if (["CRITICAL", "HIGH", "OPEN", "FAIL", "FAILED", "ERROR"].includes(normalized)) {
    return "bg-red-100 text-red-700 border-red-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

/**
 * 내부 상태값을 화면용 한글 문구로 변환한다.
 */
function getStatusLabel(status: string) {
  const normalized = status.toUpperCase();

  const labels: Record<string, string> = {
    NORMAL: "정상",
    PASS: "통과",
    RUNNING: "실행 중",
    CONNECTED: "연결됨",
    RESOLVED: "해결됨",
    COMPLETED: "완료",
    SUCCESS: "성공",
    OK: "정상",

    WARNING: "주의",
    MEDIUM: "보통",
    IN_PROGRESS: "진행 중",
    ACKNOWLEDGED: "확인됨",
    REQUESTED: "요청됨",
    WAITING: "대기 중",
    READY: "준비됨",

    CRITICAL: "심각",
    HIGH: "높음",
    OPEN: "미해결",
    FAIL: "실패",
    FAILED: "실패",
    ERROR: "오류",

    NOT_CHECKED: "미확인",
    PLANNED: "예정",
  };

  return labels[normalized] || status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getStatusClass(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
}
