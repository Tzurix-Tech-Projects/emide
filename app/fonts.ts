import localFont from "next/font/local";

/**
 * Arquivo Hermione recebido. A copia atual identifica-se internamente como
 * HERMIONE-DEMO e nao possui cobertura suficiente para textos em portugues.
 * Seu uso fica restrito a titulos em caixa alta; a Articulat cobre os
 * caracteres acentuados que nao existem no arquivo.
 */
export const hermione = localFont({
  src: "../public/fonts/Hermione.woff2",
  variable: "--font-hermione",
  display: "swap",
  weight: "400",
  style: "normal",
  preload: true,
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
