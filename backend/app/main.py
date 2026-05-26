from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    appointments,
    audit_logs,
    auth,
    incidents,
    metrics,
    patients,
    simulations,
)
from app.db.base import Base
from app.db.session import engine
from app import models
from app.observability.metrics import prometheus_metrics_middleware


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediOps Cloud Platform API",
    description="의료 SaaS 서비스를 가정한 DevOps/SRE 운영 플랫폼 API입니다.",
    version="0.3.0",
)

app.middleware("http")(prometheus_metrics_middleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(appointments.router)
app.include_router(incidents.router)
app.include_router(simulations.router)
app.include_router(audit_logs.router)
app.include_router(metrics.router)


@app.get("/health", tags=["상태 확인"])
def health_check():
    return {
        "status": "ok",
        "service": "backend",
        "message": "Backend 서비스가 정상 실행 중입니다.",
    }


@app.get("/", tags=["상태 확인"])
def root():
    return {
        "message": "MediOps Cloud Platform Backend API입니다.",
        "docs": "/docs",
        "health": "/health",
        "metrics": "/metrics",
    }
