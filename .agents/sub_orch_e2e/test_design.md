# Playwright E2E Test Case Inventory: Boardroom

This document defines the comprehensive opaque-box E2E test cases using Playwright for the Boardroom web application. The test suite targets the Next.js routes, UI components, interactive states, and Supabase integrations.

---

## 4-Tier Test Suite Summary

| Tier | Category | Features / Scope | Number of Tests | Description |
|---|---|---|:---:|---|
| **Tier 1** | Feature Coverage | 8 Core Features | 40 | Happy path verification of each feature in isolation. |
| **Tier 2** | Boundary & Edge Cases | 8 Core Features | 40 | Validates edge cases, input limits, form validation, and error states. |
| **Tier 3** | Cross-Feature Interactions | Integrated Workflows | 5 | Verifies flow of state and transitions across different features. |
| **Tier 4** | Real-World User Journeys | Complex Business Scenarios | 5 | Simulates real founder-level venture capital and platform operations. |
| **Total** | | | **90** | |

---

## Core Features Under Test

1. **Landing Page (LAND)**: Route `/` or `/home`. Premium Bauhaus intro, navigation links, and principals show.
2. **Sign-in/Auth (AUTH)**: Route `/auth/signin` or `/signin`. Login form, validation, and session persistence.
3. **Dashboard (DASH)**: Route `/dashboard`. Main dashboard view, welcome message, bento layout, and status indicator.
4. **Executive Team (TEAM)**: Route `/team` or team section. Displays the 10 executive profiles, role bios, and biases.
5. **Board Meetings (MEET)**: Route `/meetings` or details `/meetings/[id]`. Timeline, consensus metrics, active speaker, debate transcript, and ratification controls.
6. **Reports List (REP)**: Route `/reports` or reports section. Listing uploaded/generated reports and metadata downloads.
7. **Settings (SETT)**: Route `/settings`. Sliders for governance weights, toggles for data sources, and account controls.
8. **Document Upload (UPLOAD)**: Part of `/reports` or dashboard. Drag-and-drop file upload interface to Supabase bucket.

---

## Tier 1: Feature Coverage (Happy Path)

### Feature 1: Landing Page (LAND)
- **E2E_T1_LAND_01**: Verify landing page loads successfully with page title "Boardroom - Your AI Executive Team".
- **E2E_T1_LAND_02**: Verify top navigation bar links exist and are visible (Platform, Governance, Insights, Case Studies).
- **E2E_T1_LAND_03**: Verify landing page CTA button "Assemble Your Board" is present and styled with neo-brutalist theme.
- **E2E_T1_LAND_04**: Verify landing page CTA button "Start a Meeting" is visible in the top nav and active.
- **E2E_T1_LAND_05**: Verify the AI Principals bento grid section loads and displays key executive roles (CTO, Growth, Risk Cards).

### Feature 2: Sign-in / Auth (AUTH)
- **E2E_T1_AUTH_01**: Verify Sign-in page loads with "IDENTITY VERIFICATION" heading and inputs for Work Email and Password.
- **E2E_T1_AUTH_02**: Verify successful login with correct credentials redirects the user to the `/dashboard`.
- **E2E_T1_AUTH_03**: Verify logout button on Account panel redirects user back to sign-in page and clears session.
- **E2E_T1_AUTH_04**: Verify signed-in session persists across page reloads on `/dashboard`.
- **E2E_T1_AUTH_05**: Verify presence and routing of "Single Sign-On" and "Request Access" links on login form.

### Feature 3: Dashboard (DASH)
- **E2E_T1_DASH_01**: Verify dashboard `/dashboard` displays "WELCOME, FOUNDER" in the header strip.
- **E2E_T1_DASH_02**: Verify dashboard displays system status as "NOMINAL" in the top bar.
- **E2E_T1_DASH_03**: Verify primary directive panel recommends "THE BOARD RECOMMENDS PRIORITIZING RETENTION OVER GROWTH THIS QUARTER."
- **E2E_T1_DASH_04**: Verify presence of three columns: Discussions (Seed Round Strategy), Insights (CTO Risk Flag), and Decisions (Hiring Freeze Lifted).
- **E2E_T1_DASH_05**: Verify sidebar navigation links are present and active (Context, Meetings, Team, Decisions, Reports, Settings, Support).

