# Task Instructions: E2E Playwright Tier 3 & 4 Tests and Publishing

## Objective
Design and implement the E2E Playwright Tier 3 (Cross-Feature Combinations) and Tier 4 (Real-world User Journeys) test suites for the Boardroom web application, and write global test documentation (`TEST_INFRA.md` and `TEST_READY.md`).

## Your Identity & Working Directory
- Archetype: teamwork_preview_worker (E2E Tier 3 & 4 Worker)
- Working directory: /Users/misbahkhursheed/Developer/boardroom/.agents/worker_t3_t4
- Predecessor/Coordinator: E2E Testing Track Orchestrator (ceff51f0-a5e4-4ffd-aef3-323d81c0de22)

## Context & Inputs
- Verbatim user request: `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/ORIGINAL_REQUEST.md`
- Core features and UI mockup files: `/Users/misbahkhursheed/Developer/boardroom/.agents/orchestrator/screens/`
- Test design inventory: `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/test_design.md`
- Scope document: `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/SCOPE.md`

## Scope of Work
1. **Implement Tier 3 Tests**: Create `/Users/misbahkhursheed/Developer/boardroom/tests/e2e/tier3.spec.ts`.
   - Implement exactly 5 test cases (`E2E_T3_COMB_01` through `E2E_T3_COMB_05`) covering cross-feature interactions (unauthorized navigation, file upload sidebar count updates, settings adjustments, ratification creating decision logs, etc.).
2. **Implement Tier 4 Tests**: Create `/Users/misbahkhursheed/Developer/boardroom/tests/e2e/tier4.spec.ts`.
   - Implement exactly 5 test cases (`E2E_T4_JOURNEY_01` through `E2E_T4_JOURNEY_05`) covering end-to-end user journeys (Nimbus startup VC metrics simulation, GDPR compliance expansion, Technical Pivot roadmap, Co-founder transition, and Paid Ads CAC optimization).
3. **Publish TEST_INFRA.md**: Create `/Users/misbahkhursheed/Developer/boardroom/TEST_INFRA.md`.
   - Document the test suite structure, Playwright configurations, features inventory, directories, and how to execute the test runner.
4. **Publish TEST_READY.md**: Create `/Users/misbahkhursheed/Developer/boardroom/TEST_READY.md`.
   - Complete the standard template, containing expected run commands, coverage metrics across all 4 tiers, and status checklists for the implementation track.

## Completion Criteria
- `/Users/misbahkhursheed/Developer/boardroom/tests/e2e/tier3.spec.ts` exists and contains 5 tests.
- `/Users/misbahkhursheed/Developer/boardroom/tests/e2e/tier4.spec.ts` exists and contains 5 tests.
- `/Users/misbahkhursheed/Developer/boardroom/TEST_INFRA.md` exists and is formatted correctly.
- `/Users/misbahkhursheed/Developer/boardroom/TEST_READY.md` exists and is formatted correctly.
- Write a handoff report at `/Users/misbahkhursheed/Developer/boardroom/.agents/worker_t3_t4/handoff.md` detailing the implemented tests and files created.
- Communicate completion back to coordinator c64f... / ceff51f0-a5e4-4ffd-aef3-323d81c0de22.
