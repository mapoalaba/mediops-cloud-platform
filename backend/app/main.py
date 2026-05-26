from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, incidents, metrics, patients, simulations
from app.db.base import Base
from app.db.session import engine


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediOps Cloud Platform API",
    description="Medical SaaS DevOps/SRE Platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(incidents.router)
app.include_router(simulations.router)
app.include_router(metrics.router)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "backend",
    }


@app.get("/")
def root():
    return {
        "message": "MediOps Cloud Platform Backend API",
        "docs": "/docs",
        "health": "/health",
    }