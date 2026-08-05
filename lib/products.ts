import { supabase } from "./supabase";
import { PRODUCT_IMAGES } from "./product-images";

export type Category = "difusores" | "sprays" | "lavabo" | "profissional";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number | null; // null = sob consulta
  variant: string;
  sizes?: string[];
  description: string;
  mode: "buy" | "quote"; // quote = não entra no carrinho, abre proposta
  image: string;
  images: string[];
};

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: "difusores",
    label: "Difusores",
    blurb: "Varetas em fragrância contínua. Perfumam sem depender de energia elétrica.",
  },
  {
    id: "sprays",
    label: "Sprays",
    blurb: "Névoas para ambientes e tecidos, de uso pontual.",
  },
  {
    id: "lavabo",
    label: "Lavabo",
    blurb: "Sabonete líquido e acessórios para a bancada.",
  },
  {
    id: "profissional",
    label: "Profissional",
    blurb: "Nebulização a frio para grandes espaços, sob consultoria.",
  },
];

const CATEGORY_LABELS: Record<Category, string> = CATEGORIES.reduce(
  (labels, category) => ({ ...labels, [category.id]: category.label }),
  {} as Record<Category, string>
);

/** Rótulo de exibição da categoria. A interface nunca mostra o id cru. */
export const categoryLabel = (category: Category) => CATEGORY_LABELS[category];

const PRODUCT_COLUMNS =
  "id, slug, name, category, price, variant, sizes, description, mode, image_url";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number | null;
  variant: string;
  sizes: string[];
  description: string;
  mode: "buy" | "quote";
  image_url: string;
};

function mapProduct(row: ProductRow): Product {
  const curated = PRODUCT_IMAGES[row.slug];
  const image = curated?.cover ?? row.image_url;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    variant: row.variant,
    sizes: row.sizes.length > 0 ? row.sizes : undefined,
    description: row.description,
    mode: row.mode,
    image,
    images: curated ? [curated.cover, ...curated.gallery] : [image],
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("active", true)
    .order("category")
    .order("name");

  if (error) throw error;
  return (data as ProductRow[]).map(mapProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : null;
}
