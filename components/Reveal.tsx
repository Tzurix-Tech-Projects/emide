"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/lib/use-gsap";
import { gsap, EASE, DURATION } from "@/lib/gsap";

const OFFSET = {
  up: { x: 0, y: 28 },
  left: { x: -36, y: 0 },
  right: { x: 36, y: 0 },
} as const;

/**
 * Entrada ao chegar na viewport, isolada em client leaf.
 *
 * O conteúdo nunca depende da animação para existir: com movimento reduzido
 * o hook não roda e o CSS mantém `[data-reveal]` visível.
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
  direction?: keyof typeof OFFSET;
}) {
  const ref = useGsap<HTMLDivElement>((root) => {
    gsap.from(root, {
      opacity: 0,
      ...OFFSET[direction],
      duration: DURATION.base,
      ease: EASE,
      delay,
      scrollTrigger: {
        trigger: root,
        start: "top 88%",
        once: true,
      },
    });
  }, [direction, delay]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
