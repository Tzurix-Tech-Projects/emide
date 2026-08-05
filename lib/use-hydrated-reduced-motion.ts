"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onStoreChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

/**
 * Retorna false no servidor e durante a hidratação inicial. Depois que o
 * React assume a página, acompanha a preferência real do navegador.
 * Assim SSR e cliente produzem exatamente a mesma primeira árvore.
 */
export const useHydratedReducedMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => false);
