from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "MediOps Cloud Platform"
    ENV: str = "local"

    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000

    DATABASE_URL: str = "postgresql://mediops:mediops_password@postgres:5432/mediops"

    REDIS_URL: str = "redis://redis:6379/0"

    JWT_SECRET: str = "change-me-local-secret"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()