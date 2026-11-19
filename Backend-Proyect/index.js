const express = require("express"); // forma clásica de importar express con node
const swaggerUi = require("swagger-ui-express");
const openapi = require("./docs/openapi.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Documentación de la API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// req (request), res (response), res.json (respuesta en formato JSON)
app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola desde mi API" });
});

app.get("/api/yo", (req, res) => {
  res.json({
    nombre: "Ardey",
    carrera: "Ingeniería de Software"
  });
});

app.get("/api/edad/:anio", (req, res) => {
  const Año = Number(req.params.anio);
  const añoActual = new Date().getFullYear();

  if (!Number.isInteger(Año) || Año < 1900 || Año > añoActual) {
    return res.status(400).json({ error: "El año de nacimiento debe ser un número válido" });
  }

  res.json({
    año: Año,
    edad: añoActual - Año
  });
});

// Ruta no encontrada (debe ir después de todas las rutas)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));