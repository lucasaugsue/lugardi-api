require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Importa o controller de postagens
const postagensController = require("./controllers/postagensController");

const app = express();
const port = process.env.PORT || 8181;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota para as postagens
app.get("/postagem", postagensController.listarPostagens);
app.get("/postagem/:post_name", postagensController.buscarPostagemPorNome);
app.post("/postagem", postagensController.criarPostagem);
app.put("/postagem/:post_name", postagensController.editarPostagem);
app.delete("/postagem/:post_name", postagensController.deletarPostagem);

// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
