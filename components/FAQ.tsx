"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

const ITEMS = [
  {
    id: "alergia",
    question: "O cheiro pode causar alergia?",
    answer:
      "As essências são produzidas seguindo padrões de segurança e a especificação informada pela EMIDÊ é hipoalergênica. A intensidade também é dimensionada para cada ambiente.",
  },
  {
    id: "energia",
    question: "A máquina consome muita energia?",
    answer:
      "Não. Segundo a especificação dos equipamentos EMIDÊ, o consumo é comparável ao de um roteador de internet.",
  },
  {
    id: "controle",
    question: "Como controlar a intensidade da fragrância?",
    answer:
      "O controle é realizado por aplicativo conectado via Wi-Fi. É possível programar horários e ajustar a potência conforme o tamanho do ambiente e o fluxo de pessoas.",
  },
  {
    id: "exclusiva",
    question: "A EMIDÊ desenvolve fragrâncias exclusivas?",
    answer:
      "Sim. Criamos fragrâncias autorais com base na identidade, no público e nas emoções que cada marca deseja transmitir.",
  },
  {
    id: "personalizacao",
    question: "É possível personalizar os produtos com a minha marca?",
    answer:
      "Sim. Aromatizadores, home sprays, água para tecidos, kits de lavabo e outros produtos podem receber a identidade visual e a fragrância da empresa.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(ITEMS[0].id);
  const prefersReducedMotion = useHydratedReducedMotion();

  return (
    <dl className="max-w-[820px]">
      {ITEMS.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-${item.id}`;
        const buttonId = `faq-${item.id}-botao`;

        return (
          <div key={item.id} className="border-b border-line">
            <dt>
              <button
                id={buttonId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-6 py-7 text-left font-sans text-lg uppercase tracking-[0.025em]"
              >
                <span>
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 200, damping: 20 }
                  }
                  className="shrink-0 text-forest"
                  aria-hidden="true"
                >
                  <Plus size={22} weight="light" />
                </motion.span>
              </button>
            </dt>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.dd
                  id={panelId}
                  aria-labelledby={buttonId}
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                  }
                  className="overflow-hidden"
                >
                  <p className="max-w-[680px] pb-7 text-sm text-ink">
                    {item.answer}
                  </p>
                </motion.dd>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </dl>
  );
}
