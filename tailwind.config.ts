import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          950: "#050505",
          900: "#0a0a0a",
          800: "#111111",
          700: "#1a1a1a",
          600: "#262626",
        },
        bone: {
          DEFAULT: "#ece7df",
          100: "#f5f1e9",
          200: "#ece7df",
          300: "#d8d2c6",
          400: "#a8a298",
          500: "#7a756c",
        },
        accent: {
          DEFAULT: "#ff5b1f",
          muted: "#ff8a5f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "mega-1": ["clamp(4rem, 14vw, 18rem)", { lineHeight: "0.86", letterSpacing: "-0.04em" }],
        "mega-2": ["clamp(3rem, 10vw, 12rem)", { lineHeight: "0.9", letterSpacing: "-0.035em" }],
        "huge": ["clamp(2.25rem, 6vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "lede": ["clamp(1.125rem, 1.6vw, 1.5rem)", { lineHeight: "1.35", letterSpacing: "-0.005em" }],
        "micro": ["0.7rem", { lineHeight: "1.2", letterSpacing: "0.16em" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        grain: "grain 8s steps(10) infinite",
        "fade-in": "fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
