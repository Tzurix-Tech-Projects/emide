"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, type Category, type Product } from "@/lib/products";

const ALL = "todos";
type Filter = typeof ALL | Category;

const isCategory = (value: string | null): value is Category =>
  CATEGORIES.some((category) => category.id === value);

/**
 * Grade da loja com o filtro refletido na URL, para que
 * "/loja?categoria=difusores" possa ser compartilhado e linkado.
 */
export function CatalogBrowser({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("categoria");
  const filter: Filter = isCategory(requested) ? requested : ALL;

  const visible =
    filter === ALL
      ? products
      : products.filter((product) => product.category === filter);

  const selectFilter = (next: Filter) => {
    const query = next === ALL ? "" : `?categoria=${next}`;
    router.replace(`/loja${query}`, { scroll: false });
  };

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-3">
        <FilterPill active={filter === ALL} onClick={() => selectFilter(ALL)}>
          Todos
        </FilterPill>
        {CATEGORIES.map((category) => (
          <FilterPill
            key={category.id}
            active={filter === category.id}
            onClick={() => selectFilter(category.id)}
          >
            {category.label}
          </FilterPill>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="border-t border-line py-24 text-ink">
          Nenhum produto nesta categoria por enquanto.
        </p>
      ) : (
        <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-sm border px-5 py-2 text-xs uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.98] ${
        active
          ? "border-forest bg-forest text-paper"
          : "border-line text-ink hover:border-forest hover:text-forest"
      }`}
    >
      {children}
    </button>
  );
}
