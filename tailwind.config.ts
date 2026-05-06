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
        // Warm off-white paper background
        paper: {
          DEFAULT: "#f1ece4",
          50: "#faf6ef",
          100: "#f4efe7",
          200: "#ebe5da",
          300: "#ddd5c6",
        },
        // Near-black ink for text
        ink: {
          DEFAULT: "#0e0d0b",
          900: "#0e0d0b",
          800: "#1a1814",
          700: "#3a3631",
          600: "#6a655c",
          500: "#9a948a",
          400: "#c2bdb3",
        },
        accent: {
          DEFAULT: "#d44617",
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
        "lede": ["clamp(1.05rem, 1.4vw, 1.35rem)", { lineHeight: "1.4", letterSpacing: "-0.005em" }],
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
        marquee: "marquee 38s linear infinite",
        "fade-in": "fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
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
