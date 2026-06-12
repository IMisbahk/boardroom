# Task Instructions: E2E Playwright Tier 1 Feature Coverage Tests

## Objective
Design and implement the E2E Playwright configuration and Tier 1 (Feature Coverage) test suite for the Boardroom web application.

## Your Identity & Working Directory
- Archetype: teamwork_preview_worker (E2E Tier 1 Worker)
- Working directory: /Users/misbahkhursheed/Developer/boardroom/.agents/worker_t1
- Predecessor/Coordinator: E2E Testing Track Orchestrator (ceff51f0-a5e4-4ffd-aef3-323d81c0de22)

## Context & Inputs
- Verbatim user request: `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/ORIGINAL_REQUEST.md`
- Core features and UI mockup files: `/Users/misbahkhursheed/Developer/boardroom/.agents/orchestrator/screens/`
- Test design inventory: `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/test_design.md`
- Scope document: `/Users/misbahkhursheed/Developer/boardroom/.agents/sub_orch_e2e/SCOPE.md`

## Scope of Work
1. **Initialize Playwright Configuration**: Create `/Users/misbahkhursheed/Developer/boardroom/playwright.config.ts`.
   - Setup basic config (testDir: './tests/e2e', use: { baseURL: 'http://localhost:3000', screenshot: 'only-on-failure' }, projects for Chromium, Firefox, WebKit).
2. **Implement Tier 1 Tests**: Create `/Users/misbahkhursheed/Developer/boardroom/tests/e2e/tier1.spec.ts`.
   - Implement exactly 40 test cases (5 per feature for all 8 features: Landing, Auth, Dashboard, Team, Meetings, Reports, Settings, Upload).
   - Use descriptive names matching the IDs: `E2E_T1_LAND_01` through `E2E_T1_UPLOAD_05` defined in `test_design.md`.
   - Use high-fidelity selectors based on the mockups in `.agents/orchestrator/screens/`.

## Completion Criteria
- `/Users/misbahkhursheed/Developer/boardroom/playwright.config.ts` exists and is populated.
- `/Users/misbahkhursheed/Developer/boardroom/tests/e2e/tier1.spec.ts` exists and contains 40 distinct test blocks.
- The typescript compiles without syntax/type errors.
- Write a handoff report at `/Users/misbahkhursheed/Developer/boardroom/.agents/worker_t1/handoff.md` detailing the implemented test cases and confirmation of verification checks.
- Communicate completion back to coordinator c64f... / ceff51f0-a5e4-4ffd-aef3-323d81c0de22.
