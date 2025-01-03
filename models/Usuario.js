const Usuario = {
  schema: {
    id: "integer", // Não será validado no método create
    uuid: "string",
    first_name: "string",
    last_name: "string",
    birthday: "date",
    email: "string",
    password: "string",
    created_at: "timestamp"
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
      if (this.schema[key] === "date" && isNaN(new Date(data[key]).getTime())) {
        errors.push(`${key} deve ser uma data válida.`);
      }
    });

    return errors.length > 0 ? errors : null;
  },

  /**
   * Cria um novo objeto com os dados fornecidos e valores padrão.
   */
  create(data) {
    return {
      uuid: data.uuid || null,
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      birthday: data.birthday || null,
      email: data.email || "",
      password: data.password || "",
      created_at: new Date()
    };
  },
};

module.exports = Usuario;
