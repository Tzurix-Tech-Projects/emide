"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { X, Minus, Plus, WhatsappLogo } from "@phosphor-icons/react";
import { useCart, type CartLine } from "@/lib/cart";
import { buildOrderUrl, money } from "@/lib/whatsapp";
import { createOrder, type CustomerInfo } from "@/lib/orders";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQty, remove } = useCart();
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const { mutate: registerOrder, isError: orderNotRegistered } = useMutation({
    mutationFn: (vars: { lines: CartLine[]; customer: CustomerInfo }) =>
      createOrder(vars.lines, vars.customer),
  });

  const canCheckout =
    lines.length > 0 && customerName.trim() !== "" && customerPhone.trim() !== "";

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close]);

  const handleCheckout = () => {
    if (!canCheckout) return;
    const customer = {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      address: customerAddress.trim(),
    };
    // O registro do pedido não bloqueia o checkout: se o banco falhar,
    // o cliente ainda é levado ao WhatsApp.
    registerOrder({ lines, customer });
    window.open(buildOrderUrl(lines, customer), "_blank", "noopener,noreferrer");
  };

  const overlayMotion = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const panelMotion = prefersReducedMotion
    ? {}
    : {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring" as const, stiffness: 100, damping: 20 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            {...overlayMotion}
            onClick={close}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-forest/40 backdrop-blur-[2px]"
          />
          <motion.aside
            {...panelMotion}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="fixed right-0 top-0 z-[70] flex h-full w-[440px] max-w-[90vw] flex-col bg-paper"
          >
            <div className="flex items-center justify-between border-b border-line px-8 py-8">
              <h2 id={titleId} className="text-xl">
                Seu carrinho
              </h2>
              <button onClick={close} aria-label="Fechar carrinho">
                <X size={22} weight="light" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center text-ink">
                  <span className="mb-2 font-display text-xl text-forest">
                    Seu carrinho está vazio
                  </span>
                  <span className="text-sm">
                    Adicione uma fragrância para começar.
                  </span>
                </div>
              ) : (
                <ul>
                  {lines.map((line) => (
                    <li
                      key={line.slug}
                      className="flex gap-4 border-b border-mist py-6"
                    >
                      <div
                        className="photo-fallback h-16 w-16 flex-shrink-0 rounded-sm"
                        aria-hidden="true"
                      />
                      <div className="flex-1">
                        <h3 className="font-display text-base">{line.name}</h3>
                        <p className="text-xs text-ink">{line.variant}</p>
                        <p className="mt-1.5 text-sm">
                          {money((line.price ?? 0) * line.qty)}
                        </p>
                        <div className="mt-2.5 inline-flex items-center gap-3.5 rounded-sm border border-line px-2.5 py-1">
                          <button
                            onClick={() => setQty(line.slug, line.qty - 1)}
                            aria-label={`Diminuir quantidade de ${line.name}`}
                          >
                            <Minus size={14} aria-hidden="true" />
                          </button>
                          <span className="min-w-4 text-center text-sm">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => setQty(line.slug, line.qty + 1)}
                            aria-label={`Aumentar quantidade de ${line.name}`}
                          >
                            <Plus size={14} aria-hidden="true" />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(line.slug)}
                          aria-label={`Remover ${line.name} do carrinho`}
                          className="mt-2 block text-[11px] uppercase tracking-[0.1em] text-ink hover:text-gold-dark"
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-line px-8 py-7">
              <div className="mb-4 flex justify-between text-base">
                <span>Subtotal</span>
                <span className="font-display text-xl">{money(subtotal)}</span>
              </div>

              {lines.length > 0 && (
                <div className="mb-5 space-y-3">
                  <label className="block">
                    <span className="field-label">Nome</span>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      autoComplete="name"
                      required
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Telefone com DDD</span>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">
                      Endereço de entrega (opcional)
                    </span>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(event) => setCustomerAddress(event.target.value)}
                      autoComplete="street-address"
                      className="field"
                    />
                  </label>
                </div>
              )}

              {orderNotRegistered && (
                <p role="status" className="mb-4 text-xs text-gold-dark">
                  Não conseguimos registrar o pedido aqui, mas ele continua válido
                  pelo WhatsApp.
                </p>
              )}

              <p className="mb-5 text-xs text-ink">
                Frete e formas de pagamento são combinados no WhatsApp.
              </p>
              <button
                onClick={handleCheckout}
                disabled={!canCheckout}
                className="btn btn-primary w-full justify-center disabled:cursor-not-allowed disabled:bg-ink/40 disabled:hover:bg-ink/40"
              >
                <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
                Finalizar pelo WhatsApp
              </button>
              {!canCheckout && lines.length > 0 && (
                <p className="mt-2 text-center text-xs text-ink">
                  Preencha nome e telefone para finalizar.
                </p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
