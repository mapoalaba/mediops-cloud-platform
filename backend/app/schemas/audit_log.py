from pydantic import BaseModel


class AuditLogResponse(BaseModel):
    id: int
    user_id: str | None = None
    user_role: str | None = None
    action: str
    resource_type: str | None = None
    resource_id: str | None = None
    result: str
    message: str | None = None

    class Config:
        from_attributes = True
