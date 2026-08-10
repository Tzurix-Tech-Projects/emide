"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, registerGsap } from "./gsap";

/**
 * Roda uma animação GSAP com escopo no elemento e limpeza automática.
 *
 * O callback só é chamado quando o usuário aceita movimento: o `matchMedia`
 * do GSAP cuida disso e reverte tudo se a preferência mudar durante a sessão.
 * Nada aqui pode ser condição para o conteúdo aparecer — o CSS já garante
 * `[data-reveal]` visível quando o movimento está reduzido.
 */
export function useGsap<T extends HTMLElement>(
  setup: (root: T) => void,
  dependencies: unknown[] = []
): RefObject<T | null> {
  const rootRef = useRef<T>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => setupRef.current(root), root);
      return () => context.revert();
    });

    return () => media.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return rootRef;
}
