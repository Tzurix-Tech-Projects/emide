import localFont from "next/font/local";

/**
 * O arquivo Hermione entregue identifica-se como HERMIONE-DEMO e cobre apenas
 * A-Z maiúsculo, sem acentuação. Por isso ele não é fonte de título: entra
 * ponto a ponto pelo componente DisplayAccent. Sem preload — baixar em toda
 * página um arquivo que só aparece em trechos marcados custa mais do que rende.
 */
export const hermione = localFont({
  src: "../public/fonts/Hermione.woff2",
  variable: "--font-hermione",
  display: "swap",
  weight: "400",
  style: "normal",
  preload: false,
  adjustFontFallback: false,
});

/** Articulat CF Light licenciada: corpo, navegação e controles. */
export const articulat = localFont({
  src: "../public/fonts/Articulat-CF-Light.woff2",
  variable: "--font-articulat",
  display: "swap",
  weight: "300",
  style: "normal",
  preload: true,
});
