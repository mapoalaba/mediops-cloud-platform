from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.session import get_db
from app.models.patient import Patient
from app.models.user import User
from app.schemas.patient import PatientResponse
from app.utils.masking import mask_birth_date, mask_name, mask_phone


router = APIRouter(prefix="/api/patients", tags=["patients"])


@router.get("", response_model=list[PatientResponse])
def get_patients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    patients = db.query(Patient).all()

    # SRE/SECURITY_ADMIN은 운영 목적상 마스킹된 데이터만 조회
    if current_user.role in ["SRE", "SECURITY_ADMIN"]:
        for patient in patients:
            patient.name = mask_name(patient.name)
            patient.birth_date = mask_birth_date(patient.birth_date)
            patient.phone = mask_phone(patient.phone)

    return patients