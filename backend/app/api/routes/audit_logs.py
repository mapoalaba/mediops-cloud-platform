from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import require_roles
from app.db.session import get_db
from app.models.audit_log import AuditLog
from app.models.user import User
from app.schemas.audit_log import AuditLogResponse


router = APIRouter(prefix="/api/audit-logs", tags=["감사 로그"])


@router.get("", response_model=list[AuditLogResponse])
def get_audit_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SECURITY_ADMIN", "SYSTEM_ADMIN")),
):
    """
    감사 로그 조회 API.
    보안 관리자 또는 시스템 관리자만 조회할 수 있다.
    """
    return db.query(AuditLog).order_by(AuditLog.id.desc()).limit(100).all()
