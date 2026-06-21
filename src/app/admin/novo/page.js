import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessao } from "@/app/lib/auth";
import EventoForm from "@/app/admin/EventoForm";
import { criarEvento } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function NovoEvento() {
  if (!(await getSessao())) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <Link
        href="/admin"
        className="text-sm font-medium text-sumi-muted transition-colors hover:text-sakura-deep"
      >
        ← Voltar ao painel
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold text-sumi">
        Nova atividade
      </h1>
      <p className="mt-1 mb-8 text-sm text-sumi-muted">
        Cadastre um workshop ou evento e envie as fotos e vídeos.
      </p>

      <EventoForm acao={criarEvento} />
    </div>
  );
}
