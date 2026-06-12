import os
from pathlib import Path
from pydantic import BaseModel

# Resolve base directory (assumes config.py is in src/)
BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseModel):
    PROJECT_NAME: str = "Boardroom AI Executive Team Backend"
    API_V1_STR: str = "/api/v1"
    
    # Database Settings
    SQLITE_DB_PATH: str = os.getenv("SQLITE_DB_PATH", str(BASE_DIR / "boardroom.db"))
    
    # LLM Settings (for Executive Agents)
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    DEFAULT_LLM_MODEL: str = os.getenv("DEFAULT_LLM_MODEL", "gpt-4o")

settings = Settings()
