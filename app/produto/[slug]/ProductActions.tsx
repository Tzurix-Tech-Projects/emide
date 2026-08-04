"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { buildQuoteUrl } from "@/lib/whatsapp";

export function ProductActions({ product }: { product: Product }) {
  const { add } = useCart();

  if (product.mode === "quote") {
    return (
      <a
        href={buildQuoteUrl(product.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary self-start"
      >
        <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
        Solicitar proposta
      </a>
    );
  }

  return (
    <button
      onClick={() => add(product.slug)}
      className="btn btn-primary self-start"
    >
      Adicionar ao carrinho
    </button>
  );
}
