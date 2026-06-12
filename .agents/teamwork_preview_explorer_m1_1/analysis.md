# Milestone 1: Project Setup Analysis (Next.js, tsconfig, tailwind, fonts, and shadcn setup)

This document provides a comprehensive analysis of the requirements and a plan for Milestone 1 setup of the Boardroom AI Executive Team Web Application. Boardroom features a dark-themed Obsidian/Amber aesthetic with low-radius corners and custom typography.

---

## 1. Requirement Analysis & Design Mapping

### 1.1 Typography Analysis
The design requirements specify three Google Fonts:
1. **Libre Caslon Text**: A premium serif font with classic, elegant proportions. Ideal for display titles, logos, and major section headlines.
2. **Hanken Grotesk**: A modern, highly legible sans-serif font. Ideal for body copy, labels, forms, lists, and button text.
3. **JetBrains Mono**: A clean, technical monospace font. Ideal for system metrics, timestamps, logs, and AI confidence/consensus ratings.

#### Google Fonts Integration
These fonts are all available on Google Fonts and should be integrated using `next/font/google` to minimize layout shifts and optimize loading times.

| Mockup Element / Class | Mockup Font (Default) | Proposed Font Family (Google Font) | CSS Class Variable | Rationale |
|---|---|---|---|---|
| Display / Headlines | `Space Grotesk` | `Libre Caslon Text` | `var(--font-libre-caslon)` | Elevates the app's style to a premium, "executive boardroom" feel. |
| Body / Form Inputs | `Inter` | `Hanken Grotesk` | `var(--font-hanken-grotesk)` | Highly modern, clean, and professional geometric sans-serif for readability. |
| Badges / Metrics / Code | N/A | `JetBrains Mono` | `var(--font-jetbrains-mono)` | Precise technical appearance for AI confidence scores, timestamps, and database records. |

---

### 1.2 Theme & Colors Plan (Obsidian / Amber)
The Boardroom app is dark-themed by default, incorporating high-contrast brutalist borders and offset shadows. 

* **Base Background (Obsidian)**: `#000000` (Default dark) or `#0b0b0b` / `#121212` (Varying dark surface levels).
* **Container Surfaces**: `#080808` / `#121414` (For cards, panels, and sidebars).
* **Borders (Graphite)**: `#1F1F1F` (Subtle dark border) or `#1a1a1a` (High-contrast boundary border).
* **Accent (Amber)**: `#FFB800` (Custom branding amber) / `#f59e0b` (Tailwind amber-500).
* **Accent Hover/Active**: `#d97706` (amber-600) / `#b45309` (amber-700).

To implement this, we map these colors to tailwind config variables and shadcn/ui css custom variables, ensuring dark mode is active by default.

---

### 1.3 Border Radius System
The application adheres to **low-radius corners** (brutalist/bauhaus style):
* Default border radius: `0.125rem` (2px) or `0.25rem` (4px).
* We will define the shadcn CSS variable `--radius` as `0.25rem` (4px) and compute nested corners accordingly:
  - `lg`: `var(--radius)` (4px)
  - `md`: `calc(var(--radius) - 2px)` (2px)
  - `sm`: `calc(var(--radius) - 3px)` (1px)
  - `none` or standard buttons: `rounded-none` (0px) or `rounded-sm` (2px).

---

## 2. Recommended File Structure

Once initialized, the codebase structure for Milestone 1 should look as follows:
```
/Users/misbahkhursheed/Developer/boardroom/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Next/font loading, sidebar grid integration, global context
│   │   ├── page.tsx           # Home / Landing page mock implementation
│   │   └── globals.css        # Custom CSS variables mapping Obsidian/Amber values to tailwind classes
│   ├── components/
│   │   ├── ui/                # shadcn components (installed as needed in M3)
│   │   │   └── button.tsx     # Custom Button with low-radius corners and brutalist shadow styles
│   │   └── sidebar.tsx        # Responsive left-side navigation sidebar component
│   └── lib/
│       └── utils.ts           # Class merger utility (cn helper)
├── components.json            # shadcn UI config
├── package.json               # Next.js 15, React 19, and Tailwind CSS dependencies
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.ts         # Obsidian/Amber theme config, font-families, and border radius override
└── tsconfig.json              # TypeScript compiler options and path aliases
```

---

## 3. Configuration & Code Templates

The following templates represent exact configurations ready to be written during Milestone 1 implementation:

