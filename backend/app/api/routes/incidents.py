from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import require_roles
from app.db.session import get_db
from app.models.incident import Incident
from app.models.user import User


router = APIRouter(prefix="/api/incidents", tags=["incidents"])


@router.get("")
def get_incidents(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SRE", "SECURITY_ADMIN", "SYSTEM_ADMIN")),
):
    return db.query(Incident).order_by(Incident.id.desc()).all()