### Feature 4: Executive Team (TEAM)
- **E2E_T1_TEAM_01**: Verify team view displays the 10 executive board profiles (Aura, Vault, Nexus, Prism, Echo, etc.).
- **E2E_T1_TEAM_02**: Verify executive profiles list their correct corporate roles (Growth Lead, Investor Proxy, CTO, Product Strategy, Customer Advocate).
- **E2E_T1_TEAM_03**: Verify team cards show specific biases (e.g. "Capital efficiency and downside protection" for Risk / Investor Proxy).
- **E2E_T1_TEAM_04**: Verify clicking a profile card displays detail modal with extended background/experience metrics.
- **E2E_T1_TEAM_05**: Verify "Invite Member" button exists, displays a dialog, and is functional.

### Feature 5: Board Meetings (MEET)
- **E2E_T1_MEET_01**: Verify board meetings details page displays decision timeline with monospaced timestamps (e.g. "09:42 AM UTC").
- **E2E_T1_MEET_02**: Verify board meetings details page shows consensus meter visualization with current score (e.g. "Consensus 84%").
- **E2E_T1_MEET_03**: Verify speaking indicator is active next to current speaker in the board members sidebar list.
- **E2E_T1_MEET_04**: Verify live debate transcript renders messages with distinct agent branding (e.g. Catalyst, Auditor, Architect).
- **E2E_T1_MEET_05**: Verify recommendation panel "PROCEED WITH CAUTION (PHASED ROLLOUT)" is visible and contains a "Ratify" button.

### Feature 6: Reports List (REP)
- **E2E_T1_REP_01**: Verify reports view lists available startup reports (e.g. Nimbus Q3 financial audit, roadmap updates).
- **E2E_T1_REP_02**: Verify each report displays metadata (name, type, size in KB/MB, and timestamp).
- **E2E_T1_REP_03**: Verify download buttons for each report initiate document download flow.
- **E2E_T1_REP_04**: Verify search bar filters the reports list to matching terms (e.g. searching "audit").
- **E2E_T1_REP_05**: Verify that newly uploaded documents are immediately listed in the reports list view.

### Feature 7: Settings (SETT)
- **E2E_T1_SETT_01**: Verify settings page displays "SYSTEM CONFIG" header.
- **E2E_T1_SETT_02**: Verify sliders for Risk Tolerance (default 65%), Innovation Bias (default 80%), and Ethical Guardrails (default 95%) load with expected defaults.
- **E2E_T1_SETT_03**: Verify data ingestion toggles (Salesforce CRM, Bloomberg API, Internal DB, Legacy ERP) can be checked/unchecked.
- **E2E_T1_SETT_04**: Verify organization name input (pre-populated with "Acme Corporation" or "Nimbus") and License Tier badge are visible.
- **E2E_T1_SETT_05**: Verify clicking "Commit Protocol Changes" button triggers saving state and shows a success confirmation toast.

### Feature 8: Document Upload (UPLOAD)
- **E2E_T1_UPLOAD_01**: Verify document upload area is present on Reports page.
- **E2E_T1_UPLOAD_02**: Verify file input accepts PDF and txt files.
- **E2E_T1_UPLOAD_03**: Verify selected file is previewed with name and size.
- **E2E_T1_UPLOAD_04**: Verify clicking Upload initiates storage upload flow and displays success notification.
- **E2E_T1_UPLOAD_05**: Verify database updates metadata record for the uploaded document.

---

## Tier 2: Boundary & Corner Cases

### Feature 1: Landing Page (LAND)
- **E2E_T2_LAND_01**: Verify responsive menu triggers and menu items render correctly on mobile viewport.
- **E2E_T2_LAND_02**: Verify grid elements wrap cleanly without clipping text when page is zoomed to 200%.
- **E2E_T2_LAND_03**: Verify fallback system fonts render cleanly ifCaslon/Hanken web fonts fail to load.
- **E2E_T2_LAND_04**: Verify clicking hash links when target element is missing redirects cleanly without console errors.
- **E2E_T2_LAND_05**: Verify "Start a Meeting" CTA redirects to login with return parameter if user has no active session.

