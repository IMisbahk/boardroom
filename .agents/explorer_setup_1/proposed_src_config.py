import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    DATABASE_URL: str = "sqlite:///./boardroom.db"
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    
    # LLM Settings (for agents and debate engine)
    OPENAI_API_KEY: str = "mock-key"
    LLM_MODEL: str = "gpt-4"

settings = Settings()
