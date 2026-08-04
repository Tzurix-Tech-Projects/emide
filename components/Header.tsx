"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, List, X } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";
import { STORE_ENABLED } from "@/lib/site";

const INSTITUTIONAL_LINKS = [
  { href: "/#sobre", label: "A EMIDÊ" },
  { href: "/#profissional", label: "Profissional" },
  { href: "/#pratica", label: "Como trabalhamos" },
  { href: "/#faq", label: "Dúvidas" },
  { href: "/#contato", label: "Contato" },
];

const STORE_LINKS = [
  { href: "/loja", label: "Loja" },
  { href: "/loja?categoria=difusores", label: "Difusores" },
  { href: "/#profissional", label: "Profissional" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

const LINKS = STORE_ENABLED ? STORE_LINKS : INSTITUTIONAL_LINKS;

const MOBILE_MENU_ID = "menu-principal";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled
          ? "border-b border-black/5 bg-paper/90 py-4 backdrop-blur-md"
          : "py-6"
      }`}
    >
      <div className="wrap flex items-center justify-between">
        <Link
          href="/"
          className="relative block h-[46px] w-[154px] shrink-0 md:h-[54px] md:w-[180px]"
          aria-label="EMIDÊ, ir para a página inicial"
        >
          <Image
            src="/brand/emide-logo-dark.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 154px, 180px"
            className="object-contain object-left"
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden gap-9 text-xs uppercase tracking-[0.12em] md:flex"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative flex min-h-11 items-center py-1 transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-dark after:transition-all after:duration-300 hover:text-forest hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          {STORE_ENABLED && <StoreCartButton />}
          <button
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            {menuOpen ? (
              <X size={24} weight="light" aria-hidden="true" />
            ) : (
              <List size={24} weight="light" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        id={MOBILE_MENU_ID}
        aria-label="Navegação principal"
        hidden={!menuOpen}
        className="mt-4 border-t border-line bg-paper md:hidden"
      >
        <div className="wrap flex flex-col py-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center border-b border-line py-3 text-sm uppercase tracking-[0.12em] last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function StoreCartButton() {
  const { count, open } = useCart();

  return (
    <button
      onClick={open}
      className="relative inline-flex min-h-11 min-w-11 items-center justify-center text-xs uppercase tracking-[0.12em] transition-transform active:scale-[0.98]"
      aria-label={
        count === 1
          ? "Abrir carrinho, 1 item"
          : `Abrir carrinho, ${count} itens`
      }
    >
      <ShoppingBag size={20} weight="light" aria-hidden="true" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[10px] text-paper"
        >
          {count}
        </span>
      )}
    </button>
  );
}