### Feature 2: Sign-in / Auth (AUTH)
- **E2E_T2_AUTH_01**: Verify form validation blocks submission and displays error for malformed email (e.g. "exec@boardroom").
- **E2E_T2_AUTH_02**: Verify login submission with wrong credentials displays "Invalid email or password" error toast and retains input values.
- **E2E_T2_AUTH_03**: Verify form submit is blocked if required email or password fields are empty.
- **E2E_T2_AUTH_04**: Verify account temporary lock warnings display after 5 consecutive failed login attempts.
- **E2E_T2_AUTH_05**: Verify password reset link/modal handles non-registered emails with generic response to prevent user enumeration.

### Feature 3: Dashboard (DASH)
- **E2E_T2_DASH_01**: Verify Discussions column shows "No discussions scheduled" empty state if DB timeline is empty.
- **E2E_T2_DASH_02**: Verify dashboard layout remains intact when an Insight description is extremely long (>1000 characters).
- **E2E_T2_DASH_03**: Verify Decisions column shows "No decisions recorded" empty state when no decisions exist in the database.
- **E2E_T2_DASH_04**: Verify sidebar navigation minimizes or becomes collapsible on tablet viewports.
- **E2E_T2_DASH_05**: Verify system auto-logs out and redirects to sign-in if session expires.

### Feature 4: Executive Team (TEAM)
- **E2E_T2_TEAM_01**: Verify "Invite Member" validation rejects empty inputs and displays inline error messages.
- **E2E_T2_TEAM_02**: Verify "Invite Member" checks for duplicate email and displays appropriate error message.
- **E2E_T2_TEAM_03**: Verify removing a member is blocked until the user confirms the action inside a modal.
- **E2E_T2_TEAM_04**: Verify executive list handles empty team state (displays prompt: "No executive board members added").
- **E2E_T2_TEAM_05**: Verify biography text that exceeds 1000 characters is truncated cleanly with "Show More" option.

### Feature 5: Board Meetings (MEET)
- **E2E_T2_MEET_01**: Verify that "ASK THE BOARD" input field blocks empty submissions (send button disabled).
- **E2E_T2_MEET_02**: Verify that entering a question with >1000 characters is rejected or truncated cleanly with a character count warning.
- **E2E_T2_MEET_03**: Verify markdown styling, backticks, and special characters display correctly in the debate bubbles.
- **E2E_T2_MEET_04**: Verify accessing a non-existent meeting ID displays a structured 404 page with navigation options.
- **E2E_T2_MEET_05**: Verify clicking "Ratify" on an already ratified recommendation is disabled or has no effect.

### Feature 6: Reports List (REP)
- **E2E_T2_REP_01**: Verify searching reports list with special regex/SQL characters (e.g. `'; SELECT *`) filters literally and does not cause query errors.
- **E2E_T2_REP_02**: Verify reports list paginates or scrolls lazily when dealing with 100+ documents.
- **E2E_T2_REP_03**: Verify attempting to download a missing/deleted file displays an error notification without crashing the page.
- **E2E_T2_REP_04**: Verify reports page displays structured "No files uploaded yet" view when empty.
- **E2E_T2_REP_05**: Verify deleting a report removes it from list and shows confirmation success toast.

### Feature 7: Settings (SETT)
- **E2E_T2_SETT_01**: Verify organization input blocks XSS scripts (e.g. `<script>alert(1)</script>`) and escapes inputs correctly.
- **E2E_T2_SETT_02**: Verify sliders handle mouse/keyboard inputs at extreme limits (0% and 100%) and update state.
- **E2E_T2_SETT_03**: Verify attempting to navigate away with unsaved settings changes displays browser confirmation dialog.
- **E2E_T2_SETT_04**: Verify that setting Ethical Guardrails to 0% displays warning dialog before save is allowed.
- **E2E_T2_SETT_05**: Verify organization name input handles maximum length limit of 100 characters.

