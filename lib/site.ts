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

// TODO(editorial): perfil e e-mail vieram do material da marca e ainda não
// foram confirmados com quem responde por eles. O e-mail usa o domínio .com.br
// enquanto SITE_URL usa .com — conferir se os dois estão corretos.
export const INSTAGRAM_URL = "https://www.instagram.com/emide.oficial/";

export const CONTACT_EMAIL = "contato@emideinteligenciaolfativa.com.br";

export const CONTACT_PHONES = [
  { display: "(13) 99150-4516", international: "5513991504516" },
  { display: "(13) 99167-5615", international: "5513991675615" },
] as const;

// Publicado completo, com sala, por decisão da marca: aparece no rodapé, na
// seção de contato e no PostalAddress do schema.org. Tirar a sala é editar só
// esta linha.
export const CONTACT_ADDRESS = {
  street: "Av. Bernardino de Campos, 18 — Sala 408",
  district: "Vila Belmiro",
  city: "Santos",
  state: "SP",
  postalCountry: "BR",
} as const;

export const siteDescription =
  "Criação de identidades olfativas, fragrâncias exclusivas, aromatização profissional e produtos personalizados para empresas, marcas e residências.";
