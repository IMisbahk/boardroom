# Boardroom E2E Testing Infrastructure

This document outlines the testing architecture, configurations, directory structure, and execution instructions for the Boardroom web application.

## Directory Structure

All E2E tests and configurations are located under the `tests/` directory and root directory:

```
/Users/misbahkhursheed/Developer/boardroom/
├── package.json               # Scripts and E2E dependencies
├── playwright.config.ts       # Global Playwright configurations
├── tsconfig.json              # TypeScript compilation rules
├── TEST_INFRA.md              # Infrastructure documentation (this file)
├── TEST_READY.md              # Test execution ready checklist and commands
├── tests/
│   ├── e2e/                   # E2E test files
│   │   ├── tier1.spec.ts      # Tier 1: Feature Coverage (Happy Paths)
│   │   ├── tier2.spec.ts      # Tier 2: Boundary & Corner Cases
│   │   ├── tier3.spec.ts      # Tier 3: Cross-Feature Combinations
│   │   ├── tier4.spec.ts      # Tier 4: Real-world User Journeys
│   │   ├── client.py          # Python backend E2E API Client
│   │   ├── conftest.py        # Python backend E2E test configurations
│   │   ├── run_tests.py       # Python test runner script
│   │   └── test_sanity.py     # Python backend E2E sanity tests
│   └── unit/                  # Unit tests
```

## Dual-Track Test Suite Architecture

Boardroom utilizes a dual-track E2E testing framework to validate both the user experience and the backend debate engine:

1. **Frontend UI E2E Track (Playwright & TypeScript)**:
   - Validates client-side routing, Next.js routes, CSS/Tailwind design elements, responsive views, interactive debate flows, sliders, and page transitions.
   - Configured in `playwright.config.ts`.
2. **Backend API E2E Track (Pytest & Python)**:
   - Validates the FastAPI API endpoints, Supabase database triggers, storage buckets, and LLM agent debate response consistency.
   - Configured in `tests/e2e/conftest.py`.

## Playwright Configuration

The global Playwright configuration in `playwright.config.ts` includes:
- **Test Directory**: `./tests/e2e` (captures `*.spec.ts` files).
- **Base URL**: Configured to `http://localhost:3000` (can be overridden by setting the `BASE_URL` environment variable).
- **Parallelization**: `fullyParallel: true` to run all test blocks in parallel.
- **Workers**: Auto-adjusted (set to 1 in CI environments).
- **Trace & Screenshots**: Screenshot captured on failure; tracing enabled on first retry.
- **Projects/Browsers**: Chromium, Firefox, WebKit.

## Core Features Inventory Under Test

1. **Landing Page (LAND)**: Bauhaus neo-brutalist theme, nav bar links, and Assemble CTA.
2. **Sign-in / Auth (AUTH)**: Identity verification, email/password inputs, login session persistence, and logout flow.
3. **Dashboard (DASH)**: Bento layout, nominal system tracker, primary directive card, and columns for discussions, insights, and decisions.
4. **Executive Team (TEAM)**: Roster cards for 10 executive members, corporate roles, biases, and invites.
5. **Board Meetings (MEET)**: Timeline with timestamps, consensus meters, speaking indicators, and recommendations ratification.
6. **Reports List (REP)**: Report items, metadata downloads, file uploads, and search filtering.
7. **Settings (SETT)**: Risk, Innovation, and Ethics sliders, Bloomberg/Salesforce CRM toggles, and Org Name update.
8. **Document Upload (UPLOAD)**: Ingestion trigger, upload progress, and storage integration.

## Execution Instructions

### Prerequisites
Ensure Node.js and Python packages are installed:
```bash
# Install Node dependencies
npm install

# Install Playwright browser binaries
npx playwright install
```

### Running Frontend Playwright Tests
To run the Playwright UI E2E test suite:
```bash
# Run all Playwright specs across all browsers (chromium, firefox, webkit)
npx playwright test

# Run a specific spec file
npx playwright test tests/e2e/tier3.spec.ts

# Run tests in UI mode for debugging
npx playwright test --ui

# Run tests targeting a custom base URL
BASE_URL=http://localhost:3000 npx playwright test
```

### Running Backend API Tests
To run the Pytest backend API E2E test suite:
```bash
# Activate virtual environment
source .venv/bin/activate

# Run Pytest suite
python tests/e2e/run_tests.py
```
