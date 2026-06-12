import pytest
from tests.e2e.client import BoardroomAPIClient

def test_client_fixture_initialization(client):
    """
    Sanity check to verify the client fixture is loaded and configured.
    This does not require the backend to be running.
    """
    assert client is not None
    assert isinstance(client, BoardroomAPIClient)
    assert client.base_url.startswith("http://") or client.base_url.startswith("https://")

def test_client_base_url_trailing_slash_handling():
    """
    Verify that the client class correctly strips trailing slashes from the base URL.
    """
    c1 = BoardroomAPIClient("http://localhost:8000/")
    assert c1.base_url == "http://localhost:8000"

    c2 = BoardroomAPIClient("https://api.boardroom.ai")
    assert c2.base_url == "https://api.boardroom.ai"

def test_client_contains_all_required_methods(client):
    """
    Verify that BoardroomAPIClient has all the methods required by the spec.
    """
    required_methods = [
        "upload_document",
        "get_chunks",
        "create_meeting",
        "ask_board",
        "get_agent_opinion",
    ]
    for method_name in required_methods:
        assert hasattr(client, method_name), f"Missing method: {method_name}"
        assert callable(getattr(client, method_name)), f"Method {method_name} is not callable"
