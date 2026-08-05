"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, List, X } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";
import { STORE_ENABLED } from "@/lib/site";

const LINKS = [
  { href: "/#top", label: "Início" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#solucoes", label: "Soluções" },
  { href: "/#fragrancias", label: "Fragrâncias" },
  { href: "/#cases", label: "Cases" },
  { href: "/#produtos", label: "Produtos" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contato", label: "Contato" },
];

const MOBILE_MENU_ID = "menu-principal";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = LINKS.map((link) =>
      document.getElementById(link.href.split("#")[1])
    ).filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.25] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

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
          className="hidden gap-5 text-[11px] uppercase tracking-[0.1em] lg:flex xl:gap-7"
        >
          {LINKS.map((link) => {
            const sectionId = link.href.split("#")[1];
            const isActive = pathname === "/" && activeSection === sectionId;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveSection(sectionId)}
                className={`relative flex min-h-11 min-w-11 items-center justify-center py-1 transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:bg-gold-dark after:transition-all after:duration-300 hover:text-forest hover:after:w-full ${
                  isActive ? "text-forest after:w-full" : "after:w-0"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          {STORE_ENABLED && <StoreCartButton />}
          <button
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
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
        className="mt-4 border-t border-line bg-paper lg:hidden"
      >
        <div className="wrap flex flex-col py-4">
          {LINKS.map((link) => {
            const sectionId = link.href.split("#")[1];
            const isActive = pathname === "/" && activeSection === sectionId;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                onClick={() => {
                  setActiveSection(sectionId);
                  setMenuOpen(false);
                }}
                className={`flex min-h-11 items-center border-b border-line py-3 text-sm uppercase tracking-[0.12em] last:border-0 ${
                  isActive ? "text-forest" : "text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
