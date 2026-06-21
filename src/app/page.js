import { prisma } from "./lib/prisma";
import EventCard from "./components/EventCard";

// Sempre buscar dados atualizados do banco
export const dynamic = "force-dynamic";

export default async function Home() {
  const eventos = await prisma.evento.findMany({
    include: { local: true, midias: true },
    orderBy: { dataEvento: "desc" },
  });

  const totalWorkshops = eventos.filter((e) => e.tipo === "workshop").length;
  const totalEventos = eventos.filter((e) => e.tipo === "evento").length;

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero */}
      <section className="rise pt-12 text-center sm:pt-16">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl2 border border-sumi/10 shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-seishun.png"
            alt="Seishun — 青春"
            className="h-auto w-full"
          />
        </div>

        <h1 className="mt-8 font-display text-4xl font-extrabold leading-tight text-sumi sm:text-5xl">
          Histórico de atividades
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sumi-muted">
          Workshops e eventos do projeto de extensão{" "}
          <span className="font-semibold text-sumi">Seishun</span>, dedicado à
          difusão da cultura japonesa. Explore o que já realizamos.
        </p>

        {/* Estatísticas */}
        <div className="mt-8 flex items-center justify-center gap-8">
          <Stat numero={totalWorkshops} rotulo="Workshops" />
          <span className="h-10 w-px bg-sumi/15" />
          <Stat numero={totalEventos} rotulo="Eventos" />
        </div>

        <div className="brush-rule mx-auto mt-12 w-32" />
      </section>

      {/* Galeria */}
      <section className="py-12">
        {eventos.length === 0 ? (
          <EstadoVazio />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento, i) => (
              <EventCard key={evento.idEventos} evento={evento} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ numero, rotulo }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-bold text-sakura-deep">{numero}</p>
      <p className="text-xs uppercase tracking-widest text-sumi-muted">{rotulo}</p>
    </div>
  );
}

function EstadoVazio() {
  return (
    <div className="rounded-xl2 border border-dashed border-sumi/20 bg-nuvem/50 py-20 text-center">
      <p className="selo text-4xl text-sumi/30">記録</p>
      <p className="mt-4 font-display text-lg text-sumi">
        Nenhuma atividade cadastrada ainda.
      </p>
      <p className="mt-1 text-sm text-sumi-muted">
        Os organizadores podem adicionar workshops e eventos na área restrita.
      </p>
    </div>
  );
}
