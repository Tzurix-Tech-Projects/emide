export type ProductImageSet = {
  cover: string;
  gallery: string[];
};

/**
 * Curadoria local da Fase 1. Mantém a loja sem imagens quebradas enquanto a
 * atualização dos caminhos no Supabase aguarda uma sessão administrativa.
 */
export const PRODUCT_IMAGES: Record<string, ProductImageSet> = {
  "difusor-cube-200": {
    cover: "/produtos/difusor-cube-200/cover.webp",
    gallery: ["/produtos/difusor-cube-200/gallery-1.webp"],
  },
  "difusor-oval-300": {
    cover: "/produtos/difusor-oval-300/cover.webp",
    gallery: ["/produtos/difusor-oval-300/gallery-1.webp"],
  },
  "difusor-signature-300": {
    cover: "/produtos/difusor-signature-300/cover.webp",
    gallery: ["/produtos/difusor-signature-300/gallery-1.webp"],
  },
  "sabonete-perolado-250": {
    cover: "/produtos/sabonete-perolado-250/cover.webp",
    gallery: ["/produtos/sabonete-perolado-250/gallery-1.webp"],
  },
  "maquina-aroma-pro": {
    cover: "/produtos/maquina-aroma-pro/cover.webp",
    gallery: ["/produtos/maquina-aroma-pro/gallery-1.webp"],
  },
  "maquina-aroma-wall": {
    cover: "/produtos/maquina-aroma-wall/cover.webp",
    gallery: ["/produtos/maquina-aroma-wall/gallery-1.webp"],
  },
  "agua-de-lencois-500": {
    cover: "/produtos/agua-de-lencois-500/cover.webp",
    gallery: ["/produtos/agua-de-lencois-500/gallery-1.webp"],
  },
  "home-spray-signature": {
    cover: "/produtos/home-spray-signature/cover.webp",
    gallery: ["/produtos/home-spray-signature/gallery-1.webp"],
  },
};
