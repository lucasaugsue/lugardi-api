require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Importa os controllers
const postagensController = require("./controllers/postagensController");
const personagensController = require("./controllers/personagensController");
const usuariosController = require("./controllers/usuariosController");

const app = express();
const port = process.env.PORT || 8181;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Middleware para log das requisições
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    console.log(`Rota chamada: ${req.method} ${req.originalUrl}; status: ${res.statusCode}`);
    originalSend.call(this, body);
  };

  next();
});

// Rotas para as postagens
app.get("/postagem", postagensController.listarPostagens);
app.get("/postagem/:uuid", postagensController.buscarPostagemPorUuid);
app.post("/postagem", postagensController.criarPostagem);
app.put("/postagem/:uuid", postagensController.editarPostagem);
app.delete("/postagem/:uuid", postagensController.deletarPostagem);

// Rotas para os personagens
app.get("/personagem", personagensController.listarPersonagens);
app.get("/personagem/:uuid", personagensController.buscarPersonagem);
app.post("/personagem", personagensController.criarPersonagem);
app.put("/personagem/:uuid", personagensController.editarPersonagem);
app.delete("/personagem/:uuid", personagensController.deletarPersonagem);

// Rotas para os usuários
app.get("/usuario", usuariosController.listarUsuarios);
app.get("/usuario/:uuid", usuariosController.buscarUsuarioPorUuid);
app.post("/usuario", usuariosController.criarUsuario); 
app.put("/usuario/:uuid", usuariosController.editarUsuario);
app.delete("/usuario/:uuid", usuariosController.deletarUsuario);
app.put("/login", usuariosController.loginUsuario); 

// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
