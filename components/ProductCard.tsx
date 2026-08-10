"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoryLabel, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { buildQuoteUrl, money } from "@/lib/whatsapp";
import { useGsap } from "@/lib/use-gsap";
import { gsap, EASE, DURATION } from "@/lib/gsap";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { add } = useCart();
  const [imageFailed, setImageFailed] = useState(false);

  // O atraso segue a coluna, não a posição na lista: a linha inteira entra
  // da esquerda para a direita em vez de cascatear a grade toda.
  const cardRef = useGsap<HTMLElement>((root) => {
    gsap.from(root, {
      opacity: 0,
      y: 28,
      duration: DURATION.base,
      ease: EASE,
      delay: (index % 3) * 0.08,
      scrollTrigger: { trigger: root, start: "top 90%", once: true },
    });
  }, [index]);

  return (
    <article
      ref={cardRef}
      data-reveal
      className="group flex flex-col border-b border-r border-line bg-paper transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(29,29,27,0.18)]"
    >
      <div className="photo-fallback relative aspect-square overflow-hidden">
        {product.mode === "quote" && (
          <span className="absolute left-4 top-4 z-10 rounded-sm bg-forest/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-paper">
            Sob consulta
          </span>
        )}
        {/* Sem foto cadastrada, o fundo neutro fica no lugar da imagem. */}
        {!imageFailed && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
            onError={() => setImageFailed(true)}
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-8">
        <span className="mb-2 text-[11px] uppercase tracking-[0.2em] text-forest">
          {categoryLabel(product.category)}
        </span>
        <h3 className="mb-1.5 text-xl">
          <Link
            href={`/produto/${product.slug}`}
            className="transition-colors hover:text-forest"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mb-5 flex-1 text-sm text-ink">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="font-sans text-lg">
            {product.price ? (
              money(product.price)
            ) : (
              <span className="text-sm text-ink">Sob consulta</span>
            )}
          </span>
          {product.mode === "buy" ? (
            <button
              onClick={() => add(product.slug)}
              aria-label={`Adicionar ${product.name} ao carrinho`}
              className="border-b border-forest pb-0.5 text-xs uppercase tracking-[0.12em] transition-colors hover:border-charcoal hover:text-charcoal"
            >
              Adicionar
            </button>
          ) : (
            <a
              href={buildQuoteUrl(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Solicitar proposta para ${product.name} pelo WhatsApp`}
              className="border-b border-forest pb-0.5 text-xs uppercase tracking-[0.12em] text-forest"
            >
              Solicitar proposta
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
