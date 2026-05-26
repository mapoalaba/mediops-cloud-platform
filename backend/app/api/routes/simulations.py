import time

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import require_roles
from app.db.session import get_db
from app.models.incident import Incident
from app.models.user import User
from app.observability.metrics import INCIDENT_CREATED_TOTAL, SIMULATION_EXECUTED_TOTAL
from app.services.audit_service import create_audit_log


router = APIRouter(prefix="/api/simulations", tags=["장애 시뮬레이션"])


def create_incident(
    db: Session,
    title: str,
    incident_type: str,
    severity: str,
    affected_service: str,
    summary: str,
):
    """
    장애 시뮬레이션 실행 시 Incident를 생성하는 공통 함수.
    Incident가 생성될 때 Prometheus Incident 카운터도 증가시킨다.
    """
    incident = Incident(
        title=title,
        incident_type=incident_type,
        severity=severity,
        status="OPEN",
        affected_service=affected_service,
        summary=summary,
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    INCIDENT_CREATED_TOTAL.labels(
        incident_type=incident_type,
        severity=severity,
    ).inc()

    return incident


@router.post("/latency")
def simulate_latency(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SRE", "SYSTEM_ADMIN")),
):
    """
    API 응답 지연 시뮬레이션.
    실제 장애 상황처럼 응답을 일부러 늦게 반환한다.
    """
    SIMULATION_EXECUTED_TOTAL.labels(simulation_type="latency").inc()

    time.sleep(3)

    incident = create_incident(
        db=db,
        title="API 응답 지연 발생",
        incident_type="API_LATENCY",
        severity="MEDIUM",
        affected_service="backend",
        summary="Backend API 응답 시간이 비정상적으로 증가했습니다.",
    )

    create_audit_log(
        db=db,
        user=current_user,
        action="RUN_SIMULATION_LATENCY",
        resource_type="incident",
        resource_id=str(incident.id),
        result="SUCCESS",
        message="API 응답 지연 시뮬레이션을 실행했습니다.",
    )

    return {
        "status": "ok",
        "message": "API 응답 지연 시뮬레이션이 실행되었습니다.",
        "incident_id": incident.id,
    }


@router.post("/server-error")
def simulate_server_error(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SRE", "SYSTEM_ADMIN")),
):
    """
    HTTP 500 오류 시뮬레이션.
    Incident와 감사 로그를 생성한 뒤 의도적으로 500 오류를 반환한다.
    """
    SIMULATION_EXECUTED_TOTAL.labels(simulation_type="server_error").inc()

    incident = create_incident(
        db=db,
        title="HTTP 500 오류 발생",
        incident_type="HTTP_5XX",
        severity="HIGH",
        affected_service="backend",
        summary="Backend API에서 의도적인 500 오류가 발생했습니다.",
    )

    create_audit_log(
        db=db,
        user=current_user,
        action="RUN_SIMULATION_500_ERROR",
        resource_type="incident",
        resource_id=str(incident.id),
        result="SUCCESS",
        message="HTTP 500 오류 시뮬레이션을 실행했습니다.",
    )

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="의도적으로 발생시킨 500 오류입니다.",
    )


@router.post("/cpu")
def simulate_cpu_load(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SRE", "SYSTEM_ADMIN")),
):
    """
    CPU 부하 시뮬레이션.
    짧은 시간 동안 반복 연산을 수행해 CPU 사용률 증가 상황을 재현한다.
    """
    SIMULATION_EXECUTED_TOTAL.labels(simulation_type="cpu").inc()

    total = 0

    for i in range(2_000_000):
        total += i * i

    incident = create_incident(
        db=db,
        title="CPU 부하 증가",
        incident_type="CPU_HIGH",
        severity="MEDIUM",
        affected_service="backend",
        summary="Backend CPU 사용률이 일시적으로 증가했습니다.",
    )

    create_audit_log(
        db=db,
        user=current_user,
        action="RUN_SIMULATION_CPU",
        resource_type="incident",
        resource_id=str(incident.id),
        result="SUCCESS",
        message="CPU 부하 시뮬레이션을 실행했습니다.",
    )

    return {
        "status": "ok",
        "message": "CPU 부하 시뮬레이션이 실행되었습니다.",
        "incident_id": incident.id,
    }
