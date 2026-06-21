import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessao } from "@/app/lib/auth";
import { logout } from "@/app/login/actions";
import { prisma } from "@/app/lib/prisma";
import { formatarDataCurta } from "@/app/lib/format";
import { excluirEvento } from "@/app/admin/actions";
import BotaoExcluir from "@/app/admin/BotaoExcluir";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // RNF05 — só acessa quem está autenticado
  const sessao = await getSessao();
  if (!sessao) redirect("/login");

  const eventos = await prisma.evento.findMany({
    include: { local: true, _count: { select: { midias: true } } },
    orderBy: { dataEvento: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-sakura-deep">
            Painel do organizador
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-sumi">
            Gerenciar atividades
          </h1>
          <p className="mt-1 text-sm text-sumi-muted">
            Sessão ativa: {sessao.email}
          </p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-sumi/20 px-5 py-2 text-sm font-medium text-sumi-soft transition-colors hover:border-sakura hover:text-sakura-deep"
          >
            Sair
          </button>
        </form>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-sumi-muted">
          {eventos.length} atividade(s) cadastrada(s)
        </p>
        <Link
          href="/admin/novo"
          className="rounded-full bg-sumi px-5 py-2.5 text-sm font-semibold text-washi transition-colors hover:bg-sakura-deep"
        >
          + Nova atividade
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {eventos.length === 0 && (
          <div className="rounded-xl2 border border-dashed border-sumi/20 bg-nuvem/50 py-16 text-center">
            <p className="font-display text-lg text-sumi">
              Nenhuma atividade ainda.
            </p>
            <p className="mt-1 text-sm text-sumi-muted">
              Clique em “Nova atividade” para cadastrar a primeira.
            </p>
          </div>
        )}

        {eventos.map((evento) => (
          <div
            key={evento.idEventos}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl2 border border-sumi/10 bg-nuvem p-5 shadow-card"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    evento.tipo === "workshop"
                      ? "bg-sumi/90 text-washi"
                      : "bg-sakura/90 text-nuvem"
                  }`}
                >
                  {evento.tipo === "workshop" ? "Workshop" : "Evento"}
                </span>
                <span className="text-xs text-sumi-muted">
                  {formatarDataCurta(evento.dataEvento)}
                </span>
              </div>
              <h3 className="mt-1.5 truncate font-display text-lg font-bold text-sumi">
                {evento.nome}
              </h3>
              <p className="text-xs text-sumi-muted">
                {evento._count.midias} mídia(s)
                {evento.local ? ` · ${evento.local.endereco}` : ""}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/admin/eventos/${evento.idEventos}/editar`}
                className="rounded-full border border-sumi/20 px-4 py-2 text-sm font-medium text-sumi-soft transition-colors hover:border-sumi hover:text-sumi"
              >
                Editar
              </Link>
              <BotaoExcluir
                acao={excluirEvento.bind(null, evento.idEventos)}
                mensagem={`Excluir "${evento.nome}"? Isso remove também as fotos e vídeos. Esta ação não pode ser desfeita.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
