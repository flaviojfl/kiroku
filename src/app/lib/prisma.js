import { PrismaClient } from "@prisma/client";

// Evita criar várias instâncias do Prisma durante o hot-reload do Next.js
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
