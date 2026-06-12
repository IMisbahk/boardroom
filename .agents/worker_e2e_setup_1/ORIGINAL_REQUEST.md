## 2026-06-12T14:50:14Z
You are the Test Infrastructure Setup Worker.
Your task is to set up the E2E testing infrastructure in /Users/misbahkhursheed/Developer/boardroom.

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please do the following:
1. Check if requirements.txt exists at project root. If not, create it. Add:
   - pytest
   - requests
   - python-dotenv (useful for loading env vars)
2. Create the folder structure tests/e2e under the working directory /Users/misbahkhursheed/Developer/boardroom.
3. Write `tests/e2e/client.py` containing the `BoardroomAPIClient` helper class wrapping calls to the target FastAPI backend:
   - `upload_document(self, startup_id: str, file_name: str, content: bytes)` -> sends POST to /api/documents
   - `get_chunks(self, startup_id: str, query: str, limit: int = 5)` -> sends GET to /api/documents/{startup_id}/chunks
   - `create_meeting(self, startup_id: str, topic: str, context: dict, doc_ids: list)` -> sends POST to /api/meetings
   - `ask_board(self, meeting_id: str, question: str)` -> sends POST to /api/meetings/{meeting_id}/ask
   - `get_agent_opinion(self, meeting_id: str, agent_name: str)` -> sends GET to /api/meetings/{meeting_id}/agents/{agent_name}/opinion
4. Write `tests/e2e/conftest.py` that configures pytest:
   - Reads BOARDROOM_API_URL from environment variables (defaulting to http://localhost:8000).
   - Exposes a `client` fixture providing an instance of `BoardroomAPIClient`.
5. Write `tests/e2e/test_sanity.py` with a simple sanity check that does not require the backend running (e.g. testing client configuration).
6. Create `tests/e2e/run_tests.py` (or shell script) that runs pytest on the tests/e2e directory.

Verify files compile and have no syntax errors. Provide a detailed handoff report when complete.