### 3.1 `package.json`
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
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.47.10",
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
    "@tailwindcss/forms": "^0.5.9",
    "@types/node": "^20.17.9",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.7.2"
  }
}
```

### 3.2 `tsconfig.json`
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

### 3.3 `tailwind.config.ts`
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
    extend: {
      colors: {
        // Obsidian background palette
        obsidian: {
          DEFAULT: "#000000",
          deep: "#050505",
          dark: "#0b0b0b",
          card: "#121212",
          container: "#080808",
          panel: "#121414",
        },
        // Graphite borders
        graphite: {
          DEFAULT: "#1f1f1f",
          dark: "#161616",
          light: "#2e2e2e",
        },
        // Amber accent palette
        amber: {
          50: "#fef3c7",
          100: "#fde68a",
          200: "#fcd34d",
          300: "#fbbf24",
          400: "#fbbf24",
          500: "#f59e0b", // standard amber
          600: "#d97706", // hover state amber
          700: "#b45309", // active state amber
          accent: "#ffb800", // custom branding amber from PROJECT.md
        },
        // Shadcn UI mapped theme colors using CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        // Low-radius corners: 2px (md), 4px (lg)
        lg: "var(--radius)", // 0.25rem = 4px
        md: "calc(var(--radius) - 2px)", // 2px
        sm: "calc(var(--radius) - 3px)", // 1px
      },
      fontFamily: {
        // Google Fonts integrated via next/font variables
        headline: ["var(--font-libre-caslon)", "serif"],
        display: ["var(--font-libre-caslon)", "serif"],
        body: ["var(--font-hanken-grotesk)", "sans-serif"],
        label: ["var(--font-hanken-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        // Brutalist / Neo-brutalist offset shadows
        brutal: "6px 6px 0px 0px var(--shadow-color, #1f1f1f)",
        "brutal-amber": "6px 6px 0px 0px #ffb800",
        "brutal-sm": "4px 4px 0px 0px var(--shadow-color, #1f1f1f)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};

export default config;
```

### 3.4 `components.json`
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

### 3.5 `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 38 92% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.25rem; /* 4px low-radius */
  }

  .dark {
    /* Base Obsidian background */
    --background: 0 0% 0%; /* #000000 */
    --foreground: 0 0% 98%; /* #f8f9fa */
    
    /* Container Surfaces */
    --card: 0 0% 5%; /* #0b0b0b */
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 5%;
    --popover-foreground: 0 0% 98%;
    
    /* Amber Accent Colors */
    --primary: 43 100% 50%; /* #ffb800 - Custom branding amber */
    --primary-foreground: 0 0% 0%; /* Black text on amber */
    
    --secondary: 0 0% 9%; /* #171717 */
    --secondary-foreground: 0 0% 98%;
    
    --muted: 0 0% 9%; /* #171717 */
    --muted-foreground: 0 0% 63.9%;
    
    --accent: 0 0% 9%;
    --accent-foreground: 0 0% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    
    /* Border graphite: #1f1f1f */
    --border: 0 0% 12%; /* #1f1f1f */
    --input: 0 0% 12%;
    --ring: 43 100% 50%; /* Amber highlight focus ring */
    --radius: 0.25rem; /* 4px low-radius */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-body;
  }
}

/* Custom Brutalist Styling Helpers */
.brutal-border {
  border: 3px solid hsl(var(--primary));
}

.graphite-border {
  border: 3px solid #1f1f1f;
}

.brutal-shadow {
  box-shadow: 6px 6px 0px 0px #1f1f1f;
}

.brutal-shadow-amber {
  box-shadow: 6px 6px 0px 0px hsl(var(--primary));
}

.brutal-hover:hover {
  transform: translate(2px, 2px);
  box-shadow: 4px 4px 0px 0px hsl(var(--primary));
  transition: all 0.15s ease-in-out;
}

