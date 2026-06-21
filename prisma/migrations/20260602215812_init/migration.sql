-- CreateTable
CREATE TABLE "usuario" (
    "login" VARCHAR(255) NOT NULL,
    "login_email" VARCHAR(255) NOT NULL,
    "login_senha" VARCHAR(255) NOT NULL,
    "tipo_usuario" INTEGER NOT NULL DEFAULT 1,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("login")
);

-- CreateTable
CREATE TABLE "local" (
    "id_local" SERIAL NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,

    CONSTRAINT "local_pkey" PRIMARY KEY ("id_local")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id_eventos" SERIAL NOT NULL,
    "evento_nome" VARCHAR(120) NOT NULL,
    "evento_descricao" TEXT NOT NULL,
    "evento_participantes" INTEGER NOT NULL DEFAULT 0,
    "tipo" VARCHAR(20) NOT NULL DEFAULT 'workshop',
    "data_evento" DATE NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "local_id" INTEGER,
    "usuario_login" TEXT,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id_eventos")
);

-- CreateTable
CREATE TABLE "imagem" (
    "id_imagem" SERIAL NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "tipo" VARCHAR(10) NOT NULL DEFAULT 'imagem',
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "evento_id" INTEGER NOT NULL,

    CONSTRAINT "imagem_pkey" PRIMARY KEY ("id_imagem")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_login_email_key" ON "usuario"("login_email");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "local"("id_local") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_usuario_login_fkey" FOREIGN KEY ("usuario_login") REFERENCES "usuario"("login") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagem" ADD CONSTRAINT "imagem_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id_eventos") ON DELETE CASCADE ON UPDATE CASCADE;
