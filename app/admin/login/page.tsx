"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys";

export default function AdminLoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: submitLogin,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => signIn(email, password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.session });
      router.replace("/admin");
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitLogin();
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-mist px-6 pt-24">
      <div className="w-full max-w-[400px] bg-paper p-10">
        <span className="eyebrow">Área restrita</span>
        <h1 className="mb-8 mt-3 text-3xl font-light">Painel EMIDÊ</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="field-label">
              E-mail
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="field"
            />
          </label>
          <label className="block">
            <span className="field-label">
              Senha
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="field"
            />
          </label>

          {isError && (
            <p role="alert" className="text-sm text-gold-dark">
              E-mail ou senha inválidos. Tente novamente.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn w-full justify-center bg-forest text-paper hover:bg-gold disabled:opacity-60"
          >
            {isPending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
