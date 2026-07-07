import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "3rem",
        "2xl": "6rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        bg: {
          obsidian: "rgb(var(--bg-obsidian) / <alpha-value>)",
          graphite: "rgb(var(--bg-graphite) / <alpha-value>)",
          charcoal: "rgb(var(--bg-charcoal) / <alpha-value>)",
        },
        surface: {
          1: "rgb(var(--surface-1) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        ink: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--text-tertiary) / <alpha-value>)",
        },
        accent: {
          electric: "rgb(var(--accent-electric) / <alpha-value>)",
          silver: "rgb(var(--accent-silver) / <alpha-value>)",
        },
        danger: "rgb(var(--danger) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["clamp(3rem, 6vw, 4.5rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        headline: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        title: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      borderColor: {
        hairline: "rgb(var(--border-hairline) / <alpha-value>)",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
      },
      boxShadow: {
        elevated: "0 1px 0 rgb(var(--border-hairline) / 0.06), 0 12px 32px rgba(17, 24, 39, 0.08)",
        glow: "0 0 0 1px rgb(var(--accent-electric) / 0.4), 0 0 32px rgb(var(--accent-electric) / 0.25)",
      },
      transitionDuration: {
        instant: "80ms",
        fast: "160ms",
        base: "240ms",
        slow: "400ms",
        cinematic: "800ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0.2, 1)",
        decelerate: "cubic-bezier(0, 0, 0.2, 1)",
        accelerate: "cubic-bezier(0.4, 0, 1, 1)",
      },
      backdropBlur: {
        glass: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
