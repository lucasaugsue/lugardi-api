const { v4: uuidv4 } = require("uuid");

const Personagem = {
  schema: {
    id: "integer", // Não será validado no método create
    uuid: "string",
    personagem_tag: "string",
    name: "string",
    description: "string",
    images: "string",
    affiliations: "string",
    skills: "string",
    hobbies: "string",
    created_at: "timestamp",
  },

  /**
   * Valida se os dados fornecidos estão de acordo com o schema.
   */
  validate(data) {
    const errors = [];

    Object.keys(this.schema).forEach((key) => {
      // Ignora campos opcionais não fornecidos
      if (data[key] === undefined) return;

      if (this.schema[key] === "string" && typeof data[key] !== "string") {
        errors.push(`${key} deve ser uma string.`);
      }
      if (this.schema[key] === "integer" && typeof data[key] !== "number") {
        errors.push(`${key} deve ser um número.`);
      }
      if (this.schema[key] === "timestamp" && isNaN(new Date(data[key]).getTime())) {
        errors.push(`${key} deve ser um timestamp válido.`);
      }
    });

    return errors.length > 0 ? errors : null;
  },

  /**
   * Cria um novo objeto com os dados fornecidos e valores padrão.
   */
  create(data) {
    return {
      uuid: data.uuid || uuidv4(), // Gera um UUID automaticamente, se não fornecido
      personagem_tag: data.personagem_tag || "",
      name: data.name || "",
      description: data.description || "",
      images: data.images || "",
      affiliations: data.affiliations || "",
      skills: data.skills || "",
      hobbies: data.hobbies || "",
      created_at: new Date().toISOString(), // Adiciona a data de criação automaticamente
    };
  },
};

module.exports = Personagem;
