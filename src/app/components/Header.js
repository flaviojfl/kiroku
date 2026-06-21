import Link from "next/link";
import { getSessao } from "../lib/auth";
import { logout } from "../login/actions";

export default async function Header() {
  const sessao = await getSessao();

  return (
    <header className="sticky top-0 z-40 border-b border-sumi/10 bg-washi/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <span className="selo text-3xl leading-none text-sumi transition-transform group-hover:scale-105">
            青春
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-wide text-sumi">
              Seishun
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-sumi-muted">
              Kiroku
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-sumi-soft transition-colors hover:bg-sakura/10 hover:text-sakura-deep"
          >
            Início
          </Link>

          {sessao ? (
            <>
              <Link
                href="/admin"
                className="rounded-full px-4 py-2 text-sm font-medium text-sumi-soft transition-colors hover:bg-sakura/10 hover:text-sakura-deep"
              >
                Painel
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full bg-sumi px-4 py-2 text-sm font-medium text-washi transition-colors hover:bg-sakura-deep"
                >
                  Sair
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-sumi px-4 py-2 text-sm font-medium text-washi transition-colors hover:bg-sakura-deep"
            >
              Área do organizador
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
