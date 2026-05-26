from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func

from app.db.base import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    patient_code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    birth_date = Column(String(20), nullable=False)
    phone = Column(String(30), nullable=True)
    status = Column(String(50), default="WAITING", nullable=False)
    department = Column(String(100), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())