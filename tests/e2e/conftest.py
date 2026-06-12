import os
import sys
import pytest
from dotenv import load_dotenv

# Ensure project root is in sys.path to allow absolute imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from tests.e2e.client import BoardroomAPIClient

# Load environment variables from a .env file if present at the project root
load_dotenv()

@pytest.fixture(scope="session")
def api_url() -> str:
    """
    Returns the target Boardroom API URL from environment variables,
    defaulting to http://localhost:8000.
    """
    return os.getenv("BOARDROOM_API_URL", "http://localhost:8000")

@pytest.fixture(scope="session")
def client(api_url: str) -> BoardroomAPIClient:
    """
    Fixture that provides an instance of BoardroomAPIClient configured with the target base URL.
    """
    return BoardroomAPIClient(base_url=api_url)
