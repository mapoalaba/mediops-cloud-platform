export type UserRole =
  | "USER"
  | "HOSPITAL_ADMIN"
  | "SRE"
  | "SECURITY_ADMIN"
  | "SYSTEM_ADMIN";

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}
