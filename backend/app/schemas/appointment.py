from pydantic import BaseModel


class AppointmentCreate(BaseModel):
    patient_id: int
    department: str
    appointment_date: str


class AppointmentUpdate(BaseModel):
    department: str | None = None
    appointment_date: str | None = None
    status: str | None = None


class AppointmentResponse(BaseModel):
    id: int
    patient_id: int
    department: str
    appointment_date: str
    status: str

    class Config:
        from_attributes = True
