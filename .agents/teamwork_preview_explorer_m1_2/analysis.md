# Milestone 1 Analysis: Project Setup

This report provides a comprehensive read-only analysis of the setup requirements for the Boardroom project. It details configurations for Next.js, tsconfig, Tailwind CSS, Google Fonts, and shadcn/ui adhering to all design constraints (low-radius corners, Obsidian/Amber theme, and specific font pairings).

---

## 1. Design & Typography Requirements

### 1.1 Fonts Integration via `next/font/google`
The project requires three fonts available on Google Fonts:
1. **Libre Caslon Text** (Serif): Used for editorial headers, titles, and premium boardroom-themed styling.
2. **Hanken Grotesk** (Sans-serif): Used as the primary sans-serif font for copy, forms, inputs, and base user interface components.
3. **JetBrains Mono** (Monospace): Used for technical logs, simulation feedback, timestamps, and metric visualizations.

#### Integration Logic in Next.js 15:
- **Libre Caslon Text**: Since this is a static serif font, we specify both `weight` (`['400', '700']`) and `style` (`['normal', 'italic']`).
- **Hanken Grotesk** and **JetBrains Mono**: These are variable fonts. Next.js natively handles variable range loading, so we only need to provide subsets (`['latin']`).
- Each font will be loaded with a custom CSS variable name (`--font-sans`, `--font-serif`, `--font-mono`) and applied in the layout wrapper to inject these variables into the HTML class list.

### 1.2 Obsidian/Amber Theme Custom Colors
The UI is dark-themed by default (dark mode first). We map colors into two groups: Custom Tailwind theme extensions (for direct utility classes) and Tailwind CSS variables mapped to shadcn/ui.
- **Obsidian Dark Backgrounds**:
  - Base Background: `#0b0b0b` (Obsidian Dark)
  - Card/Container Backgrounds: `#121212` (or `#121414` / `#080808` from screens)
- **Amber Highlight Colors**:
  - Branding Accent (DEFAULT): `#FFB800`
  - Amber-500 (Primary Highlight): `#f59e0b`
  - Amber-600 (Medium Highlight): `#d97706`
  - Amber-700 (Dark Accent): `#b45309`
- **Borders & Muted Accents**:
  - Graphite Border: `#1F1F1F`

### 1.3 Low-Radius Corners Constraint
Based on an analysis of the mock screen designs under `.agents/orchestrator/screens/`, the interface uses a neo-brutalist hybrid visual style:
- The screen templates (`landing.html` and `meetings.html`) specify `borderRadius` defaults of `0.125rem` (2px) and `lg` of `0.25rem` (4px).
- Other pages like `signin.html` and `settings.html` use `0px` border-radius (completely sharp corners).
- **Recommendation**: Map shadcn's base border-radius to `--radius: 0.25rem` (4px). Under this setup:
  - `rounded-lg` maps to `4px`
  - `rounded-md` maps to `2px` (ideal for buttons and inputs)
  - `rounded-sm` maps to `0px` (or we can use explicit `rounded-none` for elements requiring 0px corners, matching the signin screens).

---

## 2. Configuration & Setup Templates

### 2.1 `package.json`
Represents the dependencies, devDependencies, and scripts for Next.js 15+ and the styling libraries.

```json
{
  "name": "boardroom",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.400.0",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7",
    "@supabase/ssr": "^0.4.0",
    "@supabase/supabase-js": "^2.43.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "tailwindcss": "^3.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

### 2.2 `tsconfig.json`
Ensures strict TypeScript compilation rules, absolute imports using `@/*` mapping to `./src/*`, and support for Next.js plugins.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 2.3 `tailwind.config.ts`
Enables custom fonts mapping (`font-sans`, `font-serif`, `font-mono`), custom theme palettes (`obsidian`, `amber`, `graphite`), and CSS variables config for shadcn/ui.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Premium Obsidian / Amber branding color extensions
        obsidian: {
          DEFAULT: "#000000",
          deep: "#050505",
          dark: "#0b0b0b",
          card: "#121212",
          container: "#080808",
          alt: "#121414",
        },
        amber: {
          DEFAULT: "#FFB800",
          light: "#f59e0b",   /* Amber-500 */
          medium: "#d97706",  /* Amber-600 */
          dark: "#b45309",    /* Amber-700 */
        },
        graphite: "#1F1F1F",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### 2.4 `postcss.config.mjs`
Configures Tailwind CSS and Autoprefixer parsing.

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 2.5 `components.json`
Directs shadcn/ui to place variables in `globals.css` and source its TS components inside `src/components/ui`.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### 2.6 `src/app/globals.css`
Declares the base styles, maps default `:root` variables to Obsidian/Amber dark palette, and adds custom utility classes for the premium brutalist theme.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Theme overrides - Dark Mode by default */
    --background: 0 0% 4.3%;         /* #0b0b0b (Obsidian Dark) */
    --foreground: 0 0% 95%;           /* #f2f2f2 (Off-white body text) */

    --card: 0 0% 7%;                  /* #121212 (Obsidian Container) */
    --card-foreground: 0 0% 95%;

    --popover: 0 0% 7%;               /* #121212 */
    --popover-foreground: 0 0% 95%;

    --primary: 38 92% 50%;            /* #f59e0b (Amber highlight) */
    --primary-foreground: 0 0% 4.3%;  /* Near-black text for contrast on Amber */

    --secondary: 0 0% 12%;            /* #1f1f1f (Graphite dark gray) */
    --secondary-foreground: 0 0% 90%;

    --muted: 0 0% 12%;                /* #1f1f1f */
    --muted-foreground: 240 5% 64%;   /* Muted zinc text */

    --accent: 0 0% 12%;               /* Highlight backgrounds */
    --accent-foreground: 0 0% 98%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;

    --border: 0 0% 12.2%;             /* #1f1f1f (Graphite Border) */
    --input: 0 0% 12.2%;
    --ring: 38 92% 50%;               /* Amber focus ring */

    /* Low border-radius constraint */
    --radius: 0.25rem;                /* 4px base (rounded-lg = 4px, rounded-md = 2px) */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}

