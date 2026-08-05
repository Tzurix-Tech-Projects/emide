import Image from "next/image";
import Link from "next/link";
import { BrandText } from "@/components/BrandText";
import { HAS_WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { CATEGORIES } from "@/lib/products";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  INSTAGRAM_URL,
  STORE_ENABLED,
} from "@/lib/site";

const COMPANY_LINKS = [
  { href: "/#sobre", label: "Sobre a EMIDÊ" },
  { href: "/#solucoes", label: "Soluções" },
  { href: "/#fragrancias", label: "Fragrâncias exclusivas" },
  { href: "/#cases", label: "Cases" },
  { href: "/#produtos", label: "Produtos personalizados" },
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
              Inteligência olfativa para transformar marcas e ambientes em
              experiências memoráveis.
            </p>
          </div>

          {STORE_ENABLED && <FooterColumn title="Loja" links={STORE_LINKS} />}
          <FooterColumn title="Empresa" links={COMPANY_LINKS} />

          <div>
            <h3 className="mb-5 text-xs uppercase tracking-[0.2em] text-charcoal">
              <BrandText>Contato</BrandText>
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {HAS_WHATSAPP_NUMBER && (
                CONTACT_PHONES.map((phone) => (
                  <li key={phone.international}>
                    <a
                      href={`https://wa.me/${phone.international}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 min-w-11 items-center hover:text-forest"
                    >
                      WhatsApp {phone.display}
                    </a>
                  </li>
                ))
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
              <li className="max-w-[280px] pt-2 leading-relaxed">
                {CONTACT_ADDRESS.street}
                <br />
                {CONTACT_ADDRESS.district} — {CONTACT_ADDRESS.city}/
                {CONTACT_ADDRESS.state}
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
        <BrandText>{title}</BrandText>
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
