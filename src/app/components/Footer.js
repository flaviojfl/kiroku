export default function Footer() {
  return (
    <footer className="mt-20 border-t border-sumi/10 bg-washi-100">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="brush-rule mb-8 w-24" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="selo text-2xl text-sumi">青春</p>
            <p className="mt-1 font-display text-base font-semibold text-sumi">
              Seishun · Kiroku
            </p>
            <p className="mt-1 max-w-md text-sm text-sumi-muted">
              Histórico de workshops e eventos do projeto de extensão dedicado à
              cultura japonesa.
            </p>
          </div>
          <p className="text-xs text-sumi-muted">
            Universidade Tecnológica Federal do Paraná · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
