"use client";

import { useGsap } from "@/lib/use-gsap";
import { gsap } from "@/lib/gsap";

/** Barra fina de progresso de leitura no topo. Puramente decorativa. */
export function ScrollProgress() {
  const ref = useGsap<HTMLDivElement>((root) => {
    gsap.fromTo(
      root,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      }
    );
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light"
    />
  );
}
