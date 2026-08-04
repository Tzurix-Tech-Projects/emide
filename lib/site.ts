export const SITE_NAME = "EMIDÊ";

/**
 * O lançamento inicial é institucional. A loja só volta a ficar pública
 * quando catálogo, checkout, imagens, segurança e validações do backlog
 * estiverem concluídos.
 */
export const STORE_ENABLED =
  process.env.NEXT_PUBLIC_STORE_ENABLED === "true";

/** Domínio público, usado em canonical, Open Graph e sitemap. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://emideinteligenciaolfativa.com";

export const INSTAGRAM_URL = "https://www.instagram.com/emide.oficial/";

export const CONTACT_EMAIL = "contato@emide.com.br";

export const siteDescription =
  "Difusores, home sprays e linha lavabo da EMIDÊ, além de aromatização profissional por nebulização para hotéis, clínicas e escritórios. Pedido pelo WhatsApp.";
