import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Base configuration
    APP_NAME: str = "Boardroom AI Executive Team API"
    ENV: str = os.getenv("ENV", "development")
    
    # SQLite Database Configuration
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./boardroom.db")
    
    # Supabase Integration (from .env or .env.local)
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    
    # LLM Settings
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "mock-key")
    DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "gpt-4")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
