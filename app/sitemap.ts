import type { MetadataRoute } from "next";
import { fetchProducts, CATEGORIES } from "@/lib/products";
import { SITE_URL, STORE_ENABLED } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!STORE_ENABLED) {
    return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
  }

  const products = await fetchProducts();

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/loja`, changeFrequency: "weekly", priority: 0.9 },
    ...CATEGORIES.map((category) => ({
      url: `${SITE_URL}/loja?categoria=${category.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/produto/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
