from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.sql import func

from app.db.base import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    department = Column(String(100), nullable=False)
    appointment_date = Column(String(30), nullable=False)
    status = Column(String(50), default="REQUESTED", nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())