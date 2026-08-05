"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { B2BQuoteButton } from "@/components/WhatsAppActions";
import { BrandText } from "@/components/BrandText";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-mist pb-20 pt-32 md:py-32"
    >
      <motion.div
        variants={container}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="show"
        className="wrap relative z-10 grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
      >
        <div className="max-w-[700px]">
          <motion.span data-reveal variants={item} className="eyebrow">
            EMIDÊ Inteligência Olfativa
          </motion.span>
          <motion.h1
            data-reveal
            variants={item}
            className="my-6 text-[2.75rem] font-normal leading-[1.02] sm:text-5xl md:text-7xl"
          >
            <BrandText>Inteligência olfativa:</BrandText>
            <br aria-hidden="true" />
            <span className="sr-only"> </span>
            <BrandText>a estratégia invisível do sucesso.</BrandText>
          </motion.h1>
          <motion.p
            data-reveal
            variants={item}
            className="mb-10 max-w-[520px] text-lg text-ink"
          >
            Criamos identidades olfativas exclusivas que aumentam a percepção de
            valor, fortalecem a conexão com o cliente e tornam sua marca
            inesquecível.
          </motion.p>
          <motion.div data-reveal variants={item} className="flex flex-wrap gap-3">
            <B2BQuoteButton label="Quero criar minha identidade olfativa" />
            <Link href="/#solucoes" className="btn btn-outline">
              Conheça nossas soluções
            </Link>
          </motion.div>
        </div>

        <motion.div
          data-reveal
          variants={item}
          className="relative min-h-[390px] overflow-hidden bg-charcoal shadow-[0_28px_80px_-50px_rgba(29,29,27,0.45)] sm:min-h-[520px] lg:min-h-[610px]"
        >
          <motion.div
            className="absolute inset-[-5%]"
            style={
              prefersReducedMotion
                ? undefined
                : { y: imageY, scale: imageScale }
            }
          >
            <Image
              src="/images/institucional/hero-aromatizacao.jpg"
              alt="Aromatizador profissional EMIDÊ em um ambiente com madeira e iluminação quente"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
          <div className="absolute bottom-0 left-0 bg-forest px-6 py-4 text-paper sm:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-light">
              Aromatização profissional
            </p>
            <p className="mt-1 text-sm text-paper/80">
              Estratégia, tecnologia e personalização
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
