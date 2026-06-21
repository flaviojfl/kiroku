"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { login } from "./actions";

const estadoInicial = { erro: null };

export default function LoginPage() {
  const [estado, formAction] = useFormState(login, estadoInicial);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-20">
      <Link href="/" className="selo text-4xl text-sumi">
        青春
      </Link>
      <h1 className="mt-5 font-display text-3xl font-bold text-sumi">
        Área do organizador
      </h1>
      <p className="mt-2 text-sm text-sumi-muted">
        Entre para gerenciar workshops e eventos.
      </p>

      <form
        action={formAction}
        className="rise mt-8 w-full rounded-xl2 border border-sumi/10 bg-nuvem p-7 shadow-card"
      >
        <label className="block">
          <span className="text-sm font-medium text-sumi-soft">E-mail</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="organizador@seishun.com"
            className="mt-1.5 w-full rounded-lg border border-sumi/15 bg-washi-50 px-4 py-2.5 text-sumi outline-none transition-colors focus:border-sakura focus:ring-2 focus:ring-sakura/20"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-sumi-soft">Senha</span>
          <input
            type="password"
            name="senha"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-lg border border-sumi/15 bg-washi-50 px-4 py-2.5 text-sumi outline-none transition-colors focus:border-sakura focus:ring-2 focus:ring-sakura/20"
          />
        </label>

        {estado?.erro && (
          <p className="mt-4 rounded-lg bg-sakura/10 px-3 py-2 text-sm text-sakura-deep">
            {estado.erro}
          </p>
        )}

        <BotaoEntrar />
      </form>

      <Link
        href="/"
        className="mt-6 text-sm text-sumi-muted transition-colors hover:text-sakura-deep"
      >
        ← Voltar para a galeria
      </Link>
    </div>
  );
}

function BotaoEntrar() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full rounded-full bg-sumi py-3 text-sm font-semibold text-washi transition-colors hover:bg-sakura-deep disabled:opacity-60"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}
