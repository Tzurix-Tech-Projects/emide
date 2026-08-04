import { supabase } from "./supabase";
import type { Category } from "./products";

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number | null;
  variant: string;
  sizes: string[];
  description: string;
  mode: "buy" | "quote";
  imageUrl: string;
  active: boolean;
};

export type ProductInput = Omit<AdminProduct, "id"> & { id?: string };

export type OrderStatus = "novo" | "confirmado" | "enviado" | "cancelado";

export const ORDER_STATUSES: OrderStatus[] = [
  "novo",
  "confirmado",
  "enviado",
  "cancelado",
];

export type AdminOrderItem = {
  id: string;
  productNameSnapshot: string;
  variantSnapshot: string;
  priceSnapshot: number | null;
  qty: number;
};

export type AdminOrder = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string | null;
  status: OrderStatus;
  subtotal: number;
  createdAt: string;
  items: AdminOrderItem[];
};

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
  active: boolean;
};

type OrderRow = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  status: OrderStatus;
  subtotal: number;
  created_at: string;
  order_items: {
    id: string;
    product_name_snapshot: string;
    variant_snapshot: string;
    price_snapshot: number | null;
    qty: number;
  }[];
};

const PRODUCT_COLUMNS =
  "id, slug, name, category, price, variant, sizes, description, mode, image_url, active";

function mapAdminProduct(row: ProductRow): AdminProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    variant: row.variant,
    sizes: row.sizes,
    description: row.description,
    mode: row.mode,
    imageUrl: row.image_url,
    active: row.active,
  };
}

export async function fetchAdminProducts(): Promise<AdminProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("category")
    .order("name");

  if (error) throw error;
  return (data as ProductRow[]).map(mapAdminProduct);
}

export async function saveProduct(input: ProductInput): Promise<void> {
  const row = {
    slug: input.slug,
    name: input.name,
    category: input.category,
    price: input.price,
    variant: input.variant,
    sizes: input.sizes,
    description: input.description,
    mode: input.mode,
    image_url: input.imageUrl,
    active: input.active,
    updated_at: new Date().toISOString(),
  };

  const query = input.id
    ? supabase.from("products").update(row).eq("id", input.id)
    : supabase.from("products").insert(row);

  const { error } = await query;
  if (error) throw error;
}

export async function setProductActive(id: string, active: boolean): Promise<void> {
  const { error } = await supabase
    .from("products")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}

export async function fetchAdminOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, customer_name, customer_phone, customer_address, status, subtotal, created_at, order_items(id, product_name_snapshot, variant_snapshot, price_snapshot, qty)"
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as OrderRow[]).map((row) => ({
    id: row.id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerAddress: row.customer_address,
    status: row.status,
    subtotal: Number(row.subtotal),
    createdAt: row.created_at,
    items: row.order_items.map((item) => ({
      id: item.id,
      productNameSnapshot: item.product_name_snapshot,
      variantSnapshot: item.variant_snapshot,
      priceSnapshot: item.price_snapshot,
      qty: item.qty,
    })),
  }));
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}

const IMAGE_BUCKET = "produtos";

export async function uploadProductImage(file: File, slug: string): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${slug}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
