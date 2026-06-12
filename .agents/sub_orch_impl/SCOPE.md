# Scope: Boardroom AI Executive Team Web Application (Implementation)

## Architecture
- Next.js App Router (TypeScript, Tailwind CSS, shadcn/ui, Supabase)
- Obsidian/Amber Dark Mode Theme: low-radius corners, Libre Caslon Text (serif), Hanken Grotesk (sans-serif), JetBrains Mono (monospaced)
- Database: Supabase PostgreSQL (profiles, meetings, meeting_transcript, meeting_decisions, documents)
- Storage: Supabase Storage for report uploads

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
