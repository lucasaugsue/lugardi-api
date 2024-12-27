const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { supabase } = require("../supabase");

const usuariosController = {
  // Listar todos os usuários
  listarUsuarios: async (req, res) => {
    try {
      const { data, error } = await supabase.from("usuario").select("*");

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar um usuário por "uuid"
  buscarUsuarioPorUuid: async (req, res) => {
    const { uuid } = req.params;

    try {
      const { data, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("uuid", uuid)
        .single();

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Criar um novo usuário
  criarUsuario: async (req, res) => {
    const { first_name, last_name, birthday, email, password } = req.body;

    try {
        // Verifica se já existe um usuário com o mesmo e-mail
        const { data: existingUsers, error: checkError } = await supabase
            .from("usuario")
            .select("email")
            .eq("email", email);

        if (checkError) throw checkError;

        if (existingUsers && existingUsers.length > 0) {
            return res.status(400).json({ error: "Já tem um usuário com esse e-mail." });
        }

        // Gera um UUID aleatório
        const uuid = uuidv4();

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere no banco de dados
        const { data, error } = await supabase
            .from("usuario")
            .insert([
                { uuid, first_name, last_name, birthday, email, password: hashedPassword },
            ]);

        if (error) throw error;

        res.status(201).json({ message: "Usuário criado com sucesso." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  },

  // Editar um usuário existente por "uuid"
  editarUsuario: async (req, res) => {
    const { uuid } = req.params;
    const { first_name, last_name, birthday, email, password } = req.body;

    try {
      let updateData = { first_name, last_name, birthday, email };

      // Verifica se uma nova senha foi fornecida e a hasheia
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const { data, error } = await supabase
        .from("usuario")
        .update(updateData)
        .eq("uuid", uuid);

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar um usuário por "uuid"
  deletarUsuario: async (req, res) => {
    const { uuid } = req.params;

    try {
      const { data, error } = await supabase
        .from("usuario")
        .delete()
        .eq("uuid", uuid);

      if (error) throw error;

      res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Login do usuário
  loginUsuario: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { data, error } = await supabase
        .from("usuario")
        .select("email, password")
        .eq("email", email);
  
      if (error) throw error;
  
      // Verifica se nenhum dado foi retornado
      if (!data || data.length === 0) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }
  
      // Como a consulta retorna uma lista, selecionamos o primeiro registro
      const user = data[0];
  
      // Verifica se a senha corresponde ao hash armazenado
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }
  
      res.status(200).json({ message: "Login bem-sucedido." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = usuariosController;
