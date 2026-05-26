from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.patient import Patient
from app.models.user import User


def create_user_if_not_exists(db, email: str, name: str, password: str, role: str):
    user = db.query(User).filter(User.email == email).first()

    if user:
        user.name = name
        user.hashed_password = hash_password(password)
        user.role = role
        return user

    user = User(
        email=email,
        name=name,
        hashed_password=hash_password(password),
        role=role,
    )

    db.add(user)
    db.flush()

    return user


def seed():
    db = SessionLocal()

    create_user_if_not_exists(
        db,
        email="admin@example.com",
        name="Admin",
        password="admin1234",
        role="SYSTEM_ADMIN",
    )

    create_user_if_not_exists(
        db,
        email="sre@example.com",
        name="SRE User",
        password="sre1234",
        role="SRE",
    )

    create_user_if_not_exists(
        db,
        email="security@example.com",
        name="Security Admin",
        password="security1234",
        role="SECURITY_ADMIN",
    )

    create_user_if_not_exists(
        db,
        email="hospital@example.com",
        name="Hospital Admin",
        password="hospital1234",
        role="HOSPITAL_ADMIN",
    )

    create_user_if_not_exists(
        db,
        email="user@example.com",
        name="Normal User",
        password="user1234",
        role="USER",
    )

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
            Patient(
                patient_code="P-2026-0003",
                name="이서연",
                birth_date="2001-08-21",
                phone="010-9876-5432",
                status="COMPLETED",
                department="영상의학과",
            ),
        ]

        db.add_all(patients)

    db.commit()
    db.close()

    print("Seed data created successfully")


if __name__ == "__main__":
    seed()
