export const queryKeys = {
  session: ["session"] as const,
  products: {
    all: ["products"] as const,
    detail: (slug: string) => ["products", slug] as const,
  },
  admin: {
    products: ["admin", "products"] as const,
    orders: ["admin", "orders"] as const,
  },
};