.brutal-active:active {
  transform: translate(6px, 6px);
  box-shadow: 0px 0px 0px 0px hsl(var(--primary));
}
```

### 3.6 `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Libre_Caslon_Text, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const libreCaslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-hanken-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Boardroom - AI Executive Team",
  description: "Venture VC Executive Dashboard by Nimbus AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreCaslonText.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="flex min-h-screen bg-black text-foreground antialiased font-body overflow-hidden">
        {/* Left Sidebar navigation component */}
        <Sidebar />
        
        {/* Main scrollable content view */}
        <main className="w-full md:ml-64 h-screen overflow-y-auto bg-obsidian-deep">
          {children}
        </main>
      </body>
    </html>
  );
}
```

### 3.7 `src/components/sidebar.tsx`
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Database, 
  CalendarDays, 
  Users, 
  Gavel, 
  FilePieChart, 
  Settings, 
  HelpCircle,
  PlusSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Context", icon: Database },
  { href: "/meetings", label: "Meetings", icon: CalendarDays },
  { href: "/team", label: "Team", icon: Users },
  { href: "/decisions", label: "Decisions", icon: Gavel },
  { href: "/reports", label: "Reports", icon: FilePieChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r-3 border-graphite bg-obsidian-container text-foreground font-label text-base font-bold uppercase p-4 overflow-y-auto z-50">
      {/* Brand Header */}
      <div className="mb-8">
        <span className="font-headline text-2xl font-black bg-primary text-primary-foreground p-2 block brutal-shadow-amber border-3 border-black">
          BOARDROOM
        </span>
        <span className="text-xs tracking-widest mt-2 block opacity-70 font-mono">
          V.01-AI-NIMBUS
        </span>
      </div>

      {/* Navigation List */}
      <div className="flex flex-col gap-2 flex-grow mt-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 mb-2 transition-all border-3 font-label",
                isActive
                  ? "bg-primary text-primary-foreground border-black brutal-shadow-amber"
                  : "text-foreground hover:bg-obsidian-card hover:border-graphite border-transparent"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto pt-8 border-t-3 border-dashed border-graphite">
        <button className="w-full bg-primary text-primary-foreground font-headline font-black uppercase p-4 border-3 border-black brutal-shadow-amber brutal-hover brutal-active active:scale-95 transition-transform mb-6 text-lg tracking-tighter flex items-center justify-center gap-2">
          <PlusSquare className="h-5 w-5" />
          <span>New Decision</span>
        </button>
        
        <div className="flex flex-col gap-2 opacity-80 font-label">
          <Link 
            href="/settings" 
            className="flex items-center gap-3 text-foreground hover:text-primary transition-all text-sm py-1"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Link 
            href="/support" 
            className="flex items-center gap-3 text-foreground hover:text-primary transition-all text-sm py-1"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

### 3.8 `src/app/page.tsx`
```tsx
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-foreground relative flex flex-col justify-between selection:bg-primary selection:text-primary-foreground">
      {/* Decorative Corner Anchors */}
      <div className="fixed top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-graphite m-4 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-graphite m-4 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-graphite m-4 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-graphite m-4 pointer-events-none"></div>

      {/* Hero Header Area */}
      <header className="w-full border-b-3 border-graphite px-8 py-6 flex justify-between items-center bg-obsidian-container sticky top-0 z-40">
        <h1 className="font-headline text-3xl font-black uppercase tracking-tighter text-foreground">
          NIMBUS SYSTEM
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="font-label font-bold text-xs">AI EXECUTIVE BOARD</div>
            <div className="text-[10px] font-mono text-primary">STATUS: OPERATIONAL</div>
          </div>
          <div className="w-10 h-10 bg-primary text-primary-foreground border-3 border-black flex items-center justify-center font-headline font-black text-lg brutal-shadow-amber">
            N
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-4xl w-full border-3 border-graphite bg-obsidian-card p-8 md:p-12 brutal-shadow relative overflow-hidden">
          <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none">
            <Terminal className="h-64 w-64 text-primary" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest uppercase">
              <span className="w-2.5 h-2.5 bg-primary inline-block"></span>
              Secure Portal Ready
            </div>
            
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase leading-none tracking-tight text-foreground">
              THE ARTIFICIAL <br /> EXECUTIVE SUITE
            </h2>
            
            <p className="font-body text-base text-muted-foreground max-w-xl leading-relaxed">
              Nimbus streamlines board level startup operations with 10 autonomous, specialized executive AI models debate-reconciling venture strategy in real time.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/login"
                className="bg-primary text-primary-foreground font-headline font-bold text-lg uppercase px-8 py-4 border-3 border-black brutal-shadow-amber brutal-hover brutal-active flex items-center justify-center gap-2"
              >
                <span>Access Boardroom</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-3 border-graphite text-foreground font-headline font-bold text-lg uppercase px-8 py-4 brutal-shadow brutal-hover brutal-active hover:bg-obsidian-container hover:text-primary transition-colors flex items-center justify-center"
              >
                System Specs
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="border-t-3 border-graphite p-4 bg-obsidian-container text-center text-xs font-mono text-muted-foreground uppercase tracking-widest">
        SECURE CHANNEL // 256-BIT ENCRYPTION // NIMBUS VENTURES CORP
      </footer>
    </div>
  );
}
```

### 3.9 `src/lib/utils.ts`
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3.10 `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
