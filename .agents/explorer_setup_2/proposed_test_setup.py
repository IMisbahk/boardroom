from fastapi.testclient import TestClient
from src.main import app
from src.config import settings

client = TestClient(app)

def test_health_check():
    """Verify that the FastAPI health check endpoint returns 200 and expected payload."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    assert response.json()["project"] == settings.PROJECT_NAME

def test_root():
    """Verify that the root endpoint returns a welcome message."""
    response = client.get("/")
    assert response.status_code == 200
    assert "Welcome" in response.json()["message"]

def test_config_load():
    """Verify that configuration settings are initialized correctly."""
    assert settings.PROJECT_NAME == "Boardroom AI Executive Team Backend"
    assert settings.API_V1_STR == "/api/v1"
    assert settings.SQLITE_DB_PATH is not None
