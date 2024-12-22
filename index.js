require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8181;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
const exampleRoutes = require("./routes/example");
app.use("/api/example", exampleRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo à API!");
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});