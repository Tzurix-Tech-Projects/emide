import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0D3120", // superfície institucional de apoio
          deep: "#092418",
        },
        charcoal: "#1D1D1B",
        gold: {
          DEFAULT: "#D5A72C", // detalhe sobre fundo escuro
          light: "#E6D14C",   // texto e bordas sobre fundo escuro
          dark: "#AB7311",    // linhas e detalhes sobre fundo claro
        },
        paper: "#FFFFFF",
        mist: "#F5F4F1",
        line: "#E2E0DA",
        ink: "#4A4A46",
      },
      fontFamily: {
        // Hermione (display) e Articulat CF Light (interface) entram por variável
        // quando os arquivos licenciados existirem. Ver app/fonts.ts.
        display: ["var(--font-hermione, Hermione)", "Georgia", "serif"],
        sans: [
          "var(--font-articulat, 'Articulat CF')",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
