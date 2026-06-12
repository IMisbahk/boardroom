# Original User Request

## Initial Request — 2026-06-12T14:46:24Z

Boardroom is an AI Executive Team backend where founders consult multiple executives instead of a single AI. This system builds the backend intelligence layer including agent identities, debate engine, document processing, memory/context retrieval, and a board meeting pipeline.

Working directory: /Users/misbahkhursheed/Developer/boardroom
Integrity mode: development

## Requirements

### R1. Executive Agents
Define and implement 10 executive agents:
- **Investor**: Focused on ROI, valuation, capital efficiency, fundability.
- **CTO**: Focused on architecture, scalability, tech stack, technical debt.
- **Product**: Focused on product-market fit, UX, roadmap, feature prioritization.
- **Growth**: Focused on acquisition channels, CAC, LTV, viral loops.
- **Customer**: Focused on retention, NPS, user feedback, customer support.
- **Strategy**: Focused on competitive positioning, market timing, business model.
- **Finance**: Focused on burn rate, runway, cash flow, unit economics.
- **Operations**: Focused on team execution, vendor management, workflows, efficiency.
- **Legal**: Focused on IP, compliance, regulatory risks, contracts.
- **Market Research**: Focused on market size, customer demographics, competitor analysis.

Each agent needs:
- Identity, role, and priorities.
- Decision framework.
- Response, challenge, and agreement generator prompts/logic.
- Confidence scoring mechanism (0.0 to 1.0).

### R2. Debate Engine
Implement a multi-turn, conversational debate engine. When a question is posed to the board:
- Selected/relevant agents generate initial viewpoints.
- Agents can challenge each other (Agent A challenges Agent B's assumptions/conclusions).
- Challenged agents can respond or adjust their stance.
- Realism: The discussion must feel like a real boardroom debate (dialogue format) rather than a list of disconnected chatbot replies.

### R3. Memory Layer & Document Processing
Implement a memory retrieval system and document processing pipeline:
- **Context support**: `startup_context`, `conversation_history`, `documents`, `board_meetings`, `historical_decisions`, and `executive_preferences`.
- **Document ingestion**: Parse PDF, DOCX, TXT, and Markdown files.
- **Processing**: Chunk content, generate embeddings (or use a local search strategy), and index them.
- **Retrieval**: Associate documents with specific startups and retrieve relevant chunks based on the meeting topic or question.

### R4. Board Meeting Pipeline
Implement the orchestrator that coordinates the full board meeting workflow:
- **Input**: User Question, Startup Context, optional Documents, and History.
- **Execution**: Retrieve context -> select relevant board members -> generate initial opinions -> run debate turns -> synthesize consensus and final recommendations.
- **Output**: Detailed JSON containing:
  - Executive Responses
  - Challenges/Debate Transcript
  - Consensus Summary
  - Overall Recommendation
  - Risks and Opportunities
  - Confidence Score

### R5. API Layer
Expose clean, documented APIs (REST or GraphQL) for:
- `POST /api/meetings` (Create a board meeting / start a discussion)
- `POST /api/meetings/:id/ask` (Ask a question to the board)
- `GET /api/meetings/:id` (Get meeting responses, debate, and recommendation)
- `POST /api/documents` (Upload document with startup context association)
- `GET /api/context` (Retrieve startup context/history)

## Acceptance Criteria

### API & Orchestration Functionality
- [ ] Endpoints exist for creating meetings, asking questions, retrieving recommendations, and uploading documents.
- [ ] Asking a question triggers the board meeting pipeline and returns a structured JSON payload containing agent responses, debate transcript, consensus, recommendation, risks/opportunities, and confidence.
- [ ] The system runs successfully without requiring external UI dependencies.

### Agent & Debate Quality
- [ ] At least 5 distinct agent responses are generated per meeting, reflecting their respective roles.
- [ ] The debate transcript contains at least one round of active challenge and response between two different agents.
- [ ] The final recommendation summarizes the consensus and highlights dissenting viewpoints.

### Memory & Document Extraction
- [ ] The document upload endpoint successfully processes text-based documents (Markdown/TXT) and stores them.
- [ ] Retrieved context is injected into the agents' prompts, altering their output based on the document content.

### Verification
- [ ] A test script (e.g., in Python or JS/TS) is provided to call the API endpoints sequentially (upload doc -> create meeting -> ask question -> retrieve result) and verify that status codes are 200/201 and the output contains the required fields.
