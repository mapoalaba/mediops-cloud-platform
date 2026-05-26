from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.patient import Patient
from app.models.user import User


def seed():
    db = SessionLocal()

    admin = db.query(User).filter(User.email == "admin@example.com").first()

    if not admin:
        admin = User(
            email="admin@example.com",
            name="Admin",
            hashed_password=hash_password("admin1234"),
            role="SYSTEM_ADMIN",
        )
        db.add(admin)

    sre = db.query(User).filter(User.email == "sre@example.com").first()

    if not sre:
        sre = User(
            email="sre@example.com",
            name="SRE User",
            hashed_password=hash_password("sre1234"),
            role="SRE",
        )
        db.add(sre)

    if db.query(Patient).count() == 0:
        patients = [
            Patient(
                patient_code="P-2026-0001",
                name="홍길동",
                birth_date="1995-04-12",
                phone="010-1234-5678",
                status="WAITING",
                department="내과",
            ),
            Patient(
                patient_code="P-2026-0002",
                name="김민수",
                birth_date="1988-11-03",
                phone="010-2222-3333",
                status="IN_PROGRESS",
                department="정형외과",
            ),
        ]
        db.add_all(patients)

    db.commit()
    db.close()


if __name__ == "__main__":
    seed()