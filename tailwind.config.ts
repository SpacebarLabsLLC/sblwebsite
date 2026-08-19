// sblwebsite/tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--sb-brand)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        dim: "var(--text-dim)",
        "dim-safe": "var(--text-dim-safe)",
        divider: "var(--divider)",
        ledger: "var(--ledger-bg)",
        "ledger-fg": "var(--ledger-fg)",
        "ledger-dim": "var(--ledger-dim)",
        "ledger-rule": "var(--ledger-rule)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display)",
        mono: "var(--font-mono)",
      },
    },
  },
  plugins: [],
} satisfies Config;
