import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchProducts } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/supabase";
import { STORE_ENABLED } from "@/lib/site";
import { CatalogBrowser } from "./CatalogBrowser";
import { BrandText } from "@/components/BrandText";

const description =
  "Difusores, home sprays, linha lavabo e aromatização profissional EMIDÊ. Monte o carrinho e finalize o pedido pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Loja",
  description,
  alternates: { canonical: "/loja" },
  openGraph: {
    type: "website",
    url: "/loja",
    title: "Loja EMIDÊ",
    description,
  },
};

export default async function LojaPage() {
  // Loja ligada sem banco é erro de configuração. Ela some do site em vez de
  // quebrar o build do institucional inteiro.
  if (!STORE_ENABLED || !isSupabaseConfigured) notFound();

  const products = await fetchProducts();

  return (
    <div className="pt-40">
      <section className="pb-16">
        <div className="wrap">
          <span className="eyebrow">A coleção completa</span>
          <h1 className="my-5 text-4xl font-normal md:text-6xl">
            <BrandText>A loja EMIDÊ.</BrandText>
          </h1>
          <p className="max-w-[520px] text-lg text-ink">
            Filtre por categoria, monte o carrinho e finalize o pedido pelo
            WhatsApp.
          </p>
        </div>
      </section>
      <section className="pb-32">
        <div className="wrap">
          <Suspense fallback={<p className="py-24 text-ink">Carregando a coleção…</p>}>
            <CatalogBrowser products={products} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
