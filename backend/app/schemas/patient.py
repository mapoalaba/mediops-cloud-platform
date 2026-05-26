from pydantic import BaseModel


class PatientResponse(BaseModel):
    id: int
    patient_code: str
    name: str
    birth_date: str
    phone: str | None = None
    status: str
    department: str | None = None

    class Config:
        from_attributes = True