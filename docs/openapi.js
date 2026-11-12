const { response } = require("express");

module.exports = {
  openapi: "3.0.3",
  info: {
    title: "Mi primera API en express",
    version: "1.0.0",
    description: "Backend Developer Web"
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
                example: {
                  mensaje: "Hola desde mi API"
                }
              }
            }
          }
        }
      }
    }
  }
};