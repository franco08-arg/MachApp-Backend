module.exports = {
  openapi: "3.0.3",
  info: {
    title: "Mi primera API en express",
    version: "1.0.0",
    description: "Backend Developer Web",
  },
  paths: {
    "/api/saludo": {
      get: {
        tags: ["General"],
        summary: "Devuelve un saludo",
        responses: {
          200: {
            description: "Saludo devuelto correctamente",
            content: {
              "application/json": {
                example: { mensaje: "Hola desde mi API" },
              },
            },
          },
        },
      },
    },
    "/api/yo": {
      get: {
        tags: ["General"],
        summary: "Devuelve datos personales",
        responses: {
          200: {
            description: "Datos personales",
            content: {
              "application/json": {
                example: { nombre: "Ardey", carrera: "Ingeniería de Software" },
              },
            },
          },
        },
      },
    },
    "/api/edad/{anio}": {
      get: {
        tags: ["General"],
        summary: "Calcula la edad a partir del año de nacimiento",
        parameters: [
          {
            name: "anio",
            in: "path",
            required: true,
            description: "Año de nacimiento (entre 1900 y el año actual)",
            schema: { type: "integer", minimum: 1900 },
          },
        ],
        responses: {
          200: {
            description: "Edad calculada",
            content: {
              "application/json": {
                example: { anio: 2000, edad: 26 },
              },
            },
          },
          400: {
            description: "Año de nacimiento inválido",
            content: {
              "application/json": {
                example: { error: "El año de nacimiento debe ser un número válido" },
              },
            },
          },
        },
      },
    },
    "/api/estado": {
      get: {
        tags: ["General"],
        summary: "Devuelve el estado del servidor",
        responses: {
          200: {
            description: "Servidor activo",
            content: {
              "application/json": {
                example: { ok: true, estado: "activo", uptimeSegundos: 120 },
              },
            },
          },
        },
      },
    },
  },
};
