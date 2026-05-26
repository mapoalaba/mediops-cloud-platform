import time

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import require_roles
from app.db.session import get_db
from app.models.incident import Incident
from app.models.user import User


router = APIRouter(prefix="/api/simulations", tags=["simulations"])


@router.post("/latency")
def simulate_latency(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SRE", "SYSTEM_ADMIN")),
):
    time.sleep(3)

    incident = Incident(
        title="API latency simulation",
        incident_type="API_LATENCY",
        severity="MEDIUM",
        affected_service="backend",
        summary="Simulated API latency for SRE testing.",
    )

    db.add(incident)
    db.commit()

    return {
        "status": "ok",
        "message": "Latency simulation executed",
    }


@router.post("/server-error")
def simulate_server_error(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SRE", "SYSTEM_ADMIN")),
):
    incident = Incident(
        title="HTTP 500 error simulation",
        incident_type="HTTP_5XX",
        severity="HIGH",
        affected_service="backend",
        summary="Simulated HTTP 500 error for incident testing.",
    )

    db.add(incident)
    db.commit()

    raise RuntimeError("Simulated server error")