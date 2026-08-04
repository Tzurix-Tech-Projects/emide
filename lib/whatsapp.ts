import type { CartLine } from "./cart";
import type { CustomerInfo } from "./orders";

/** DDI + DDD + número, só dígitos. Vem de NEXT_PUBLIC_WHATSAPP_NUMBER. */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const PLACEHOLDER_NUMBERS = new Set(["5599999999999", "5511998765432"]);

export const HAS_WHATSAPP_NUMBER =
  /^\d{12,13}$/.test(WHATSAPP_NUMBER) &&
  !PLACEHOLDER_NUMBERS.has(WHATSAPP_NUMBER);

if (!HAS_WHATSAPP_NUMBER && process.env.NODE_ENV !== "production") {
  console.warn(
    "NEXT_PUBLIC_WHATSAPP_NUMBER está ausente ou ainda usa um valor de exemplo."
  );
}

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const money = (value: number) => currency.format(value);

function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Pedido montado a partir do carrinho de produtos B2C. */
export function buildOrderUrl(lines: CartLine[], customer: CustomerInfo) {
  const items = lines.map(
    (line) =>
      `• ${line.qty}× ${line.name}${line.variant ? ` (${line.variant})` : ""}` +
      (line.price ? ` — ${money(line.price * line.qty)}` : "")
  );
  const subtotal = lines.reduce(
    (total, line) => total + (line.price ?? 0) * line.qty,
    0
  );
  const message =
    `Olá, EMIDÊ! Gostaria de fazer um pedido:\n\n${items.join("\n")}` +
    `\n\nSubtotal: ${money(subtotal)}` +
    `\n\nNome: ${customer.name}` +
    `\nTelefone: ${customer.phone}` +
    `\nEndereço de entrega: ${customer.address || "não informado"}`;
  return waUrl(message);
}

/** Proposta para um produto profissional específico. */
export function buildQuoteUrl(productName: string) {
  const message =
    `Olá, EMIDÊ! Tenho interesse no produto profissional: ${productName}. ` +
    `Gostaria de receber uma proposta.\n\nTipo de ambiente:\nMetragem aproximada:`;
  return waUrl(message);
}

/** Proposta B2B geral, a partir da seção Profissional. */
export function buildB2BUrl() {
  const message =
    `Olá, EMIDÊ! Gostaria de uma proposta de aromatização profissional para o meu espaço.` +
    `\n\nTipo de ambiente:\nMetragem aproximada:\nCidade:`;
  return waUrl(message);
}

export function buildContactUrl() {
  return waUrl("Olá, EMIDÊ! Gostaria de mais informações.");
}
