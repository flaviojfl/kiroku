import Link from "next/link";
import { formatarDataCurta } from "../lib/format";

export default function EventCard({ evento, index = 0 }) {
  const capa = evento.midias?.find((m) => m.tipo === "imagem") || evento.midias?.[0];
  const ehWorkshop = evento.tipo === "workshop";

  return (
    <Link
      href={`/eventos/${evento.idEventos}`}
      className="rise group block overflow-hidden rounded-xl2 border border-sumi/10 bg-nuvem shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Capa */}
      <div className="relative aspect-[4/3] overflow-hidden bg-washi-200">
        {capa ? (
          capa.tipo === "video" ? (
            <video
              src={capa.url}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              muted
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={capa.url}
              alt={evento.nome}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <PlaceholderSakura />
        )}

        {/* Selo do tipo de atividade */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
            ehWorkshop
              ? "bg-sumi/90 text-washi"
              : "bg-sakura/90 text-nuvem"
          }`}
        >
          {ehWorkshop ? "Workshop" : "Evento"}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-sakura-deep">
          {formatarDataCurta(evento.dataEvento)}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold leading-snug text-sumi">
          {evento.nome}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-sumi-muted">
          {evento.descricao}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-sumi-muted">
          {evento.local && (
            <span className="flex items-center gap-1">
              <PinIcon /> {evento.local.endereco}
            </span>
          )}
          {evento.participantes > 0 && (
            <span className="flex items-center gap-1">
              <PeopleIcon /> {evento.participantes}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function PlaceholderSakura() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-washi-200 to-washi-300">
      <svg width="72" height="72" viewBox="0 0 100 100" className="opacity-50">
        <g fill="#FBB9C7">
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="28"
              rx="13"
              ry="20"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
        </g>
        <circle cx="50" cy="50" r="8" fill="#EC6F9E" />
      </svg>
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
