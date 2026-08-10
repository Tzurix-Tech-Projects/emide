"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";

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
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-forest transition-transform duration-300 ease-smooth ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <Plus size={22} weight="light" />
                </span>
              </button>
            </dt>
            {/* grid-template-rows 0fr→1fr anima a altura sem medir o conteúdo.
                O painel fica sempre no DOM para aria-controls apontar para ele. */}
            <dd
              id={panelId}
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-smooth ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[680px] pb-7 text-sm text-ink">
                  {item.answer}
                </p>
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
