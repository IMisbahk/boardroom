# Original User Request

## Initial Request — 2026-06-12T14:46:34+05:30

Boardroom is a premium, high-fidelity venture-backed user experience containing board meetings, executive dashboards, document upload, and Supabase integration. It replicates designs from the Stitch project **Boardroom: AI Executive Team**.

Working directory: /Users/misbahkhursheed/Developer/boardroom
Integrity mode: development

## Design System Guidelines
- **Palette**: Dark Mode First. Base obsidian (`#000000`), container surfaces (`#080808` / `#121414`), borders graphite (`#1F1F1F`), primary accent Amber (`#FFB800`).
- **Typography**:
  - Headlines: *Libre Caslon Text*
  - Body: *Hanken Grotesk*
  - Labels & Data: *JetBrains Mono*
- **Shapes**: Low-radius corners (8px / 0.5rem for cards, 4px / 0.25rem for buttons and inputs, circular avatars).

## Requirements

### R1. Project Initialization
Initialize a standard Next.js project with TypeScript, Tailwind CSS, App Router, and shadcn/ui in the working directory.

### R2. High-Fidelity Views & Pages
Implement the following responsive routes and screens matching the Stitch Boardroom design:
- **Landing Page** (`/` or `/home`): Clean premium intro.
- **Dashboard** (`/dashboard`): Venture overview, roadmap, risk assessment.
- **Sidebar**: Fluid navigation layout.
- **Executive Team**: Executive cards and profile list.
- **Board Meetings**: Interactive timeline, executive cards, recommendation panels, confidence scores, and consensus section.
- **Reports**: Overview of reports and downloadable items.
- **Startup Context & Settings**: Context settings and platform configurations.

### R3. Interactive Board Meeting Screen
Design the Board Meeting view as a premium, interactive decision dashboard (not a ChatGPT-like chat window). Include:
- A decision timeline with monospaced timestamps.
- Consensus metrics and confidence score visualizations.
- Interactive recommendation widgets.

### R4. Supabase Integration
Connect to a live Supabase instance reading credentials from a `.env.local` file. Provide:
- User Authentication (Sign In / Sign Up flows).
- Document Upload Flow: Files uploaded to Supabase Storage with metadata saved in the database.
- Database Schema: Tables to hold meeting metadata, decisions, risks, recommendations, and executive profiles.

### R5. Venture Demo Data
Pre-populate the database and interface with realistic venture capital and startup metrics under the mock company **Nimbus**. Ensure the dashboard and board meetings have realistic decisions, discussions, risks, and roadmap items upon load.

## Acceptance Criteria

### UI & UX Polish
- [ ] Application strictly adheres to the custom fonts (*Libre Caslon Text*, *Hanken Grotesk*, *JetBrains Mono*) and the Obsidian/Amber color scheme.
- [ ] No blank pages or placeholder text. The dashboard is populated with realistic "Nimbus" startup data immediately.
- [ ] Responsive navigation and bento-grid layouts on desktop, tablet, and mobile.

### Functionality
- [ ] Working Authentication: Users can sign up, sign in, and log out with session persistence.
- [ ] File Upload: Drag-and-drop or select file interface that uploads documents to Supabase Storage and updates the dashboard reports lists in real-time.
- [ ] Interactive meeting timeline and decision consensus tools update live or simulate interactions cleanly.

### Verification Plan
- [ ] **Build Check**: `npm run build` runs successfully without TypeScript or Lint compilation errors.
- [ ] **Accessibility & SEO**: Pages use appropriate HTML5 semantic tags, unique IDs for interactive elements, and valid meta title/description tags.

## Follow-up — 2026-06-12T09:17:56Z

The user wants to make sure we are using the Stitch MCP to retrieve the designs and copy them directly. Please ensure that all subagents query Stitch MCP for the project 'Boardroom: AI Executive Team' (ID: 5686808672344924074), examine the screens, and replicate the layout, CSS, components, and HTML exactly. Please pass this instruction down to the Project Orchestrator and any subagents spawned.
