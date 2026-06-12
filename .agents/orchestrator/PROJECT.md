# Project: Boardroom AI Executive Team Web Application

## Architecture
The Boardroom application is a responsive, high-fidelity Next.js web experience with a PostgreSQL database and Supabase integration. It follows a dark-mode-first aesthetic with Obsidian/Amber palette and custom typography.

### Layout & Page Flow
- `/signin` - Authentication (Sign In & Sign Up flows)
- `/` or `/home` - Landing Page
- `/dashboard` - Venture overview, roadmap, risk assessment (default view for mock company "Nimbus")
- `/team` - Executive board member cards (the 10 principals)
- `/meetings` - Interactive board meeting list
- `/meetings/[id]` - Board meeting detail and interactive debate timeline
- `/reports` - Document upload interface, files list, real-time update
- `/settings` - Startup settings and platform configurations

---

## Code Layout
```
/Users/misbahkhursheed/Developer/boardroom/
├── public/                 # Static assets (fonts, images)
├── src/
│   ├── app/                # Next.js App Router Pages & Layouts
│   │   ├── layout.tsx      # Global layout with fonts and context
│   │   ├── page.tsx        # Landing Page
│   │   ├── signin/         # Auth pages (Sign In & Sign Up)
│   │   │   └── page.tsx
│   │   ├── dashboard/      # Venture Dashboard
│   │   │   └── page.tsx
│   │   ├── team/           # Executive Team profiles
│   │   │   └── page.tsx
│   │   ├── meetings/       # Board Meetings Timeline & Detail
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── reports/        # Reports & Document Upload
│   │   │   └── page.tsx
│   │   └── settings/       # Settings & Configurations
│   │       └── page.tsx
│   ├── components/         # Shared UI components
│   │   ├── sidebar.tsx     # Fluid navigation layout
│   │   ├── ui/             # shadcn/ui base elements (cards, buttons, dialogs, progress)
│   │   └── meeting/        # Meeting-specific components (timeline, consensus gauge)
│   ├── lib/                # Shared utilities
│   │   ├── supabase.ts     # Supabase client configurations
│   │   ├── database.types.ts # TypeScript database definitions
│   │   └── seed-data.ts    # Venture VC & mock database seeds
│   └── styles/
│       └── globals.css     # Global styles & Tailwind configuration
├── supabase/
│   ├── migrations/         # PostgreSQL schema definitions
│   └── config.toml         # Local Supabase configurations (if any)
├── tests/                  # Playwright E2E tests
│   └── e2e/
├── package.json            # Project dependencies
├── tailwind.config.ts      # Tailwind setup with custom theme variables
├── tsconfig.json           # TS configurations
└── ORIGINAL_REQUEST.md    # Original request file
```

---

## Interface Contracts

### Supabase Database Tables

#### `profiles` (Executive profiles seed data)
- `id` (uuid, primary key)
- `name` (text, e.g. Aura, Vault, Nexus)
- `role` (text, e.g. Growth Lead, Investor, CTO)
- `avatar_icon` (text, Material symbols identifier)
- `bio` (text)
- `bias` (text)
- `alignment` (int, 0-100)

#### `meetings` (Board meetings list)
- `id` (uuid, primary key)
- `title` (text)
- `status` (text, active/completed)
- `topic` (text)
- `consensus_score` (int, 0-100)
- `confidence_score` (int, 0-100)
- `created_at` (timestamptz)

#### `meeting_transcript` (Debate turns)
- `id` (uuid, primary key)
- `meeting_id` (uuid, references meetings)
- `sender_name` (text)
- `sender_role` (text)
- `message` (text)
- `turn_type` (text, statement/challenge/response)
- `timestamp` (text, monospaced formatted timestamp, e.g., "14:02:15 UTC")

#### `meeting_decisions`
- `id` (uuid, primary key)
- `meeting_id` (uuid, references meetings)
- `title` (text)
- `status` (text)
- `details` (text)

#### `documents` (Uploaded files metadata)
- `id` (uuid, primary key)
- `name` (text)
- `file_path` (text)
- `bucket_name` (text)
- `uploaded_at` (timestamptz)

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|-------------|--------|
| 1 | M1: Project Setup | Next.js, tsconfig, tailwind, fonts, and shadcn setup | None | PLANNED |
| 2 | M2: Database & Auth | Supabase schema migrations, seed scripts, Auth flow components | M1 | PLANNED |
| 3 | M3: Core Routing & Sidebar | Sidebar integration, Landing page, Team list, Settings, and Reports views | M2 | PLANNED |
| 4 | M4: Interactive Boardroom | Dashboard with venture metrics, meetings timeline, consensus, and confidence score logic | M3 | PLANNED |
| 5 | M5: File Upload Integration | Supabase storage file upload logic and real-time reports updating | M2, M3 | PLANNED |
| 6 | M6: E2E Playwright Suite | Feature coverage, edge-cases, and cross-feature integration test cases | M4, M5 | PLANNED |
| 7 | M7: Final Alignment & Hardening | Phase 1: 100% test pass. Phase 2: Challenger white-box test and audit compliance | M6 | PLANNED |
