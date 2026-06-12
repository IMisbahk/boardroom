# Project: Boardroom AI Executive Team Web Application

## Architecture
The Boardroom application is a premium, dark-themed, high-fidelity web application built using the following stack:
1. **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS, and shadcn/ui.
2. **Backend & Database**: Supabase (PostgreSQL tables, Authentication, and Storage bucket for document uploads).
3. **Typography & Styling**: Dark Mode first using Obsidian (`#000000`), Containers (`#080808` / `#121414`), Borders graphite (`#1F1F1F`), and Amber accent (`#FFB800`). Fonts: Libre Caslon Text, Hanken Grotesk, JetBrains Mono.
4. **Mock Startup Context**: Seeded database/UI with Venture VC metrics and 10 executive agent profiles under the startup "Nimbus".

```
                       ┌─────────────────────────┐
                       │   Next.js App Router    │
                       │    (React Clients)      │
                       └────────────┬────────────┘
                                    │ Supabase Client / Auth / Storage
                                    ▼
                       ┌─────────────────────────┐
                       │     Supabase Cloud      │
                       │   (Auth, DB, Storage)   │
                       └─────────────────────────┘
```

## Code Layout
```
/Users/misbahkhursheed/Developer/boardroom/
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── layout.tsx      # Core wrapper (Fonts, Sidebar grid)
│   │   ├── page.tsx        # Landing / Home Page
│   │   ├── (auth)/
│   │   │   ├── login/      # Sign-in flow
│   │   │   └── signup/     # Sign-up flow
│   │   ├── dashboard/      # Venture dashboard overview
│   │   ├── team/           # Executive team list and profile cards
│   │   ├── reports/        # Document upload and report retrieval
│   │   ├── meetings/       # Meetings list and timeline
│   │   │   ├── page.tsx
│   │   │   └── [id]/       # Interactive meeting dashboard
│   │   └── settings/       # Startup context & platform config
│   ├── components/         # React components
│   │   ├── ui/             # shadcn elements (cards, buttons, dialogs)
│   │   └── sidebar.tsx     # Fluid sidebar layout
│   └── lib/                # Utilities and client helpers
│       └── supabase.ts     # Supabase client initializer
├── supabase/               # Database migrations & seed scripts
│   ├── migrations/         # PostgreSQL table schemas
│   └── seed.sql            # Seeds "Nimbus" data (executives, metrics)
├── tests/
│   └── e2e/                # Playwright E2E tests (Tiers 1-4)
├── package.json            # NPM dependencies and build commands
├── tailwind.config.ts      # Obsidian / Amber color configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # User documentation
```

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|-------------|--------|
| 1 | M1: Project Setup | Setup Next.js, TypeScript, Tailwind, Fonts, and shadcn | None | PLANNED |
| 2 | M2: DB & Auth Setup | Create Supabase tables, migrations, seeds, login/signup flows | M1 | PLANNED |
| 3 | M3: Core Views | Sidebar, Landing page, Team cards, Settings, and Reports list | M2 | PLANNED |
| 4 | M4: Interactive Boardroom | Dashboard, meetings list, timeline, consensus, and confidence | M3 | PLANNED |
| 5 | M5: Storage Ingestion | Connect report uploads to Supabase storage with database updates | M2, M3 | PLANNED |
| 6 | M6: E2E Playwright Suite | Feature coverage, edge case, and cross-feature E2E Playwright tests | M4, M5 | PLANNED |
| 7 | M7: Alignment & Hardening | Pass all tests, challenger white-box checks, audit compliance | M6 | PLANNED |
