const express = require("express");
const router = express.Router();
const { getExamples, createExample } = require("../controllers/exampleController");

// Rota para obter dados
router.get("/", getExamples);

// Rota para criar um novo dado
router.post("/", createExample);

module.exports = router;
