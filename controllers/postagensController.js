const { supabase } = require("../supabase");

// Controlador para postagens
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

  // Buscar uma postagem específica por "post_name"
  buscarPostagemPorNome: async (req, res) => {
    const { post_name } = req.params;

    try {
      const { data, error } = await supabase
        .from("postagem")
        .select("*")
        .eq("post_name", post_name)
        .single();

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Criar uma nova postagem
  criarPostagem: async (req, res) => {
    const { id, post_name, image, title, subtitle, text } = req.body;
    
    try {
      const { data, error } = await supabase
        .from("postagem")
        .insert([
          { id, post_name, image, title, subtitle, text },
        ]);

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Editar uma postagem existente por "post_name"
  editarPostagem: async (req, res) => {
    const { post_name } = req.params;
    const { image, title, subtitle, text } = req.body;

    // console.log("data", { post_name, image, title, subtitle, text })

    try {
      const { data, error } = await supabase
        .from("postagem")
        .update({ image, title, subtitle, text })
        .eq("post_name", post_name);

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar uma postagem por "post_name"
  deletarPostagem: async (req, res) => {
    const { post_name } = req.params;

    try {
      const { data, error } = await supabase
        .from("postagem")
        .delete()
        .eq("post_name", post_name);

      if (error) throw error;

      res.status(200).json({ message: "Postagem deletada com sucesso." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = postagensController;
