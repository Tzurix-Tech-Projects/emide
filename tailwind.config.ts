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
        line: "#D7D4CC",
        ink: "#3F3F3B",
      },
      fontFamily: {
        // Hermione só é aplicada a palavras sem acento por BrandText.
        display: [
          "var(--font-hermione)",
          "var(--font-articulat)",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        sans: [
          "var(--font-articulat)",
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
