# Scope: Boardroom E2E Playwright Testing Track

## Architecture
The E2E test suite is an opaque-box validator for the Boardroom Next.js application.
- It uses **Playwright** as the test runner and browser automation framework.
- The tests are written in TypeScript under `tests/e2e/`.
- The tests will run against a running instance of the frontend application (URL configurable via `BASE_URL`, defaulting to `http://localhost:3000`).
- It tests client-side navigation, responsive views, forms, interactive elements (timeline, consensus widgets), and integration with Supabase (Auth, Storage uploads).

```
                    ┌──────────────────────────┐
                    │  Playwright E2E Tests    │
                    │    (tests/e2e/*.spec.ts) │
                    └────────────┬─────────────┘
                                 │ HTTP / DOM actions
                                 ▼
                    ┌──────────────────────────┐
                    │   Next.js Frontend App   │
                    │   (running on port 3000) │
                    └────────────┬─────────────┘
                                 │ Supabase JS client
                                 ▼
                    ┌──────────────────────────┐
                    │      Supabase API        │
                    │   (Auth, DB, Storage)    │
                    └──────────────────────────┘
```

## Routes & Pages Under Test
| Route | Page / View | Key Elements to Verify |
|---|---|---|
| `/` or `/home` | Landing Page | Navigation links, CTAs ("Assemble Your Board", "Start a Meeting"), AI Principals grid |
| `/signin` | Sign-in Page | Email input `#email`, password input `#password`, submit button "ENTER BOARDROOM" |
| `/dashboard` | Founder Dashboard | Welcome header, nominal status tracker, primary directive block, columns for Discussions, Insights, and Decisions |
| `/meetings` | Meetings List | Meetings index list, "New Decision" / "Start Meeting" button |
| `/meetings/[id]` | Board Meeting Detail | Timeline with timestamps, consensus progress bar/score, speaking indicator, debate transcript bubbles, recommendation panel with "Ratify" button |
| `/reports` | Reports & Uploads | Document list, download links, file upload zone (drag-and-drop / input file), upload progress |
| `/team` | Executive Team | Profile cards for 10 AI board members showing roles and biases |
| `/settings` | System Settings | Sliders (Risk, Innovation, Ethical Guardrails), toggles for data sources, Organization Name input, Sign Out button |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Playwright Test Case Design | Define routes, pages, selectors, and catalog 90 tests | None | DONE |
| 2 | M2: Test Infrastructure Setup | Create Playwright configuration, tsconfig, package scripts | M1 | IN_PROGRESS |
| 3 | M3: Implement Tier 1 Feature Tests | Write Playwright tests for happy paths (8 features * 5 tests) | M2 | PLANNED |
| 4 | M4: Implement Tier 2 Boundary Tests | Write Playwright tests for edge cases & errors (8 features * 5 tests) | M3 | PLANNED |
| 5 | M5: Implement Tier 3 & 4 Tests | Write Playwright tests for cross-feature and real-world journeys | M4 | PLANNED |
| 6 | M6: Verification & Publishing | Verify test compilation, write TEST_INFRA.md and TEST_READY.md | M5 | PLANNED |
