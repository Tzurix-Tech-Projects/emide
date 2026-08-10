"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { B2BQuoteButton } from "@/components/WhatsAppActions";
import { useGsap } from "@/lib/use-gsap";
import { gsap, EASE, SplitText } from "@/lib/gsap";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sem `autoplay` no markup: o play só acontece se o usuário aceitar
  // movimento. Com movimento reduzido o pôster fica parado no lugar.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const allowsMotion = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    if (!allowsMotion) return;

    // O navegador pode recusar o play; o pôster cobre esse caso.
    video.play().catch(() => undefined);
  }, []);

  const heroRef = useGsap<HTMLElement>((root) => {
    const heading = root.querySelector<HTMLElement>("[data-hero-heading]");

    const split = heading
      ? new SplitText(heading, {
          type: "lines",
          linesClass: "hero-line",
          mask: "lines",
        })
      : null;

    const intro = gsap.timeline({
      defaults: { ease: EASE, duration: 0.9 },
      delay: 0.15,
    });

    if (split) {
      intro.from(split.lines, { yPercent: 115, stagger: 0.1 }, 0);
    }

    intro
      .from("[data-hero-eyebrow]", { opacity: 0, y: 14, duration: 0.6 }, 0)
      .from("[data-hero-body] > *", { opacity: 0, y: 18, stagger: 0.09 }, 0.4)
      .from("[data-hero-aside]", { opacity: 0, duration: 0.8 }, 0.8);

    // O fundo sobe menos que a página, dando profundidade.
    gsap.to("[data-hero-stage]", {
      yPercent: 10,
      scale: 1.06,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // O header é fixo: a margem superior tira o hero de baixo dele, em vez de
  // deixar o vídeo passar por trás da navegação.
  return (
    <section
      ref={heroRef}
      id="top"
      className="on-dark relative mt-[5.75rem] flex min-h-[62dvh] items-center overflow-hidden bg-charcoal md:mt-[7rem] md:min-h-[72dvh]"
    >
      <div data-hero-stage className="absolute inset-[-3%]" aria-hidden="true">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          className="h-full w-full object-cover object-center"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Duas camadas: uma escurece o conjunto, a outra abre contraste à
          esquerda, onde fica o texto. A cena é clara, então o degradê
          precisa segurar bem mais que sobre uma foto escura. */}
      <div aria-hidden="true" className="absolute inset-0 bg-charcoal/40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/15"
      />

      <div className="wrap relative z-10 w-full py-20 md:py-24">
        <div className="max-w-[52rem]">
          <span
            data-hero-eyebrow
            className="text-xs uppercase tracking-[0.3em] text-gold-light"
          >
            Inteligência Olfativa
          </span>

          <h1
            data-hero-heading
            data-reveal
            className="my-8 text-display-xl font-light normal-case text-paper"
          >
            Damos forma ao que não pode ser{" "}
            <em className="not-italic text-gold">visto.</em>
          </h1>

          <div data-hero-body data-reveal>
            <p className="mb-10 max-w-[36rem] text-lead text-paper/85">
              Criamos identidades olfativas que traduzem a essência das marcas e
              transformam ambientes em experiências memoráveis.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <B2BQuoteButton label="Solicitar diagnóstico" />
              <Link
                href="/#solucoes"
                className="inline-flex min-h-11 items-center border-b border-paper/40 pb-1 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:border-gold-light hover:text-gold-light"
              >
                Conhecer soluções
              </Link>
            </div>
          </div>
        </div>
      </div>

      <a
        data-hero-aside
        href="#sobre"
        className="absolute bottom-10 right-6 z-10 hidden items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-paper/70 transition-colors hover:text-gold-light lg:flex lg:flex-col"
      >
        <span className="[writing-mode:vertical-rl]">Descubra</span>
        <span aria-hidden="true" className="h-12 w-px bg-gold-light/60" />
      </a>
    </section>
  );
}
