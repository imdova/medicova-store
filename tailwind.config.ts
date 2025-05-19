import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--main-color)",
        primary: "var(--primary)",
        background: "var(--background)",
        "primary-100": "var(--primary-100)",
        "primary-900": "var(--primary-900)",
        "primary-foreground": "var(--primary-foreground)",
        "primary-transparent": "var(--primary-transparent)",
        "light-primary": "var(--light-primary)",
        "light-primary-transparent": "var(--light-primary-transparent)",
        secondary: "var(--text-secondary)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-fast": "spin 500ms linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
