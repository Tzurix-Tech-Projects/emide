"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminOrders,
  updateOrderStatus,
  ORDER_STATUSES,
  type OrderStatus,
} from "@/lib/admin";
import { money } from "@/lib/whatsapp";
import { queryKeys } from "@/lib/query-keys";

const STATUS_STYLES: Record<OrderStatus, string> = {
  novo: "bg-gold/15 text-gold-dark",
  confirmado: "bg-forest/10 text-forest",
  enviado: "bg-forest text-paper",
  cancelado: "bg-charcoal/10 text-charcoal",
};

const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();

  const {
    data: orders,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.admin.orders,
    queryFn: fetchAdminOrders,
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: (vars: { id: string; status: OrderStatus }) =>
      updateOrderStatus(vars.id, vars.status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.orders }),
  });

  if (isPending) return <p className="py-16 text-ink">Carregando pedidos…</p>;

  if (isError) {
    return (
      <div className="py-16">
        <p className="mb-4 text-ink">Não foi possível carregar os pedidos.</p>
        <button onClick={() => refetch()} className="btn btn-outline">
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-light">Pedidos</h1>

      {orders.length === 0 ? (
        <p className="py-16 text-center text-ink">
          Nenhum pedido recebido ainda.
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border border-line bg-paper p-6">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-lg">
                      {order.customerName}
                    </h2>
                    <span
                      className={`rounded-sm px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-ink">
                    {order.customerPhone}
                    {order.customerAddress ? ` · ${order.customerAddress}` : ""}
                  </p>
                  <p className="text-xs text-ink">
                    {DATE_FORMAT.format(new Date(order.createdAt))}
                  </p>
                </div>
                <label className="block">
                  <span className="field-label">Status</span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      changeStatus({
                        id: order.id,
                        status: e.target.value as OrderStatus,
                      })
                    }
                    className="field w-auto py-1.5"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <ul className="divide-y divide-mist border-t border-mist">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-2.5 text-sm"
                  >
                    <span>
                      {item.qty}× {item.productNameSnapshot}
                      {item.variantSnapshot ? ` (${item.variantSnapshot})` : ""}
                    </span>
                    <span className="text-ink">
                      {item.priceSnapshot !== null
                        ? money(item.priceSnapshot * item.qty)
                        : "Sob consulta"}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-between border-t border-line pt-3 text-sm">
                <span className="uppercase tracking-[0.12em] text-ink">
                  Subtotal
                </span>
                <span className="font-display text-base">
                  {money(order.subtotal)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
