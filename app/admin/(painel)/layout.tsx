"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SignOut } from "@phosphor-icons/react";
import { fetchSession, signOut } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys";

const NAV_LINKS = [
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/pedidos", label: "Pedidos" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data: session, isPending } = useQuery({
    queryKey: queryKeys.session,
    queryFn: fetchSession,
  });

  useEffect(() => {
    if (!isPending && !session) router.replace("/admin/login");
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    await signOut();
    await queryClient.invalidateQueries({ queryKey: queryKeys.session });
    router.replace("/admin/login");
  };

  if (isPending) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center pt-24 text-ink">
        Carregando…
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-[100dvh] bg-mist pb-24 pt-32">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Painel EMIDÊ</span>
            <nav className="mt-3 flex gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b pb-0.5 text-sm uppercase tracking-[0.12em] transition-colors ${
                    pathname.startsWith(link.href)
                      ? "border-forest text-forest"
                      : "border-transparent text-ink hover:text-forest"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-ink hover:text-gold-dark"
          >
            <SignOut size={16} weight="light" />
            Sair
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
