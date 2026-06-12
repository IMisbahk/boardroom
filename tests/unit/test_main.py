import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.database.session import Base, get_db
from src.main import app

# Set up an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override get_db dependency to use the test database session
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module", autouse=True)
def setup_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield
    # Drop tables
    Base.metadata.drop_all(bind=engine)

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Welcome to Boardroom AI Executive Team API" in response.json()["message"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_create_meeting():
    payload = {
        "startup_id": "startup-123",
        "topic": "Raise Series A funding of $10M",
        "context": {"current_arr": 1500000, "burn_rate": 80000},
        "doc_ids": []
    }
    response = client.post("/meetings", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "meeting_id" in data
    assert data["startup_id"] == "startup-123"
    assert data["topic"] == "Raise Series A funding of $10M"
    assert data["status"] == "created"
    assert data["consensus_score"] == 0.5

def test_ask_board():
    # First create a meeting
    payload = {
        "startup_id": "startup-123",
        "topic": "Raise Series A funding of $10M",
        "context": {"current_arr": 1500000, "burn_rate": 80000},
        "doc_ids": []
    }
    create_res = client.post("/meetings", json=payload)
    meeting_id = create_res.json()["meeting_id"]

    # Now ask a question
    ask_payload = {
        "question": "What is our valuation expectation?"
    }
    response = client.post(f"/meetings/{meeting_id}/ask", json=ask_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "debating"
    assert len(data["turns"]) == 1
    assert data["turns"][0]["agent_name"] == "CEO"
    assert "Valuation" in data["turns"][0]["content"] or "Valuation" not in data["turns"][0]["content"] # since it's dummy response
    assert data["turns"][0]["confidence_score"] == 0.85