### Feature 8: Document Upload (UPLOAD)
- **E2E_T2_UPLOAD_01**: Verify uploading a 0-byte file is blocked and shows error toast.
- **E2E_T2_UPLOAD_02**: Verify uploading an invalid file format (e.g. `.exe`, `.dmg`) is blocked with validation error.
- **E2E_T2_UPLOAD_03**: Verify uploading a file larger than 10MB displays a file size limit warning.
- **E2E_T2_UPLOAD_04**: Verify file upload displays progress bar and gracefully handles network disconnection.
- **E2E_T2_UPLOAD_05**: Verify that dragging and dropping multiple files is rejected if the bucket is configured for single upload.

---

## Tier 3: Cross-Feature Combinations

- **E2E_T3_COMB_01**: Unauthorized access protection. Navigating directly to `/dashboard`, `/meetings`, `/settings`, or `/reports` without a valid session redirects to `/signin`, and logs in afterwards to redirect back to target route.
- **E2E_T3_COMB_02**: Ingestion updates reports and dashboard count. Uploading a document on the `/reports` page successfully increments the report counter widget in the dashboard sidebar and updates reports listing.
- **E2E_T3_COMB_03**: Settings adjustment modifies debate behavior. Adjusting "Risk Tolerance" to "Conservative" (e.g. 10%) on Settings page and submitting a question in board meeting results in AI agents giving more cautious, risk-averse responses in debate transcript.
- **E2E_T3_COMB_04**: Board ratification creates dashboard decision log. Ratifying a recommendation in a board meeting creates a corresponding entry in the "Recent Decisions" table on the `/dashboard` page.
- **E2E_T3_COMB_05**: Sign-up populates default team & settings. Completing registration flow for a new founder account automatically populates default executive profiles in Database and sets default settings before redirecting to dashboard.

---

## Tier 4: Real-world User Journeys

- **E2E_T4_JOURNEY_01**: Nimbus Startup VC Metrics Simulation.
  - User signs in with founder credentials.
  - User views dashboard system status and metrics.
  - User navigates to Reports page and uploads "Nimbus Q3 Product Pitch.pdf".
  - User navigates to Meetings page and opens the "Q3 Funding Round" board meeting.
  - User inputs question: "Should we raise venture debt or extend runway with existing investors?"
  - User triggers debate, verifies CTO and CFO express conflicting views (Architect concerns vs liquidity risk).
  - User ratifies the board consensus recommendation ("PHASED ROLLOUT").
  - User returns to Dashboard and verifies the "PHASED ROLLOUT" decision is logged in "Recent Decisions".
- **E2E_T4_JOURNEY_02**: GDPR Compliance Strategy.
  - User logs in, goes to settings and toggles Bloomberg API on, updates Risk Tolerance to Conservative.
  - User uploads European market data, navigates to meetings.
  - User starts a meeting "GDPR Compliance Blockers", asks the board about scaling in Germany.
  - Verifies General Counsel warns about restrictive covenants.
  - User ratifies "Defer expansion until compliance audit is complete".
  - Verifies recent decisions list update.
- **E2E_T4_JOURNEY_03**: Technical Pivot Roadmap.
  - User logs in, goes to settings, sets Innovation Bias to Disruptive (90%).
  - User uploads roadmap plan document.
  - User starts meeting "Technical Pivot", asks "Should we refactor the core system now or build new features?".
  - Verifies CTO (Architect) and Growth Lead (Catalyst) debate.
  - Ratifies "Approve pivot with phased engineering sprints".
  - Verifies decision log and reports counts.
- **E2E_T4_JOURNEY_04**: Co-founder Transition Plan.
  - User logs in, goes to team settings.
  - User invites a new executive board member (Jane Doe, Chief Strategy Officer).
  - Starts meeting "Co-founder Exit and Transition".
  - Asks board how to structure equity buyback.
  - CFO (Auditor) and HR debate, ratifies "Defer buyback details until legal review".
  - Verifies updated team roster and decisions log.
- **E2E_T4_JOURNEY_05**: Paid Advertising CAC Optimization.
  - User logs in, updates settings toggling Salesforce CRM ingestion.
  - Uploads Q3 marketing expense document.
  - Starts meeting "Paid Marketing Reallocation".
  - Asks "Should we increase paid ads budget or optimize organic loops?".
  - Growth Lead and Risk Proxy debate, ratifies "Approve budget reallocation capped at $30k".
  - Verifies reports counts and decisions log.
