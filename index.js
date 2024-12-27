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
app.get("/postagem/:post_name", postagensController.buscarPostagemPorNome);
app.post("/postagem", postagensController.criarPostagem);
app.put("/postagem/:post_name", postagensController.editarPostagem);
app.delete("/postagem/:post_name", postagensController.deletarPostagem);

// Rotas para os personagens
app.get("/personagem", personagensController.listarPersonagens);
app.get("/personagem/:personagem_tag", personagensController.buscarPersonagem);
app.post("/personagem", personagensController.criarPersonagem);
app.put("/personagem/:personagem_tag", personagensController.editarPersonagem);
app.delete("/personagem/:personagem_tag", personagensController.deletarPersonagem);

// Rotas para os usuários
app.get("/usuario", usuariosController.listarUsuarios); // Lista todos os usuários
app.get("/usuario/:uuid", usuariosController.buscarUsuarioPorUuid); // Busca um usuário por UUID
app.post("/usuario", usuariosController.criarUsuario); // Cria um novo usuário
app.put("/usuario/:uuid", usuariosController.editarUsuario); // Atualiza um usuário por UUID
app.delete("/usuario/:uuid", usuariosController.deletarUsuario); // Deleta um usuário por UUID
app.put("/login", usuariosController.loginUsuario); // Login do usuário


// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
