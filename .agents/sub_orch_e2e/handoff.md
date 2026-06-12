# E2E Test Case Design Handoff Report

## 1. Observation
- Under the E2E Testing Track, the scope definitions in `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/SCOPE.md` define 4 interfaces to test:
  1. Documents Ingestion & Retrieval:
     - `POST /api/documents`
     - `GET /api/documents/{startup_id}/chunks`
  2. Meetings Management:
     - `POST /api/meetings`
  3. Interactive Questioning (Ask Board):
     - `POST /api/meetings/{meeting_id}/ask`
  4. Executive Agents & Opinions:
     - `GET /api/meetings/{meeting_id}/agents/{agent_name}/opinion`
- The `PROJECT.md` at project root describes:
  - "Ten specialized agent personalities (CTO, CFO, Legal, etc.) with decision frameworks and prompts" (line 7)
  - "SQLite-backed storage for persistence" (line 10)
  - Functions: `create_meeting`, `ask_board`, `retrieve_relevant_chunks`, `ingest_document`, `get_agent_opinion`, `get_agent_challenge`, `get_agent_response`, and `run_debate` (lines 66-83)
- The user request specified the creation of a 4-tier test case inventory under `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/test_design.md` with:
  - Tier 1: Feature Coverage (>=5 test cases per feature, covering happy path workflows).
  - Tier 2: Boundary & Corner Cases (>=5 test cases per feature, covering empty inputs, size limits, invalid schema, special characters, error handling).
  - Tier 3: Cross-Feature Combinations (pairwise coverage, >=5 test cases).
  - Tier 4: Real-world Application Scenarios (>=5 realistic business scenarios).
  - Specific fields for each test case (ID, Feature, Payload, Endpoint, HTTP method, Status, Verification details).
- Created `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/test_design.md` containing all 60 required test cases matching the contracts.

## 2. Logic Chain
1. Based on the requirements in `ORIGINAL_REQUEST.md` and the architecture described in `PROJECT.md` and `SCOPE.md`, the backend consists of 5 core features:
   - Document Ingestion & Retrieval
   - Meeting Creation & Setup
   - Interactive Board Q&A & Debate Engine
   - Executive Agent Opinions & Personalities
   - Consensus Metrics & Decision Synthesis
2. For **Tier 1 (Feature Coverage)**: Happy path flows were created for all 5 features, yielding 25 test cases. Every case specifies the target API route, HTTP method, payload structure matching the interface contracts in `SCOPE.md`, and response schema validation.
3. For **Tier 2 (Boundary & Corner Cases)**: Boundaries such as 0-byte files, extremely long file names, path traversal inputs, invalid limit parameters, negative values, and missing required JSON properties were mapped out for each of the 5 features, yielding 25 test cases.
4. For **Tier 3 (Cross-Feature Combinations)**: 5 pairwise test cases were designed to check state transitions between ingestion, retrieval, meeting creation, and the multi-turn debate sequence.
5. For **Tier 4 (Real-world Application Scenarios)**: 5 complex business scenarios relevant to a startup (Series A vs. Venture Debt, Technical Pivot rewrite, Paid CAC budget shift, GDPR EU expansion, Co-founder transition) were modeled.
6. This results in a comprehensive inventory of 60 test cases designed to guide the upcoming implementation of E2E tests.

## 3. Caveats
- The backend implementation is not yet built, so the actual endpoints could deviate slightly in path naming or JSON nesting. The test runner implementation should allow easy configuration overrides.
- Active agent lists for the debate questions (specifically the custom list input) were assumed to be supported dynamically or implicitly resolved based on topic context.

## 4. Conclusion
- The test design phase (M1) is complete. The 60 test cases are successfully cataloged in `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/test_design.md` with exact schemas. This file acts as the single source of truth for the implementing agents during the next phases.

## 5. Verification Method
- **File Inspection**: Verify that the file `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/test_design.md` exists and contains 60 test cases structured in 4 tiers.
- **Contract Compliance**: Compare endpoints (e.g. `POST /api/documents`, `POST /api/meetings`, `POST /api/meetings/{id}/ask`, `GET /api/meetings/{id}/agents/{name}/opinion`) and fields defined in `test_design.md` against `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/SCOPE.md`.
