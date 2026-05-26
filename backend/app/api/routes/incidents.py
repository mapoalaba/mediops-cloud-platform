from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.session import get_db
from app.models.incident import Incident
from app.models.user import User


router = APIRouter(prefix="/api/incidents", tags=["장애 이력"])


@router.get("")
def get_incidents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    장애 이력 목록 조회 API.
    장애 시뮬레이션 또는 운영 중 생성된 Incident 기록을 조회한다.
    """
    return db.query(Incident).order_by(Incident.id.desc()).all()
