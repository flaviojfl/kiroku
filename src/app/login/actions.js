"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { criarToken, COOKIE_NAME } from "../lib/auth";

// RF01 — Login do organizador com e-mail e senha
export async function login(estadoAnterior, formData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const senha = String(formData.get("senha") || "");

  if (!email || !senha) {
    return { erro: "Preencha e-mail e senha." };
  }

  // Busca o organizador ativo pelo e-mail
  const usuario = await prisma.usuario.findFirst({
    where: { email, ativo: true },
  });

  // Mensagem genérica para não revelar se o e-mail existe
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    return { erro: "E-mail ou senha incorretos." };
  }

  // RF08 — Cria a sessão (cookie httpOnly assinado, válido por 7 dias)
  const token = await criarToken({
    login: usuario.login,
    email: usuario.email,
    tipo: usuario.tipoUsuario,
  });

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

// RF08 — Encerramento da sessão
export async function logout() {
  cookies().delete(COOKIE_NAME);
  redirect("/");
}
