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

// 1. Ruta de saludo
app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola desde mi API" });
});

// 2. Ruta de información personal
app.get("/api/yo", (req, res) => {
  res.json({
    nombre: "Ardey",
    carrera: "Ingeniería de Software"
  });
});

// 3. Ruta con parámetro para calcular edad
app.get("/api/edad/:anio", (req, res) => {
  const anio = Number(req.params.anio);
  const anioActual = new Date().getFullYear();

  if (!Number.isInteger(anio) || anio < 1900 || anio > anioActual) {
    return res.status(400).json({ error: "El año de nacimiento debe ser un número válido" });
  }

  res.json({
    anio,
    edad: anioActual - anio
  });
});

// 4. Ruta de estado del servidor
app.get("/api/estado", (req, res) => {
  res.json({
    ok: true,
    estado: "activo",
    uptimeSegundos: Math.floor(process.uptime())
  });
});

// Ruta no encontrada (debe ir después de todas las rutas)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));