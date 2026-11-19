const prisma = require("./prisma.js");

async function main() {
  await prisma.user.createMany({
    data: [
      {
        nombres: "Ana Lucía",
        apellidos: "Quispe Rojas",
        dni: "71234561",
        fecha_nacimiento: new Date("1999-05-14T00:00:00"),
        email: "ana.quispe@ejemplo.com",
        password_hash: "hash_ejemplo_12345",
        role: "user",
        terms_accepted_at: new Date("2026-11-19T09:00:00"),
        email_verified: true,
      },
      {
        nombres: "Carlos Eduardo",
        apellidos: "Mendoza Huamán",
        dni: "72345672",
        fecha_nacimiento: new Date("1997-08-22T00:00:00"),
        email: "carlos.mendoza@ejemplo.com",
        password_hash: "hash_ejemplo_12345",
        role: "user",
        terms_accepted_at: new Date("2026-11-19T09:05:00"),
        email_verified: false,
      },
      {
        nombres: "Valeria Sofía",
        apellidos: "Flores Paredes",
        dni: "73456783",
        fecha_nacimiento: new Date("2000-01-10T00:00:00"),
        email: "valeria.flores@ejemplo.com",
        password_hash: "hash_ejemplo_12345",
        role: "user",
        terms_accepted_at: new Date("2026-11-19T09:10:00"),
        email_verified: true,
      },
      {
        nombres: "Diego Alonso",
        apellidos: "Salazar Torres",
        dni: "74567894",
        fecha_nacimiento: new Date("1998-11-03T00:00:00"),
        email: "diego.salazar@ejemplo.com",
        password_hash: "hash_ejemplo_12345",
        role: "user",
        terms_accepted_at: new Date("2026-11-19T09:15:00"),
        email_verified: true,
      },
      {
        nombres: "María Fernanda",
        apellidos: "Castillo Vega",
        dni: "75678905",
        fecha_nacimiento: new Date("2001-03-27T00:00:00"),
        email: "maria.castillo@ejemplo.com",
        password_hash: "hash_ejemplo_12345",
        role: "user",
        terms_accepted_at: new Date("2026-11-19T09:20:00"),
        email_verified: false,
      },
    ],
  });

  console.log("5 usuarios insertados correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());