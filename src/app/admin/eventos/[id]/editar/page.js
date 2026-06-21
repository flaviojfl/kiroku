import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSessao } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import EventoForm from "@/app/admin/EventoForm";
import BotaoExcluir from "@/app/admin/BotaoExcluir";
import { atualizarEvento, excluirMidia } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function EditarEvento({ params }) {
  if (!(await getSessao())) redirect("/login");

  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const evento = await prisma.evento.findUnique({
    where: { idEventos: id },
    include: { local: true, midias: { orderBy: { ordem: "asc" } } },
  });
  if (!evento) notFound();

  // Converte para um objeto simples (data como AAAA-MM-DD para o input)
  const eventoForm = {
    nome: evento.nome,
    tipo: evento.tipo,
    descricao: evento.descricao,
    participantes: evento.participantes,
    dataEvento: evento.dataEvento.toISOString().slice(0, 10),
    local: evento.local?.endereco || "",
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <Link
        href="/admin"
        className="text-sm font-medium text-sumi-muted transition-colors hover:text-sakura-deep"
      >
        ← Voltar ao painel
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold text-sumi">
        Editar atividade
      </h1>
      <p className="mt-1 mb-8 text-sm text-sumi-muted">{evento.nome}</p>

      {/* Mídias já enviadas */}
      {evento.midias.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-medium text-sumi-soft">
            Mídias atuais ({evento.midias.length})
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {evento.midias.map((m) => (
              <div
                key={m.idImagem}
                className="group relative overflow-hidden rounded-lg border border-sumi/10 bg-washi-200"
              >
                <div className="aspect-square">
                  {m.tipo === "video" ? (
                    <video src={m.url} className="h-full w-full object-cover" muted />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={m.url} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <BotaoExcluir
                    acao={excluirMidia.bind(null, m.idImagem)}
                    label="Remover"
                    mensagem="Remover esta mídia?"
                    className="rounded-full bg-sumi/90 px-3 py-1 text-xs font-medium text-washi hover:bg-sakura-deep"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <EventoForm acao={atualizarEvento.bind(null, id)} evento={eventoForm} />
    </div>
  );
}
