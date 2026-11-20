const { createHash } = require("node:crypto");
const prisma = require("./prisma.js");

const usuarios = [
  {
    nombres: "Ana Lucía",
    apellidos: "Quispe Rojas",
    dni: "71234561",
    fecha_nacimiento: new Date("1999-05-14T00:00:00Z"),
    email: "ana.quispe@ejemplo.com",
    password_hash: "$demo$hash_ejemplo_12345",
    role: "user",
    terms_accepted_at: new Date("2026-11-19T09:00:00Z"),
    email_verified: true,
  },
  {
    nombres: "Carlos Eduardo",
    apellidos: "Mendoza Huamán",
    dni: "72345672",
    fecha_nacimiento: new Date("1997-08-22T00:00:00Z"),
    email: "carlos.mendoza@ejemplo.com",
    password_hash: "$demo$hash_ejemplo_12345",
    role: "user",
    terms_accepted_at: new Date("2026-11-19T09:05:00Z"),
    email_verified: false,
  },
  {
    nombres: "Valeria Sofía",
    apellidos: "Flores Paredes",
    dni: "73456783",
    fecha_nacimiento: new Date("2000-01-10T00:00:00Z"),
    email: "valeria.flores@ejemplo.com",
    password_hash: "$demo$hash_ejemplo_12345",
    role: "user",
    terms_accepted_at: new Date("2026-11-19T09:10:00Z"),
    email_verified: true,
  },
  {
    nombres: "Diego Alonso",
    apellidos: "Salazar Torres",
    dni: "74567894",
    fecha_nacimiento: new Date("1998-11-03T00:00:00Z"),
    email: "diego.salazar@ejemplo.com",
    password_hash: "$demo$hash_ejemplo_12345",
    role: "user",
    terms_accepted_at: new Date("2026-11-19T09:15:00Z"),
    email_verified: true,
  },
  {
    nombres: "María Fernanda",
    apellidos: "Castillo Vega",
    dni: "75678905",
    fecha_nacimiento: new Date("2001-03-27T00:00:00Z"),
    email: "maria.castillo@ejemplo.com",
    password_hash: "$demo$hash_ejemplo_12345",
    role: "user",
    terms_accepted_at: new Date("2026-11-19T09:20:00Z"),
    email_verified: false,
  },
];

const interacciones = [
  ["ana.quispe@ejemplo.com", "carlos.mendoza@ejemplo.com"],
  ["ana.quispe@ejemplo.com", "valeria.flores@ejemplo.com"],
  ["carlos.mendoza@ejemplo.com", "valeria.flores@ejemplo.com"],
  ["diego.salazar@ejemplo.com", "ana.quispe@ejemplo.com"],
  ["valeria.flores@ejemplo.com", "diego.salazar@ejemplo.com"],
  ["maria.castillo@ejemplo.com", "diego.salazar@ejemplo.com"],
];

const parejas = [
  ["ana.quispe@ejemplo.com", "carlos.mendoza@ejemplo.com"],
  ["carlos.mendoza@ejemplo.com", "valeria.flores@ejemplo.com"],
  ["diego.salazar@ejemplo.com", "valeria.flores@ejemplo.com"],
];

const conversaciones = [
  {
    pareja: ["ana.quispe@ejemplo.com", "carlos.mendoza@ejemplo.com"],
    mensajes: [
      ["ana.quispe@ejemplo.com", "¡Hola Carlos! Me gustó tu perfil", "2026-11-19T10:00:00Z"],
      ["carlos.mendoza@ejemplo.com", "¡Hola Ana! Gracias, igualmente", "2026-11-19T10:02:00Z"],
      ["carlos.mendoza@ejemplo.com", "¿Te gustaría tomar un café?", "2026-11-19T10:03:00Z"],
    ],
  },
  {
    pareja: ["carlos.mendoza@ejemplo.com", "valeria.flores@ejemplo.com"],
    mensajes: [
      ["carlos.mendoza@ejemplo.com", "Hola Valeria, ¿cómo estás?", "2026-11-19T11:00:00Z"],
      ["valeria.flores@ejemplo.com", "Hola Carlos, muy bien ¿y tú?", "2026-11-19T11:01:00Z"],
    ],
  },
  {
    pareja: ["diego.salazar@ejemplo.com", "valeria.flores@ejemplo.com"],
    mensajes: [
      ["diego.salazar@ejemplo.com", "¡Hola! Encantado de conocerte", "2026-11-19T12:00:00Z"],
      ["valeria.flores@ejemplo.com", "¡Hola Diego! El gusto es mío", "2026-11-19T12:05:00Z"],
    ],
  },
];

async function main() {
  const usuariosGuardados = [];

  for (const usuario of usuarios) {
    const guardado = await prisma.user.upsert({
      where: { email: usuario.email },
      update: usuario,
      create: usuario,
    });
    usuariosGuardados.push(guardado);
  }

  const porEmail = new Map(usuariosGuardados.map((usuario) => [usuario.email, usuario]));
  const idDe = (email) => porEmail.get(email).id;

  for (const usuario of usuariosGuardados) {
    const token_hash = createHash("sha256").update(`demo-token:${usuario.email}`).digest("hex");
    await prisma.emailVerificationToken.upsert({
      where: { token_hash },
      update: {
        user_id: usuario.id,
        used_at: usuario.email_verified ? usuario.terms_accepted_at : null,
        expires_at: new Date("2027-11-19T09:00:00Z"),
      },
      create: {
        token_hash,
        user_id: usuario.id,
        expires_at: new Date("2027-11-19T09:00:00Z"),
        used_at: usuario.email_verified ? usuario.terms_accepted_at : null,
      },
    });
  }

  for (const [origen, destino] of interacciones) {
    const user_id = idDe(origen);
    const target_user_id = idDe(destino);
    await prisma.interaction.upsert({
      where: {
        user_id_target_user_id_type: { user_id, target_user_id, type: "like" },
      },
      update: {},
      create: { user_id, target_user_id, type: "like" },
    });
  }

  for (const [correo1, correo2] of parejas) {
    const [user1_id, user2_id] = [idDe(correo1), idDe(correo2)].sort((a, b) => a - b);
    await prisma.match.upsert({
      where: { user1_id_user2_id: { user1_id, user2_id } },
      update: {},
      create: { user1_id, user2_id },
    });
  }

  for (const conversacion of conversaciones) {
    const [correo1, correo2] = conversacion.pareja;
    const [user1_id, user2_id] = [idDe(correo1), idDe(correo2)].sort((a, b) => a - b);
    const match = await prisma.match.findUnique({
      where: { user1_id_user2_id: { user1_id, user2_id } },
    });

    const total = await prisma.message.count({ where: { match_id: match.id } });
    if (total > 0) {
      continue;
    }

    await prisma.message.createMany({
      data: conversacion.mensajes.map(([email, content, created_at]) => ({
        match_id: match.id,
        sender_id: idDe(email),
        content,
        created_at: new Date(created_at),
      })),
    });
  }

  const conteos = {
    users: await prisma.user.count(),
    emailVerificationTokens: await prisma.emailVerificationToken.count(),
    interactions: await prisma.interaction.count(),
    matches: await prisma.match.count(),
    messages: await prisma.message.count(),
  };
  console.log("Datos registrados:", conteos);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
