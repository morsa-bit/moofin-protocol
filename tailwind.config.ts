import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moofin: {
          teal: "#05DFB3",
          darkTeal: "#00B894",
          lightTeal: "#E6FAF5",
          black: "#0B0F19",
          slate: "#0F172A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
