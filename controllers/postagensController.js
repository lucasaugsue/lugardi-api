const { supabase } = require("../supabase");
const Postagem = require("../models/Postagem");

const postagensController = {
  // Listar todas as postagens
  listarPostagens: async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("postagem")
        .select("*");

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar uma postagem específica por "uuid"
  buscarPostagemPorUuid: async (req, res) => {
    const { uuid } = req.params;
    console.log("entrou na rota", uuid)

    try {
      const { data, error } = await supabase
        .from("postagem")
        .select("*")
        .eq("uuid", uuid)
        .single();

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Criar uma nova postagem
  criarPostagem: async (req, res) => {
    const { post_name, image, title, subtitle, text } = req.body;

    try {
      // Valida os dados usando a model
      const validationErrors = Postagem.validate({
        post_name,
        image,
        title,
        subtitle,
        text,
      });

      if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }

      // Cria o objeto da postagem usando a model
      const newPost = Postagem.create({
        post_name,
        image,
        title,
        subtitle,
        text,
      });

      const { data, error } = await supabase.from("postagem").insert(newPost);

      if (error) throw error;

      res.status(201).json({ message: "Postagem criada com sucesso." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Editar uma postagem existente por "uuid"
  editarPostagem: async (req, res) => {
    const { uuid } = req.params;
    const { image, title, subtitle, text, post_name } = req.body;

    try {
      // Valida os dados fornecidos
      const validationErrors = Postagem.validate({
        image,
        title,
        subtitle,
        text,
        post_name
      });

      if (validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }

      const updateData = { image, title, subtitle, text, post_name };

      const { data, error } = await supabase
        .from("postagem")
        .update(updateData)
        .eq("uuid", uuid);

      if (error) throw error;

      res.status(200).json({ message: "Postagem editada com sucesso." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar uma postagem por "uuid"
  deletarPostagem: async (req, res) => {
    const { uuid } = req.params;

    try {
      const { data, error } = await supabase
        .from("postagem")
        .delete()
        .eq("uuid", uuid);

      if (error) throw error;

      res.status(200).json({ message: "Postagem deletada com sucesso." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = postagensController;
