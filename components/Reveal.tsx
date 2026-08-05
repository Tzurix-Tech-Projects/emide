"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

/**
 * Entrada em fade-up ao chegar na viewport, isolada em client leaf.
 * Com prefers-reduced-motion o conteúdo já nasce visível: a animação é
 * enfeite, nunca a condição para o texto existir na tela.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const prefersReducedMotion = useHydratedReducedMotion();
  const offset = {
    up: { x: 0, y: 28 },
    left: { x: -32, y: 0 },
    right: { x: 32, y: 0 },
  }[direction];

  return (
    <motion.div
      data-reveal
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, ...offset }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.48, ease: [0.16, 1, 0.3, 1], delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
