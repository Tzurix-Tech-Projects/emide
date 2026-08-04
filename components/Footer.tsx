import Image from "next/image";
import Link from "next/link";
import { buildContactUrl, HAS_WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { CATEGORIES } from "@/lib/products";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  STORE_ENABLED,
} from "@/lib/site";

const COMPANY_LINKS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#profissional", label: "Profissional" },
  { href: "/#faq", label: "Perguntas frequentes" },
];

const STORE_LINKS = CATEGORIES.map((category) => ({
  href: `/loja?categoria=${category.id}`,
  label: category.label,
}));

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist py-20 text-ink">
      <div className="wrap">
        <div
          className={`mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 ${
            STORE_ENABLED
              ? "lg:grid-cols-[2fr_1fr_1fr_1.4fr]"
              : "lg:grid-cols-[2fr_1fr_1.4fr]"
          }`}
        >
          <div>
            <Image
              src="/brand/emide-logo-dark.png"
              alt="EMIDÊ — Inteligência Olfativa"
              width={789}
              height={237}
              sizes="220px"
              className="mb-5 h-auto w-[220px]"
            />
            <p className="max-w-[280px] text-sm">
              Perfumaria de ambientes para a casa e para espaços comerciais.
            </p>
          </div>

          {STORE_ENABLED && <FooterColumn title="Loja" links={STORE_LINKS} />}
          <FooterColumn title="Empresa" links={COMPANY_LINKS} />

          <div>
            <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-charcoal">
              Contato
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {HAS_WHATSAPP_NUMBER && (
                <li>
                  <a
                    href={buildContactUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 min-w-11 items-center hover:text-forest"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center hover:text-forest"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex min-h-11 min-w-11 items-center hover:text-forest"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-7 text-xs tracking-wide">
          <span>© {new Date().getFullYear()} EMIDÊ</span>
          <span>Todos os direitos reservados</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-charcoal">
        {title}
      </h3>
      <ul className="flex flex-col gap-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-11 min-w-11 items-center hover:text-forest"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
