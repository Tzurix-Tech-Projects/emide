"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./products";
import { queryKeys } from "./query-keys";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  variant: string;
  price: number | null;
  qty: number;
};

type CartState = Record<string, number>; // slug -> qty

type Action =
  | { type: "add"; slug: string }
  | { type: "set"; slug: string; qty: number }
  | { type: "remove"; slug: string }
  | { type: "hydrate"; state: CartState }
  | { type: "clear" };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "add":
      return { ...state, [action.slug]: (state[action.slug] ?? 0) + 1 };
    case "set": {
      const next = { ...state };
      if (action.qty <= 0) delete next[action.slug];
      else next[action.slug] = action.qty;
      return next;
    }
    case "remove": {
      const next = { ...state };
      delete next[action.slug];
      return next;
    }
    case "hydrate":
      return action.state;
    case "clear":
      return {};
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "emide-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});
  const [isOpen, setIsOpen] = useState(false);
  const { data: products = [] } = useQuery({
    queryKey: queryKeys.products.all,
    queryFn: fetchProducts,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", state: JSON.parse(raw) });
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* noop */
    }
  }, [state]);

  const lines: CartLine[] = Object.entries(state).flatMap(([slug, qty]) => {
    const product = products.find((candidate) => candidate.slug === slug);
    if (!product) return [];
    return [
      {
        productId: product.id,
        slug,
        name: product.name,
        variant: product.variant,
        price: product.price,
        qty,
      },
    ];
  });

  const count = lines.reduce((total, line) => total + line.qty, 0);
  const subtotal = lines.reduce(
    (total, line) => total + (line.price ?? 0) * line.qty,
    0
  );

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    add: (slug) => {
      dispatch({ type: "add", slug });
      setIsOpen(true);
    },
    setQty: (slug, qty) => dispatch({ type: "set", slug, qty }),
    remove: (slug) => dispatch({ type: "remove", slug }),
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
