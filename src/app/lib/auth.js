import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "kiroku_sessao";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "troque-este-valor-em-producao"
);

// Assina um token JWT com os dados do organizador logado
export async function criarToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

// Verifica e decodifica um token; retorna null se inválido/expirado
export async function verificarToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

// Lê a sessão atual a partir do cookie.
// Pode ser usada em Server Components e Server Actions.
export async function getSessao() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verificarToken(token);
}
