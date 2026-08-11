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
        // Hermione entra só pelo componente DisplayAccent, nunca por padrão.
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
      /**
       * Escala fluida: o tamanho acompanha a viewport entre 375px e 1440px,
       * em vez de saltar em cada breakpoint. O segundo valor é o line-height.
       */
      fontSize: {
        // Quanto maior o corpo, menor o tracking: caixa alta grande com o
        // mesmo espaçamento de um texto pequeno parece frouxa.
        // Caixa alta em português precisa de entrelinha maior que o usual:
        // Ê, Ã e Ç sobem acima da altura de caixa e seriam cortados.
        "display-xl": [
          "clamp(2.5rem, 1.75rem + 3.2vw, 4.75rem)",
          { lineHeight: "1.12", letterSpacing: "0.005em" },
        ],
        "display-lg": [
          "clamp(2rem, 1.5rem + 2.2vw, 3.5rem)",
          { lineHeight: "1.14", letterSpacing: "0.012em" },
        ],
        "display-md": [
          "clamp(1.75rem, 1.35rem + 1.7vw, 2.75rem)",
          { lineHeight: "1.18", letterSpacing: "0.018em" },
        ],
        "display-sm": [
          "clamp(1.375rem, 1.15rem + 1vw, 2rem)",
          { lineHeight: "1.22", letterSpacing: "0.022em" },
        ],
        lead: [
          "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)",
          { lineHeight: "1.65" },
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
