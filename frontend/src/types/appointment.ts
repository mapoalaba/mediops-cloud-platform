export interface Appointment {
  id: number;
  patient_id: number;
  department: string;
  appointment_date: string;
  status: string;
}

export interface AppointmentCreate {
  patient_id: number;
  department: string;
  appointment_date: string;
}
