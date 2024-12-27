const { supabase } = require("../supabase");
const Personagem = require("../models/Personagem"); // Importando a model

const personagensController = {

  // Função para listar todos os personagens
  listarPersonagens: async (req, res) => {
    try {
      const { data, error } = await supabase.from("personagem").select("*");

      if (error) {
        throw error;
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Função para buscar um personagem específico pelo "uuid"
  buscarPersonagem: async (req, res) => {
    const { uuid } = req.params;

    try {
      const { data, error } = await supabase
        .from("personagem")
        .select("*")
        .eq("uuid", uuid)
        .single();

      if (error) {
        throw error;
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ error: "Personagem não encontrado." });
    }
  },

  // Função para criar um novo personagem
  criarPersonagem: async (req, res) => {
    const { personagem_tag, name, description, images, affiliations, skills, hobbies } = req.body;

    // Criando o objeto com base na model
    const novoPersonagem = Personagem.create({
      personagem_tag,
      name,
      description,
      images,
      affiliations,
      skills,
      hobbies,
    });

    // Validando o objeto criado
    const validationErrors = Personagem.validate(novoPersonagem);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    try {
      const { data, error } = await supabase.from("personagem").insert([novoPersonagem]);

      if (error) {
        throw error;
      }

      res.status(201).json({ message: "Personagem criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Função para editar um personagem pelo "uuid"
  editarPersonagem: async (req, res) => {
    const { uuid } = req.params;
    const { personagem_tag, name, description, images, affiliations, skills, hobbies } = req.body;

    // Validando os dados fornecidos
    const validationErrors = Personagem.validate({
      personagem_tag,
      name,
      description,
      images,
      affiliations,
      skills,
      hobbies,
    });

    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    try {
      const { data, error } = await supabase
        .from("personagem")
        .update({
          personagem_tag,
          name,
          description,
          images,
          affiliations,
          skills,
          hobbies,
        })
        .eq("uuid", uuid);

      if (error) {
        throw error;
      }

      res.status(200).json({ message: "Personagem atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Função para deletar um personagem pelo "uuid"
  deletarPersonagem: async (req, res) => {
    const { uuid } = req.params;

    try {
      const { data, error } = await supabase
        .from("personagem")
        .delete()
        .eq("uuid", uuid);

      if (error) {
        throw error;
      }

      res.status(200).json({ message: "Personagem deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = personagensController;
