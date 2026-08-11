"use client";

import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { INSTAGRAM_URL } from "@/lib/site";
import {
  HAS_WHATSAPP_NUMBER,
  buildB2BUrl,
  buildContactUrl,
} from "@/lib/whatsapp";

/**
 * Sem número configurado a ação não pode simplesmente sumir da página: ela cai
 * no Instagram, que é o outro canal oficial, mantendo o texto do convite.
 */
function WhatsAppLink({ href, label }: { href: string; label: string }) {
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
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary"
    >
      <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
      {label}
    </a>
  );
}

/** Abre o WhatsApp com o briefing de aromatização profissional pré-preenchido. */
export function B2BQuoteButton({ label = "Solicitar proposta" }: { label?: string } = {}) {
  return <WhatsAppLink href={buildB2BUrl()} label={label} />;
}

export function ContactButton({ label = "Falar no WhatsApp" }: { label?: string } = {}) {
  return <WhatsAppLink href={buildContactUrl()} label={label} />;
}
