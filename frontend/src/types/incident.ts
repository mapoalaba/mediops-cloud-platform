export type IncidentSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus =
  | "OPEN"
  | "ACKNOWLEDGED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export interface Incident {
  id: number;
  title: string;
  incident_type: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  affected_service?: string | null;
  summary?: string | null;
  root_cause?: string | null;
  created_at?: string;
}
