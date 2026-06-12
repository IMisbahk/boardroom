# Milestone 1: Project Setup - Analysis & Configuration Templates

This document outlines the findings, file structure, and configuration templates required to initialize the Boardroom AI Executive Team Web Application under Milestone 1.

---

## 1. Requirements & Findings

### Font Integration
The project requires three specific fonts to replace the temporary font families (`Space Grotesk` and `Inter`) found in the HTML design screens:
1. **Libre Caslon Text** (Serif): Used as the primary headline/display font. Replaces `Space Grotesk` / `font-headline` / `font-display`. Implemented via `Libre_Caslon_Text` from `next/font/google`.
2. **Hanken Grotesk** (Sans-Serif): Used for body text, form elements, labels, and paragraph copy. Replaces `Inter` / `font-body`. Implemented via `Hanken_Grotesk` from `next/font/google`.
3. **JetBrains Mono** (Monospace): Used for metrics, metadata, logs, and system states. Implemented via `JetBrains_Mono` from `next/font/google`.

All three fonts are available on Google Fonts and will be imported using Next.js `next/font/google` in the root layout file (`src/app/layout.tsx`), configured as custom CSS variables, and integrated into the Tailwind theme.

### Theme & Colors: Obsidian/Amber Brutalism
The aesthetic of Boardroom is a premium, high-contrast brutalist design.
- **Obsidian Dark Mode Background**: `#000000` (deep pitch black) for the base body background, and `#080808` / `#121414` / `#121212` for containers/cards.
- **Borders**: Graphite/Dark Grey `#1F1F1F` or `#1a1a1a` to frame components.
- **Amber Highlights**: Bright Amber `#FFB800` (with secondary options like `#f59e0b`, `#d97706`, and `#b45309`) for primary actions, focus state rings, and system status indicators.
- **Text/Foreground**: High contrast `#f5f0e8` (light warm cream) for light mode, and `#ffffff` / `#e2ddd4` for dark mode.

### Corner Radius
- **Requirement**: Low-radius corners (2px or 4px).
- **Implementation**: Set `--radius: 0.25rem` (4px) in the global CSS variables. Tailwind classes will map to this via `rounded-lg` (4px), `rounded-md` (2px), and `rounded-sm` (0px). All button, input, card, and dialog components will use these low-radius classes.

---

## 2. Milestone 1 File Structure

The project files created or modified during Milestone 1 setup will be:
```
/Users/misbahkhursheed/Developer/boardroom/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── components.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/
│   └── lib/
│       └── utils.ts
```

---

## 3. Configuration Templates

### `package.json`
This defines Next.js 15, TypeScript, React 19, Tailwind CSS, and essential utilities like `clsx`, `tailwind-merge`, and `lucide-react`.

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
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.468.0",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20.17.9",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.7.2"
  }
}
```

### `tsconfig.json`
TypeScript setup supporting path aliases (`@/*` pointing to `./src/*`) and Next.js plugin integration.

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

### `tailwind.config.ts`
Tailwind setup mapping CSS variables to theme tokens, extending font families for Google Fonts, and configuring Obsidian/Amber colors.

```typescript
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

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
        sans: ["var(--font-hanken-grotesk)", ...fontFamily.sans],
        serif: ["var(--font-libre-caslon)", ...fontFamily.serif],
        mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
        display: ["var(--font-libre-caslon)", ...fontFamily.serif],
        body: ["var(--font-hanken-grotesk)", ...fontFamily.sans],
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
          obsidian: "#000000",
          graphite: "#1F1F1F",
          amber: {
            light: "#f59e0b",
            DEFAULT: "#FFB800",
            dark: "#d97706",
            deep: "#b45309",
          }
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### `components.json`
Configuration file for shadcn/ui installation.

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

### `src/app/globals.css`
Applies variables for dark mode by default, adhering to `#000000` (background), `#080808` (cards), `#121212` (secondary), `#1F1F1F` (graphite borders), `#FFB800` (amber primary). Sets radius to `0.25rem` (4px).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 38 100% 50%; /* #FFB800 */
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 38 100% 50%;

    --radius: 0.25rem; /* Low-radius corners: 4px */
  }

  .dark {
    /* Obsidian Dark Base */
    --background: 0 0% 0%; /* #000000 */
    --foreground: 0 0% 98%;

    /* Containers */
    --card: 0 0% 3%; /* #080808 */
    --card-foreground: 0 0% 98%;

    --popover: 0 0% 3%;
    --popover-foreground: 0 0% 98%;

    /* Amber Highlight */
    --primary: 38 100% 50%; /* #FFB800 */
    --primary-foreground: 0 0% 0%; /* Black text on amber highlights */

    --secondary: 0 0% 7%; /* #121212 / #121414 */
    --secondary-foreground: 0 0% 98%;

    --muted: 0 0% 10%;
    --muted-foreground: 0 0% 63.9%;

    --accent: 38 100% 50%;
    --accent-foreground: 0 0% 0%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    /* Graphite borders */
    --border: 0 0% 12%; /* #1F1F1F */
    --input: 0 0% 12%;
    --ring: 38 100% 50%;

    --radius: 0.25rem; /* Low-radius corners: 4px */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}
```

### `src/app/layout.tsx`
Handles loading Google Fonts dynamically and exposing them via CSS variables on the `html` element. Sets up dark mode class.

```tsx
import type { Metadata } from "next";
import { Libre_Caslon_Text, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Configure Serif Display Font
const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
  display: "swap",
});

// Configure Sans Body Font
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

// Configure Monospace Font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boardroom AI - Executive Team Simulation",
  description: "High-fidelity strategic simulation and decision-making platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreCaslon.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
```

### `src/app/page.tsx`
Simple entry-point check to verify that layout is fully operational.

```tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 border-4 border-primary m-4 bg-card shadow-[6px_6px_0px_0px_rgba(255,184,0,1)]">
      <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-primary">
        Boardroom AI
      </h1>
      <p className="font-body text-lg text-muted-foreground mt-4">
        System Setup Verification Status: <span className="font-mono text-primary">NOMINAL</span>
      </p>
    </main>
  );
}
```

### `src/lib/utils.ts`
Helper file for merging tailwind classes dynamically.

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
