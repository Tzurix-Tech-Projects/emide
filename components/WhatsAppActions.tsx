"use client";

import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { INSTAGRAM_URL } from "@/lib/site";
import {
  HAS_WHATSAPP_NUMBER,
  buildB2BUrl,
  buildContactUrl,
} from "@/lib/whatsapp";

type ActionButtonProps = {
  label?: string;
};

/** Abre o WhatsApp com o briefing de aromatização profissional pré-preenchido. */
export function B2BQuoteButton({
  label = "Solicitar proposta",
}: ActionButtonProps = {}) {
  if (!HAS_WHATSAPP_NUMBER) {
    return (
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        <InstagramLogo size={18} weight="light" aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={buildB2BUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary"
    >
      <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
      {label}
    </a>
  );
}

export function ContactButton({ label = "Falar no WhatsApp" }: ActionButtonProps = {}) {
  if (!HAS_WHATSAPP_NUMBER) {
    return (
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        <InstagramLogo size={18} weight="light" aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={buildContactUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary"
    >
      <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
      {label}
    </a>
  );
}
