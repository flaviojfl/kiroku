import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 text-center">
      <p className="selo text-5xl text-sakura/50">迷</p>
      <h1 className="mt-6 font-display text-3xl font-bold text-sumi">
        Página não encontrada
      </h1>
      <p className="mt-3 text-sm text-sumi-muted">
        A atividade que você procura pode ter sido removida ou não existe.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-sumi px-6 py-2.5 text-sm font-medium text-washi transition-colors hover:bg-sakura-deep"
      >
        Voltar para a galeria
      </Link>
    </div>
  );
}
