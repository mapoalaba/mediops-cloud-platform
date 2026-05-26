export interface Patient {
  id: number;
  patient_code: string;
  name: string;
  birth_date: string;
  phone?: string | null;
  status: string;
  department?: string | null;
}
