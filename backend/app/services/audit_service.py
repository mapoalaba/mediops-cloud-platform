from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog
from app.models.user import User


def create_audit_log(
    db: Session,
    user: User | None,
    action: str,
    resource_type: str | None = None,
    resource_id: str | None = None,
    result: str = "SUCCESS",
    message: str | None = None,
):
    audit_log = AuditLog(
        user_id=str(user.id) if user else None,
        user_role=user.role if user else None,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        result=result,
        message=message,
    )

    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)

    return audit_log
