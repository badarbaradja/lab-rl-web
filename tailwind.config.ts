import type { Config } from "tailwindcss";

const config: Config = {
  // PERBAIKAN DI SINI: Gunakan string "class", jangan pakai kurung siku ["class"]
  darkMode: "class", 
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Lab RL (Navy & Red)
        rl: {
          navy: "#001F5F",
          red: "#D31145",
          light: "#F8FAFC",
          dark: "#0F172A",
        },
      },
    },
  },
  plugins: [],
};
export default config;