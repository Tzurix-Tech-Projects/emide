import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  categoryLabel,
  fetchProducts,
  fetchProductBySlug,
  type Product,
} from "@/lib/products";
import { money } from "@/lib/whatsapp";
import { SITE_NAME, SITE_URL, STORE_ENABLED } from "@/lib/site";
import { ProductActions } from "./ProductActions";
import { ProductPhoto } from "./ProductPhoto";

export async function generateStaticParams() {
  if (!STORE_ENABLED) return [];

  const products = await fetchProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  if (!STORE_ENABLED) return { title: "Página não disponível" };

  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) return { title: "Produto não encontrado" };

  const canonical = `/produto/${product.slug}`;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${product.name} — ${SITE_NAME}`,
      description: product.description,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: categoryLabel(product.category),
    brand: { "@type": "Brand", name: SITE_NAME },
    image: product.image ? [product.image] : undefined,
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/produto/${product.slug}`,
        }
      : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!STORE_ENABLED) notFound();

  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return notFound();

  return (
    <div className="pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product)),
        }}
      />
      <section className="pb-32">
        <div className="wrap">
          <nav aria-label="Você está em" className="mb-10 text-xs uppercase tracking-[0.12em] text-ink">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/loja" className="hover:text-gold-dark">
                  Loja
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/loja?categoria=${product.category}`}
                  className="hover:text-gold-dark"
                >
                  {categoryLabel(product.category)}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
            <ProductPhoto src={product.image} alt={product.name} />
            <div className="flex flex-col justify-center">
              <span className="eyebrow">{categoryLabel(product.category)}</span>
              <h1 className="my-4 text-4xl font-light md:text-5xl">
                {product.name}
              </h1>
              <p className="mb-6 max-w-[46ch] text-base text-ink">
                {product.description}
              </p>
              <dl className="mb-8 space-y-1 text-sm text-ink">
                {product.sizes && (
                  <div className="flex gap-2">
                    <dt>Tamanhos:</dt>
                    <dd>{product.sizes.join(" · ")}</dd>
                  </div>
                )}
                {product.variant && (
                  <div className="flex gap-2">
                    <dt>Variação:</dt>
                    <dd>{product.variant}</dd>
                  </div>
                )}
              </dl>
              <p className="mb-9 font-display text-3xl">
                {product.price ? money(product.price) : "Sob consulta"}
              </p>
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
