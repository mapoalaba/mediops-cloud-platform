export interface AuditLog {
  id: number;
  user_id?: string | null;
  user_role?: string | null;
  action: string;
  resource_type?: string | null;
  resource_id?: string | null;
  result: string;
  message?: string | null;
}
