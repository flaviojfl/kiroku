"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";

export default function EventoForm({ acao, evento }) {
  const editando = !!evento;

  return (
    <form
      action={acao}
      encType="multipart/form-data"
      className="rounded-xl2 border border-sumi/10 bg-nuvem p-7 shadow-card"
    >
      <Campo label="Nome da atividade">
        <input
          name="nome"
          required
          defaultValue={evento?.nome || ""}
          placeholder="Ex.: Workshop de Taiko"
          className={inputClasse}
        />
      </Campo>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo label="Tipo">
          <select
            name="tipo"
            defaultValue={evento?.tipo || "workshop"}
            className={inputClasse}
          >
            <option value="workshop">Workshop</option>
            <option value="evento">Evento</option>
          </select>
        </Campo>

        <Campo label="Data">
          <input
            type="date"
            name="dataEvento"
            required
            defaultValue={evento?.dataEvento || ""}
            className={inputClasse}
          />
        </Campo>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo label="Local">
          <input
            name="local"
            defaultValue={evento?.local || ""}
            placeholder="Ex.: UTFPR - Cornélio Procópio"
            className={inputClasse}
          />
        </Campo>

        <Campo label="Nº de participantes">
          <input
            type="number"
            name="participantes"
            min="0"
            defaultValue={evento?.participantes ?? 0}
            className={inputClasse}
          />
        </Campo>
      </div>

      <Campo label="Descrição" className="mt-4">
        <textarea
          name="descricao"
          required
          rows={5}
          defaultValue={evento?.descricao || ""}
          placeholder="Descreva as atividades realizadas..."
          className={`${inputClasse} resize-y`}
        />
      </Campo>

      <Campo
        label={editando ? "Adicionar mais fotos/vídeos" : "Fotos e vídeos"}
        className="mt-4"
      >
        <input
          type="file"
          name="arquivos"
          multiple
          accept="image/*,video/*"
          className="block w-full text-sm text-sumi-soft file:mr-4 file:rounded-full file:border-0 file:bg-sumi file:px-4 file:py-2 file:text-sm file:font-medium file:text-washi hover:file:bg-sakura-deep"
        />
        <p className="mt-1.5 text-xs text-sumi-muted">
          Você pode selecionar vários arquivos de uma vez (imagens e vídeos).
        </p>
      </Campo>

      <div className="mt-7 flex items-center gap-3">
        <Botao editando={editando} />
        <Link
          href="/admin"
          className="rounded-full px-5 py-3 text-sm font-medium text-sumi-muted transition-colors hover:text-sumi"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

const inputClasse =
  "w-full rounded-lg border border-sumi/15 bg-washi-50 px-4 py-2.5 text-sumi outline-none transition-colors focus:border-sakura focus:ring-2 focus:ring-sakura/20";

function Campo({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-sumi-soft">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Botao({ editando }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-sumi px-7 py-3 text-sm font-semibold text-washi transition-colors hover:bg-sakura-deep disabled:opacity-60"
    >
      {pending
        ? "Salvando..."
        : editando
        ? "Salvar alterações"
        : "Cadastrar atividade"}
    </button>
  );
}
