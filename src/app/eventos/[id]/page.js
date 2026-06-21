import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { formatarData } from "../../lib/format";

export const dynamic = "force-dynamic";

export default async function EventoDetalhe({ params }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const evento = await prisma.evento.findUnique({
    where: { idEventos: id },
    include: { local: true, midias: { orderBy: { ordem: "asc" } } },
  });

  if (!evento) notFound();

  const ehWorkshop = evento.tipo === "workshop";

  return (
    <article className="mx-auto max-w-4xl px-5 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-sumi-muted transition-colors hover:text-sakura-deep"
      >
        <span>←</span> Voltar para a galeria
      </Link>

      {/* Cabeçalho */}
      <header className="rise mt-6">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
            ehWorkshop ? "bg-sumi text-washi" : "bg-sakura text-nuvem"
          }`}
        >
          {ehWorkshop ? "Workshop" : "Evento"}
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-sumi sm:text-5xl">
          {evento.nome}
        </h1>

        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-sumi-soft">
          <Info rotulo="Data" valor={formatarData(evento.dataEvento)} />
          {evento.local && <Info rotulo="Local" valor={evento.local.endereco} />}
          {evento.participantes > 0 && (
            <Info rotulo="Participantes" valor={`${evento.participantes} pessoas`} />
          )}
        </div>
      </header>

      <div className="brush-rule mt-8 w-full" />

      {/* Galeria de mídia */}
      {evento.midias.length > 0 && (
        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {evento.midias.map((m) => (
            <div
              key={m.idImagem}
              className="overflow-hidden rounded-xl2 border border-sumi/10 bg-nuvem shadow-card"
            >
              {m.tipo === "video" ? (
                <video src={m.url} controls className="h-full w-full" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={evento.nome} className="h-full w-full object-cover" />
              )}
            </div>
          ))}
        </section>
      )}

      {/* Descrição */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-sumi">Sobre a atividade</h2>
        <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-sumi-soft">
          {evento.descricao}
        </p>
      </section>
    </article>
  );
}

function Info({ rotulo, valor }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-sumi-muted">{rotulo}</p>
      <p className="mt-0.5 font-medium text-sumi">{valor}</p>
    </div>
  );
}
