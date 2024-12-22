const { supabase } = require("../supabase");

// Função para listar todos os personagens
const listarPersonagens = async (req, res) => {
  try {
    const { data, error } = await supabase.from("personagem").select("*");

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para buscar um personagem específico pelo "personagem_tag"
const buscarPersonagem = async (req, res) => {
  const { personagem_tag } = req.params;

  try {
    const { data, error } = await supabase
      .from("personagem")
      .select("*")
      .eq("personagem_tag", personagem_tag)
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: "Personagem não encontrado." });
  }
};

// Função para criar um novo personagem
const criarPersonagem = async (req, res) => {
  const { personagem_tag, name, description, images, affiliations, skills, hobbies } = req.body;

  try {
    const { data, error } = await supabase.from("personagem").insert([
      {
        personagem_tag,
        name,
        description,
        images,
        affiliations,
        skills,
        hobbies,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      throw error;
    }

    res.status(201).json({ message: "Personagem criado com sucesso!", personagem: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para editar um personagem pelo "personagem_tag"
const editarPersonagem = async (req, res) => {
  const { personagem_tag } = req.params;
  const { name, description, images, affiliations, skills, hobbies } = req.body;

  try {
    const { data, error } = await supabase
      .from("personagem")
      .update({
        name,
        description,
        images,
        affiliations,
        skills,
        hobbies,
      })
      .eq("personagem_tag", personagem_tag);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "Personagem atualizado com sucesso!", personagem: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para deletar um personagem pelo "personagem_tag"
const deletarPersonagem = async (req, res) => {
  const { personagem_tag } = req.params;

  try {
    const { data, error } = await supabase
      .from("personagem")
      .delete()
      .eq("personagem_tag", personagem_tag);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "Personagem deletado com sucesso!", personagem: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarPersonagens,
  buscarPersonagem,
  criarPersonagem,
  editarPersonagem,
  deletarPersonagem,
};
