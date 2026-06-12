from fastapi import FastAPI
from src.config import settings

app = FastAPI(
    title="Boardroom AI Executive Team API",
    description="Backend API for managing board meetings and AI executive debates.",
    version="0.1.0",
)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": settings.DATABASE_URL,
        "version": "0.1.0"
    }

@app.get("/")
def read_root():
    return {"message": "Welcome to Boardroom AI Executive Team API"}
