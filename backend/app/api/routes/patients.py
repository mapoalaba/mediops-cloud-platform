from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.session import get_db
from app.models.patient import Patient
from app.models.user import User
from app.services.audit_service import create_audit_log


router = APIRouter(prefix="/api/patients", tags=["환자 관리"])


def mask_patient(patient: Patient, current_user: User):
    """
    환자 정보 마스킹 함수.
    SRE나 보안 관리자는 운영/보안 목적의 조회만 가능하므로 민감정보를 일부 가린다.
    병원 관리자와 시스템 관리자는 전체 정보를 볼 수 있다.
    """
    if current_user.role in ["HOSPITAL_ADMIN", "SYSTEM_ADMIN"]:
        return patient

    return {
        "id": patient.id,
        "patient_code": patient.patient_code,
        "name": patient.name[0] + "**" if patient.name else "***",
        "birth_date": "****-**-**",
        "phone": "010-****-****",
        "status": patient.status,
        "department": patient.department,
    }


@router.get("")
def get_patients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    환자 목록 조회 API.
    사용자의 권한에 따라 환자 정보가 마스킹되어 반환된다.
    """
    patients = db.query(Patient).order_by(Patient.id.asc()).all()

    create_audit_log(
        db=db,
        user=current_user,
        action="READ_PATIENTS",
        resource_type="patient",
        result="SUCCESS",
        message="환자 목록을 조회했습니다.",
    )

    return [mask_patient(patient, current_user) for patient in patients]
