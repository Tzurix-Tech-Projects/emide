import { supabase } from "./supabase";
import type { CartLine } from "./cart";

export type CustomerInfo = {
  name: string;
  phone: string;
  address?: string;
};

export async function createOrder(lines: CartLine[], customer: CustomerInfo) {
  const { data, error } = await supabase.rpc("create_order", {
    p_customer_name: customer.name,
    p_customer_phone: customer.phone,
    p_customer_address: customer.address ?? "",
    p_items: lines.map((line) => ({
      product_id: line.productId,
      product_name_snapshot: line.name,
      variant_snapshot: line.variant,
      price_snapshot: line.price,
      qty: line.qty,
    })),
  });

  if (error) throw error;
  return data as string;
}
