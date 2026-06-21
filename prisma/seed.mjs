import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Limpando dados antigos...");
  await prisma.midia.deleteMany();
  await prisma.evento.deleteMany();
  await prisma.local.deleteMany();
  await prisma.usuario.deleteMany();

  // --- Organizador de teste ---
  // Login na área restrita:  organizador@seishun.com  /  seishun123
  const senhaHash = await bcrypt.hash("seishun123", 10);
  await prisma.usuario.create({
    data: {
      login: "organizador",
      email: "organizador@seishun.com",
      senha: senhaHash,
      tipoUsuario: 2,
    },
  });
  console.log("Organizador criado: organizador@seishun.com / seishun123");

  // --- Locais ---
  const utfpr = await prisma.local.create({
    data: { endereco: "UTFPR - Campus Cornélio Procópio" },
  });
  const pracaCentral = await prisma.local.create({
    data: { endereco: "Praça Central - Cornélio Procópio, PR" },
  });

  // --- Eventos / Workshops de exemplo ---
  const eventos = [
    {
      nome: "Workshop de Taiko",
      tipo: "workshop",
      descricao:
        "Oficina introdutória de taiko, o tambor tradicional japonês. Os participantes aprenderam ritmos básicos, postura e a energia coletiva que define essa arte percussiva milenar.",
      participantes: 24,
      dataEvento: new Date("2025-04-12"),
      localId: utfpr.idLocal,
      midias: {
        create: [
          { 
            url: "/uploads/20250727_063706.jpg", // Foto panorâmica do salão com os banners
            tipo: "imagem", 
            ordem: 1 
          },
          { 
            url: "/uploads/20250727_142213.jpg", // Foto dos tocadores em ação com os bachi
            tipo: "imagem", 
            ordem: 2 
          },
          { 
            url: "/uploads/20250727_111228.mp4", // O vídeo da apresentação no palco
            tipo: "video", 
            ordem: 3 
          },
          { 
            url: "/uploads/20250727_063718.jpg", // Banner Zenshin Daiko e outros da esquerda
            tipo: "imagem", 
            ordem: 4 
          },
          { 
            url: "/uploads/20250727_063726.jpg", // Banners da direita (Mizuho Wadaiko, etc.)
            tipo: "imagem", 
            ordem: 5 
          },
          { 
            url: "/uploads/20250727_063735.jpg", // Close nos banners da direita
            tipo: "imagem", 
            ordem: 6 
          },
          { 
            url: "/uploads/20250727_063742.jpg", // Visão aproximada dos banners centrais
            tipo: "imagem", 
            ordem: 7 
          }
        ]
      }
    
    },
    {
      nome: "Workshop de Origami",
      tipo: "workshop",
      descricao:
        "Tarde dedicada à arte de dobrar papel. Do tradicional tsuru (garça) a modelos modulares, exploramos a paciência e a precisão por trás de cada dobra.",
      participantes: 30,
      dataEvento: new Date("2025-03-22"),
      localId: utfpr.idLocal,
      midias: {
        create: [
          { 
            url: "/uploads/20250604_195538.jpg", // Foto focada nas borboletas amarelas (detalhe)
            tipo: "imagem", 
            ordem: 1 
          },
          { 
            url: "/uploads/20250604_195544.jpg", // Visão superior das três borboletas
            tipo: "imagem", 
            ordem: 2 
          },
          { 
            url: "/uploads/20250604_185705.jpg", // Participantes focados dobrando nas mesas compridas
            tipo: "imagem", 
            ordem: 3 
          },
          { 
            url: "/uploads/20250604_184020.jpg", // Organizador auxiliando uma participante com papel verde
            tipo: "imagem", 
            ordem: 4 
          },
          { 
            url: "/uploads/20250604_185655.jpg", // Clima descontraído com os instrutores em pé ajudando
            tipo: "imagem", 
            ordem: 5 
          },
          { 
            url: "/uploads/20250604_192620.mp4", // Vídeo mostrando o elefante de origami e a visão geral da sala
            tipo: "video", 
            ordem: 6 
          },
          { 
            url: "/uploads/20250604_192541.mp4", // Vídeo mostrando a mesa com os materiais e pessoas dobrando
            tipo: "video", 
            ordem: 7 
          },
          { 
            url: "/uploads/20250604_192401.mp4", // Vídeo mostrando as meninas montando os tsurus rosa
            tipo: "video", 
            ordem: 8 
          },
          { 
            url: "/uploads/20250604_190147.jpg", // Participante em primeiro plano dobrando papel rosa perto do diagrama do coelho
            tipo: "imagem", 
            ordem: 9 
          },
          { 
            url: "/uploads/20250604_190158.jpg", // Detalhe de um participante mostrando a dobra para outra pessoa na mesa
            tipo: "imagem", 
            ordem: 10 
          },
          { 
            url: "/uploads/20250604_190218.jpg", // Instrutora explicando o processo em pé na cabeceira da mesa
            tipo: "imagem", 
            ordem: 11 
          },
          { 
            url: "/uploads/20250604_190220.jpg", // Outro ângulo da explicação da instrutora focando nas dobras da mesa
            tipo: "imagem", 
            ordem: 12 
          },
          { 
            url: "/uploads/20250604_190132.jpg", // Foto panorâmica mostrando as duas mesas principais da sala cheias de alunos
            tipo: "imagem", 
            ordem: 13 
          },
          { 
            url: "/uploads/20250604_192338.mp4", // Vídeo mostrando a movimentação e a interação entre as mesas
            tipo: "video", 
            ordem: 14 
          }
        ]
      }
    },
    {
      nome: "Festival da Cultura Japonesa",
      tipo: "evento",
      descricao:
        "Participação do Seishun no festival cultural da cidade, com apresentação de taiko ao vivo, exposição de origami e uma roda de conversa sobre tradições japonesas.",
      participantes: 150,
      dataEvento: new Date("2025-05-10"),
      localId: pracaCentral.idLocal,
    },
    {
      nome: "Encontro Temático: Hanami",
      tipo: "evento",
      descricao:
        "Encontro inspirado no hanami, a contemplação das cerejeiras em flor. Uma celebração da primavera com música, chá e atividades culturais abertas ao público.",
      participantes: 45,
      dataEvento: new Date("2025-09-05"),
      localId: pracaCentral.idLocal,
    },
  ];

  for (let i = 0; i < eventos.length; i++) {
    await prisma.evento.create({
      data: { ...eventos[i], usuarioLogin: "organizador" },
    });
  }
  console.log(`${eventos.length} eventos/workshops de exemplo criados.`);
  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
