"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";

const ITEMS = [
  {
    id: "proposta",
    question: "Como solicitar uma proposta?",
    answer:
      "Conte o tipo de ambiente, a metragem aproximada e a cidade pelo canal de contato indicado no site. A EMIDÊ retorna com os próximos passos do atendimento.",
  },
  {
    id: "durabilidade",
    question: "Qual a durabilidade dos difusores?",
    answer:
      "Um difusor de 300ml perfuma um ambiente por até quatro meses, dependendo da ventilação e do número de varetas usadas.",
  },
  {
    id: "empresas",
    question: "Vocês atendem empresas e projetos?",
    answer:
      "Sim. Desenvolvemos assinaturas olfativas e sistemas de aromatização para hotéis, clínicas, escritórios e arquitetos. A proposta é solicitada na seção Profissional.",
  },
  {
    id: "exclusiva",
    question: "É possível criar uma fragrância exclusiva?",
    answer:
      "Sim, em projetos profissionais. A consultoria desenvolve composições alinhadas à identidade da marca.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(ITEMS[0].id);
  const prefersReducedMotion = useReducedMotion();

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
                className="flex w-full items-center justify-between gap-6 py-7 text-left font-display text-lg"
              >
                {item.question}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 200, damping: 20 }
                  }
                  className="shrink-0 text-gold-dark"
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
