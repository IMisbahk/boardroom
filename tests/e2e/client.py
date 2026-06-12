import requests

class BoardroomAPIClient:
    """
    BoardroomAPIClient wraps HTTP requests to the Boardroom API backend
    for end-to-end (E2E) testing.
    """
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")

    def upload_document(self, startup_id: str, file_name: str, content: bytes) -> requests.Response:
        """
        Uploads a document for a specific startup.
        Sends a POST request to /api/documents as multipart/form-data.
        """
        url = f"{self.base_url}/api/documents"
        files = {"file": (file_name, content, "application/octet-stream")}
        data = {"startup_id": startup_id}
        return requests.post(url, files=files, data=data)

    def get_chunks(self, startup_id: str, query: str, limit: int = 5) -> requests.Response:
        """
        Retrieves matching document chunks for a startup given a semantic query.
        Sends a GET request to /api/documents/{startup_id}/chunks.
        """
        url = f"{self.base_url}/api/documents/{startup_id}/chunks"
        params = {"query": query, "limit": limit}
        return requests.get(url, params=params)

    def create_meeting(self, startup_id: str, topic: str, context: dict, doc_ids: list) -> requests.Response:
        """
        Creates a new board meeting for a startup.
        Sends a POST request to /api/meetings.
        """
        url = f"{self.base_url}/api/meetings"
        payload = {
            "startup_id": startup_id,
            "topic": topic,
            "context": context,
            "doc_ids": doc_ids
        }
        return requests.post(url, json=payload)

    def ask_board(self, meeting_id: str, question: str) -> requests.Response:
        """
        Submits a question to the board for a specific meeting, triggering debate.
        Sends a POST request to /api/meetings/{meeting_id}/ask.
        """
        url = f"{self.base_url}/api/meetings/{meeting_id}/ask"
        payload = {"question": question}
        return requests.post(url, json=payload)

    def get_agent_opinion(self, meeting_id: str, agent_name: str) -> requests.Response:
        """
        Retrieves a specific agent's individual opinion in a board meeting.
        Sends a GET request to /api/meetings/{meeting_id}/agents/{agent_name}/opinion.
        """
        url = f"{self.base_url}/api/meetings/{meeting_id}/agents/{agent_name}/opinion"
        return requests.get(url)
