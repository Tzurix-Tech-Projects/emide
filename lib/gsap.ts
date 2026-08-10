"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/**
 * Registra os plugins uma única vez. GSAP só é tocado no cliente: importar
 * ScrollTrigger no servidor quebra o build por acesso a window.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

/** Curva única do site. Toda entrada usa a mesma para o movimento ter uma voz só. */
export const EASE = "power3.out";

/** Durações em segundos, alinhadas ao DESIGN.md (150–480ms). */
export const DURATION = {
  micro: 0.24,
  base: 0.48,
  slow: 0.72,
} as const;

export { gsap, ScrollTrigger, SplitText };
