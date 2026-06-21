"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prisma } from "@/app/lib/prisma";
import { getSessao } from "@/app/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Garante que só organizadores autenticados executem estas ações (RNF05)
async function exigirSessao() {
  const sessao = await getSessao();
  if (!sessao) redirect("/login");
  return sessao;
}

// Lê os campos do formulário de evento/workshop
function lerDados(formData) {
  return {
    nome: String(formData.get("nome") || "").trim(),
    tipo: String(formData.get("tipo") || "workshop"),
    descricao: String(formData.get("descricao") || "").trim(),
    participantes: parseInt(formData.get("participantes") || "0", 10) || 0,
    dataEvento: new Date(String(formData.get("dataEvento"))),
  };
}

// Encontra ou cria o local pelo endereço informado
async function resolverLocal(enderecoBruto) {
  const endereco = String(enderecoBruto || "").trim();
  if (!endereco) return null;
  const existente = await prisma.local.findFirst({ where: { endereco } });
  if (existente) return existente.idLocal;
  const novo = await prisma.local.create({ data: { endereco } });
  return novo.idLocal;
}

// RF05 — salva os arquivos enviados em /public/uploads e registra na tabela mídia
async function salvarArquivos(arquivos, eventoId) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  let ordem = await prisma.midia.count({ where: { eventoId } });

  for (const arquivo of arquivos) {
    if (!arquivo || typeof arquivo.arrayBuffer !== "function" || arquivo.size === 0) {
      continue;
    }
    const bytes = Buffer.from(await arquivo.arrayBuffer());
    const ext = (arquivo.name.split(".").pop() || "bin").toLowerCase();
    const nomeArquivo = `${crypto.randomUUID()}.${ext}`;
    await writeFile(path.join(UPLOAD_DIR, nomeArquivo), bytes);

    const tipo = arquivo.type.startsWith("video") ? "video" : "imagem";
    await prisma.midia.create({
      data: { url: `/uploads/${nomeArquivo}`, tipo, ordem: ordem++, eventoId },
    });
  }
}

// RF02 — cadastrar novo workshop/evento
export async function criarEvento(formData) {
  const sessao = await exigirSessao();
  const dados = lerDados(formData);
  const localId = await resolverLocal(formData.get("local"));

  const evento = await prisma.evento.create({
    data: { ...dados, localId, usuarioLogin: sessao.login },
  });

  await salvarArquivos(formData.getAll("arquivos"), evento.idEventos);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

// RF03 — editar evento existente
export async function atualizarEvento(id, formData) {
  await exigirSessao();
  const dados = lerDados(formData);
  const localId = await resolverLocal(formData.get("local"));

  await prisma.evento.update({
    where: { idEventos: id },
    data: { ...dados, localId },
  });

  await salvarArquivos(formData.getAll("arquivos"), id);

  revalidatePath("/");
  revalidatePath(`/eventos/${id}`);
  revalidatePath("/admin");
  redirect("/admin");
}

// RF04 — excluir evento (e remover os arquivos de mídia do disco)
export async function excluirEvento(id) {
  await exigirSessao();

  const midias = await prisma.midia.findMany({ where: { eventoId: id } });
  for (const m of midias) {
    await unlink(path.join(process.cwd(), "public", m.url)).catch(() => {});
  }

  // As mídias no banco são removidas em cascata (onDelete: Cascade)
  await prisma.evento.delete({ where: { idEventos: id } });

  revalidatePath("/");
  revalidatePath("/admin");
}

// Remover uma mídia específica (usado na tela de edição)
export async function excluirMidia(id) {
  await exigirSessao();
  const m = await prisma.midia.findUnique({ where: { idImagem: id } });
  if (!m) return;

  await unlink(path.join(process.cwd(), "public", m.url)).catch(() => {});
  await prisma.midia.delete({ where: { idImagem: id } });

  revalidatePath("/");
  revalidatePath(`/eventos/${m.eventoId}`);
  revalidatePath(`/admin/eventos/${m.eventoId}/editar`);
}
