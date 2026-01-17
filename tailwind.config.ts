import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark theme: black, multiple greys, white
        dark: {
          bg: "#000000",
          surface: "#0a0a0a",
          "surface-2": "#111111",
          card: "#141414",
          "card-2": "#1a1a1a",
          border: "#1f1f1f",
          "border-2": "#2a2a2a",
          text: "#ffffff",
          "text-muted": "#a0a0a0",
          "text-muted-2": "#888888",
          "text-muted-3": "#666666",
          accent: "#ffffff",
        },
        // Light theme: lighter grey aesthetic
        light: {
          bg: "#e8e8e8",
          surface: "#f0f0f0",
          "surface-2": "#f5f5f5",
          card: "#f8f8f8",
          "card-2": "#fafafa",
          border: "#d5d5d5",
          "border-2": "#cccccc",
          text: "#1a1a1a",
          "text-muted": "#666666",
          "text-muted-2": "#777777",
          "text-muted-3": "#888888",
          accent: "#000000",
        },
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        "gradient-light": "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
        "glass-dark": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "glass-light": "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
