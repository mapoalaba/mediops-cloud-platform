from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.db.base import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    incident_type = Column(String(100), nullable=False)
    severity = Column(String(50), default="LOW", nullable=False)
    status = Column(String(50), default="OPEN", nullable=False)
    affected_service = Column(String(100), nullable=True)
    summary = Column(Text, nullable=True)
    root_cause = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())