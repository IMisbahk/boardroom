# Plan - Boardroom Project Implementation

This document outlines the detailed step-by-step implementation plan for the Boardroom user experience. Boardroom is a premium, dark-themed, high-fidelity web application built using Next.js, TypeScript, Tailwind CSS, App Router, shadcn/ui, and Supabase.

## Architecture & Tech Stack
- **Frontend**: Next.js 15+ (App Router), React 19, Tailwind CSS, shadcn/ui components (cards, dialogs, buttons, dropdowns).
- **Backend & Database**: Supabase (PostgreSQL tables, auth, storage buckets for document uploads).
- **State Management**: React Context / Zustand (optional) for meeting state, client-side Supabase client.
- **Design Specifications**: Replicating from the Stitch project "Boardroom: AI Executive Team" (ID: `5686808672344924074`).
- **Demo Data**: "Nimbus" startup context with 10 pre-populated executive profiles and initial VC metrics.

---

## Detailed Milestones

### Milestone 1: Environment & Project Setup (Next.js & shadcn/ui)
- Initialize Next.js project with TypeScript, ESLint, Tailwind CSS, and App Router.
- Install shadcn/ui and configure theme colors:
  - Base Obsidian: `#000000`
  - Container Surfaces: `#080808` / `#121414`
  - Borders Graphite: `#1F1F1F`
  - Primary Accent Amber: `#FFB800`
  - Fonts: Libre Caslon Text, Hanken Grotesk, JetBrains Mono.
- Setup layout components: Sidebar, main page container.
- Verification: `npm run build` succeeds.

### Milestone 2: Supabase Integration & Authentication Flow
- Create Supabase client helper.
- Setup Supabase Auth: Sign In, Sign Up, and Sign Out pages.
- Setup DB Schema via migrations/scripts:
  - `profiles`: executive profile data (CTO, CFO, Finance, etc.).
  - `meetings`: records of meetings and discussions.
  - `meeting_decisions`: decisions made during meetings.
  - `meeting_transcript`: conversational challenge-response transcripts between agents.
  - `meeting_recommendations`: recommendations from executive board.
  - `documents`: document metadata.
- Pre-populate database with Venture Demo Data for "Nimbus".
- Verification: Auth flows persist sessions; database contains seed data.

### Milestone 3: Core Views (Landing, Team, Reports, Settings)
- **Landing Page** (`/` or `/home`): High-fidelity Obsidian/Amber introduction to Boardroom.
- **Executive Team Page** (`/team`): Responsive cards for the 10 executive members showing roles, bios, and metrics.
- **Reports Page** (`/reports`): Upload documents interface, document list, and metadata download buttons.
- **Startup Context & Settings** (`/settings`): Context variables and platform configurations.
- Verification: Clean UI routing, responsive layouts, data successfully loads from Supabase.

### Milestone 4: Interactive Board Meeting Screen & Dashboard
- **Dashboard** (`/dashboard`): Venture overview, roadmap, risk assessment using mock company "Nimbus".
- **Board Meetings Page** (`/meetings`): List of meetings, start meeting dialog.
- **Board Meeting Details** (`/meetings/[id]`): High-fidelity interactive decision dashboard containing:
  - Decision timeline with monospaced timestamps.
  - Consensus metrics and confidence score visualizations (radar, progress bar, or gauges).
  - Interactive recommendation widgets.
  - Discussion transcript showing executive agent challenge-response debates.
- Verification: Full interactivity (e.g. adding a question, updating consensus or confidence scores).

### Milestone 5: File Upload & Supabase Storage Flow
- Connect document upload form on `/reports` page to Supabase Storage.
- Upload documents to `documents` bucket, write metadata to `documents` table, and update the dashboard lists in real-time.
- Verification: File successfully uploads to Supabase and is listed instantly.

---

## Dual-Track Testing Strategy

### E2E Testing Track
- Setup Playwright E2E test suite.
- Write E2E test cases across 4 tiers:
  - **Tier 1**: Feature coverage (sign up, sign in, document upload, board meeting creation, dashboard navigation).
  - **Tier 2**: Edge/boundary cases (invalid login credentials, empty file uploads, large text limits).
  - **Tier 3**: Cross-feature interactions (unauthorized access to dashboard, file upload updates dashboard counts).
  - **Tier 4**: Real-world application scenarios (full user journey from onboarding to document upload to board meeting decision review).
- Write `TEST_READY.md` containing runner commands and checklist.

### Implementation Verification Track
- Run Playwright E2E tests against local server.
- Fix bugs and ensure 100% test pass rate.
- Perform white-box adversarial coverage checks (Tier 5) to locate gaps and add robust error boundaries.
- Run Forensic Auditor to ensure no dummy implementations or hardcoded answers.
