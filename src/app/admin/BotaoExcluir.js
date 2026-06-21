"use client";

export default function BotaoExcluir({ acao, label = "Excluir", mensagem, className }) {
  return (
    <form
      action={acao}
      onSubmit={(e) => {
        if (!confirm(mensagem || "Tem certeza? Esta ação não pode ser desfeita.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className={
          className ||
          "rounded-full border border-sumi/20 px-4 py-2 text-sm font-medium text-sumi-soft transition-colors hover:border-sakura hover:bg-sakura/10 hover:text-sakura-deep"
        }
      >
        {label}
      </button>
    </form>
  );
}
