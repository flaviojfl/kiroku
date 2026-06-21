# Kiroku — Seishun

Plataforma web para registro e divulgação do histórico de **workshops** e **eventos**
do projeto de extensão **Seishun**, dedicado à cultura japonesa (UTFPR).

Funciona como um portfólio digital: o público visualiza as atividades livremente, e os
organizadores autenticados cadastram, editam e removem registros.

## Tecnologias

- **Next.js 14** (React, JavaScript) — frontend + backend na mesma aplicação
- **PostgreSQL** — banco de dados relacional (RNF04)
- **Prisma** — ORM para acessar o banco
- **Tailwind CSS** — estilização
- Mídia (fotos e vídeos) salva em `public/uploads/`

---

## Como rodar localmente

### 1. Pré-requisitos

- **Node.js 18.18+** → https://nodejs.org
- **PostgreSQL** instalado e rodando → https://www.postgresql.org/download/

### 2. Instalar as dependências

```bash
npm install
```

### 3. Criar o banco de dados

No PostgreSQL, crie um banco vazio chamado `kiroku`. Exemplo via terminal:

```bash
createdb kiroku
```

(ou crie pelo pgAdmin / DBeaver, como preferir)

### 4. Configurar a conexão

Copie o arquivo de exemplo e ajuste os dados de acesso:

```bash
cp .env.example .env
```

Edite o `.env` e troque usuário/senha pelos do seu PostgreSQL:

```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/kiroku?schema=public"
```

### 5. Criar as tabelas e popular com dados de exemplo

```bash
npx prisma migrate dev --name init
npm run db:seed
```

### 6. Iniciar o projeto

```bash
npm run dev
```

Acesse **http://localhost:3000**

### Organizador de teste

Criado pelo seed (a área de login será concluída na próxima fase):

- **E-mail:** `organizador@seishun.com`
- **Senha:** `seishun123`

---

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run db:migrate` | Aplica/cria migrações no banco |
| `npm run db:seed` | Popula o banco com dados de exemplo |
| `npm run db:studio` | Abre o Prisma Studio (visualizar o banco no navegador) |

---

## Estrutura do projeto

```
kiroku/
├── prisma/
│   ├── schema.prisma     # modelo do banco (tabelas)
│   └── seed.mjs          # dados de exemplo
├── public/
│   ├── logo-seishun.png  # logo do projeto
│   └── uploads/          # fotos e vídeos enviados pelos organizadores
└── src/app/
    ├── layout.js         # estrutura base + fontes + header/footer
    ├── page.js           # galeria pública (página inicial)
    ├── globals.css       # estilos globais (estética washi)
    ├── login/            # área do organizador (provisória)
    ├── eventos/[id]/     # página de detalhes de cada atividade
    ├── components/       # Header, Footer, EventCard
    └── lib/              # cliente Prisma e utilitários
```

---

## Diferenças em relação ao Documento de Visão

Pequenos ajustes práticos (todos preservam o objetivo do sistema):

1. **Hospedagem:** o projeto roda **localmente**, sem deploy na Vercel (combinado com o professor).
2. **Mídia:** a tabela `imagem` guarda o **caminho do arquivo** (em `public/uploads`),
   não o conteúdo binário (BLOB). Isso é mais leve e permite **vídeos**. Além disso,
   cada evento pode ter **várias** mídias (galeria), não apenas uma.
3. **Tabela `data`:** foi incorporada como o campo `dataEvento` dentro de `eventos`,
   simplificando o modelo sem perder informação.

---

## Próximas fases do roadmap

- [x] Fase 2 — Base + design system (Seishun)
- [x] Fase 3 — Banco de dados + galeria pública
- [x] Fase 5 — Login do organizador (autenticação, sessão, logout)
- [x] Fase 6 — Painel do organizador (cadastrar/editar/excluir + upload)
- [ ] Fase 7 — Inserir mídia real e acabamento
- [ ] Fase 8 — Entrega final

---

## Mapeamento de requisitos (Documento de Visão)

| Requisito | Status |
|---|---|
| RF06 — Listar workshops e eventos ao visitante | ✅ feito |
| RF07 — Visualizar detalhes de uma atividade | ✅ feito |
| RNF02 — Conteúdo em português | ✅ feito |
| RNF04 — Banco PostgreSQL | ✅ feito |
| RNF07 — Interface responsiva | ✅ feito |
| RF01 — Login do organizador | ✅ feito |
| RF02–RF05 — Cadastro/edição/exclusão/upload | ✅ feito |
| RF08 — Sessão e logout | ✅ feito |
| RNF05 — Acesso restrito a autenticados | ✅ login/painel protegidos |
