const examples = []; // Simulação de um banco de dados em memória

// Função para obter exemplos
exports.getExamples = (req, res) => {
  res.json({ success: true, data: examples });
};

// Função para criar um exemplo
exports.createExample = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "O campo 'name' é obrigatório." });
  }

  const newExample = { id: examples.length + 1, name };
  examples.push(newExample);
  res.status(201).json({ success: true, data: newExample });
};
