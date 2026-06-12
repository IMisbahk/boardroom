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
