from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, require_roles
from app.db.session import get_db
from app.models.appointment import Appointment
from app.models.patient import Patient
from app.models.user import User
from app.schemas.appointment import AppointmentCreate, AppointmentResponse, AppointmentUpdate
from app.services.audit_service import create_audit_log


router = APIRouter(prefix="/api/appointments", tags=["예약 관리"])


@router.get("", response_model=list[AppointmentResponse])
def get_appointments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    예약 목록 조회 API.
    로그인한 사용자는 예약 목록을 조회할 수 있으며, 조회 행위는 감사 로그에 기록된다.
    """
    create_audit_log(
        db=db,
        user=current_user,
        action="READ_APPOINTMENTS",
        resource_type="appointment",
        result="SUCCESS",
        message="예약 목록을 조회했습니다.",
    )

    return db.query(Appointment).order_by(Appointment.id.desc()).all()


@router.post("", response_model=AppointmentResponse)
def create_appointment(
    payload: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("HOSPITAL_ADMIN", "SYSTEM_ADMIN")),
):
    """
    예약 생성 API.
    병원 관리자 또는 시스템 관리자만 예약을 생성할 수 있다.
    """
    patient = db.query(Patient).filter(Patient.id == payload.patient_id).first()

    if not patient:
        create_audit_log(
            db=db,
            user=current_user,
            action="CREATE_APPOINTMENT",
            resource_type="appointment",
            result="FAILED",
            message=f"존재하지 않는 환자 ID입니다: {payload.patient_id}",
        )

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="환자를 찾을 수 없습니다.",
        )

    appointment = Appointment(
        patient_id=payload.patient_id,
        department=payload.department,
        appointment_date=payload.appointment_date,
        status="REQUESTED",
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    create_audit_log(
        db=db,
        user=current_user,
        action="CREATE_APPOINTMENT",
        resource_type="appointment",
        resource_id=str(appointment.id),
        result="SUCCESS",
        message="예약을 생성했습니다.",
    )

    return appointment


@router.patch("/{appointment_id}", response_model=AppointmentResponse)
def update_appointment(
    appointment_id: int,
    payload: AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("HOSPITAL_ADMIN", "SYSTEM_ADMIN")),
):
    """
    예약 수정 API.
    예약 일시, 진료과, 상태를 수정할 수 있다.
    """
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()

    if not appointment:
        create_audit_log(
            db=db,
            user=current_user,
            action="UPDATE_APPOINTMENT",
            resource_type="appointment",
            resource_id=str(appointment_id),
            result="FAILED",
            message="수정할 예약을 찾을 수 없습니다.",
        )

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="예약을 찾을 수 없습니다.",
        )

    if payload.department is not None:
        appointment.department = payload.department

    if payload.appointment_date is not None:
        appointment.appointment_date = payload.appointment_date

    if payload.status is not None:
        appointment.status = payload.status

    db.commit()
    db.refresh(appointment)

    create_audit_log(
        db=db,
        user=current_user,
        action="UPDATE_APPOINTMENT",
        resource_type="appointment",
        resource_id=str(appointment.id),
        result="SUCCESS",
        message="예약 정보를 수정했습니다.",
    )

    return appointment


@router.delete("/{appointment_id}")
def delete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("HOSPITAL_ADMIN", "SYSTEM_ADMIN")),
):
    """
    예약 삭제 API.
    병원 관리자 또는 시스템 관리자만 예약을 삭제할 수 있다.
    """
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()

    if not appointment:
        create_audit_log(
            db=db,
            user=current_user,
            action="DELETE_APPOINTMENT",
            resource_type="appointment",
            resource_id=str(appointment_id),
            result="FAILED",
            message="삭제할 예약을 찾을 수 없습니다.",
        )

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="예약을 찾을 수 없습니다.",
        )

    db.delete(appointment)
    db.commit()

    create_audit_log(
        db=db,
        user=current_user,
        action="DELETE_APPOINTMENT",
        resource_type="appointment",
        resource_id=str(appointment_id),
        result="SUCCESS",
        message="예약을 삭제했습니다.",
    )

    return {
        "status": "ok",
        "message": "예약이 삭제되었습니다.",
    }