/* Custom visual utilities supporting premium brutalist styling */
@layer utilities {
  .brutal-border {
    border: 3px solid hsl(var(--foreground));
  }
  .brutal-border-primary {
    border: 3px solid hsl(var(--primary));
  }
  .brutal-border-graphite {
    border: 3px solid #1f1f1f;
  }
  
  .brutal-shadow {
    box-shadow: 4px 4px 0px 0px hsl(var(--foreground));
  }
  .brutal-shadow-primary {
    box-shadow: 4px 4px 0px 0px hsl(var(--primary));
  }
  .brutal-shadow-graphite {
    box-shadow: 4px 4px 0px 0px #1f1f1f;
  }
  
  .brutal-hover {
    transition: all 0.1s ease;
  }
  .brutal-hover:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px 0px hsl(var(--foreground));
  }
  .brutal-hover-primary:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px 0px hsl(var(--primary));
  }

  .noise-bg {
    position: relative;
  }
  .noise-bg::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.03;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }
}
```

### 2.7 `src/app/layout.tsx`
Loads Google Fonts and applies their CSS variable mappings to the HTML wrapper document.

```typescript
import type { Metadata } from "next";
import { Hanken_Grotesk, Libre_Caslon_Text, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boardroom AI - Executive Command Suite",
  description: "High-fidelity strategic simulation platform powered by Nimbus executive agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen noise-bg">
        {children}
      </body>
    </html>
  );
}
```

### 2.8 `src/app/page.tsx`
Provides a temporary landing page to demonstrate the integration of colors, typography hierarchy, and low-radius borders.

```typescript
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-8 max-w-4xl mx-auto">
      <header className="text-center space-y-4">
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white">
          BOARDROOM <span className="text-amber">AI</span>
        </h1>
        <p className="font-sans text-xl text-muted-foreground">
          Autonomous simulated executive guidance for the nimbus startup context.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* CTO Card */}
        <div className="bg-card border border-border p-6 rounded-lg space-y-4 brutal-hover-primary brutal-border-graphite shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-amber font-semibold uppercase tracking-widest">
              Agent // CTO
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">The Architect</h2>
          <p className="font-sans text-muted-foreground text-sm leading-relaxed">
            Evaluates system technical debt, architecture scaling pipelines, and core infra decisions against product velocity constraints.
          </p>
          <div className="pt-2 border-t border-border flex justify-between items-center text-xs font-mono">
            <span className="text-muted-foreground">Bias</span>
            <span className="text-white">Stability over Speed</span>
          </div>
        </div>

        {/* Auditor Card */}
        <div className="bg-card border border-border p-6 rounded-lg space-y-4 brutal-hover-primary brutal-border-graphite shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-amber font-semibold uppercase tracking-widest">
              Agent // RISK
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">The Auditor</h2>
          <p className="font-sans text-muted-foreground text-sm leading-relaxed">
            Monitors unit economics, runway projections, operational burn rate thresholds, and systemic downsides in investment rounds.
          </p>
          <div className="pt-2 border-t border-border flex justify-between items-center text-xs font-mono">
            <span className="text-muted-foreground">Bias</span>
            <span className="text-white">Capital Efficiency</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button className="font-sans uppercase font-bold tracking-wider rounded-md" size="lg">
          Assemble Board
        </Button>
        <button className="bg-transparent border border-border text-white px-6 py-2 rounded-md font-sans font-bold hover:bg-zinc-900 transition-colors uppercase text-sm tracking-wider">
          View Metrics
        </button>
      </div>
    </main>
  );
}
```

---

## 3. Directory Layout & Implementation Files List

During the implementation phase of Milestone 1, the following folder layout and files must be created:

```
/Users/misbahkhursheed/Developer/boardroom/
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── components.json
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   └── ui/              # Populated when shadcn component commands are run
    └── lib/
        └── utils.ts         # shadcn utility function (cn helper)
```

---

## 4. Verification Recommendations

To verify that the project setup has been correctly applied, the following steps should be executed by the implementer:
1. Run `npm install` to resolve and construct the node_modules tree.
2. Initialize shadcn components using:
   ```bash
   npx shadcn@latest init -y
   ```
   (Wait, verify that this aligns with the prepared templates).
3. Validate typography load state by opening dev tools and checking computed classes for font families.
4. Verify compiling and packaging using:
   ```bash
   npm run build
   ```
   This will ensure next/font loaders successfully fetch and embed font assets at build time, and that the typescript compiler outputs without strict errors.
