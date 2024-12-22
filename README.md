# Minha API

Uma API simples feita com Node.js e Express.

## Índice

- [Descrição](#descri%C3%A7%C3%A3o)
- [Pré-requisitos](#pr%C3%A9-requisitos)
- [Instalação](#instala%C3%A7%C3%A3o)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-dispon%C3%ADveis)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuindo](#contribuindo)
- [Licença](#licen%C3%A7a)

---

## Descrição

Esta é uma API básica criada com o objetivo de fornecer endpoints para interações simples. É fácil de expandir e modificar para atender às suas necessidades.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente incluído com o Node.js)

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/minha-api.git
   cd minha-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente, como por exemplo:
   ```env
   PORT=3000
   DATABASE_URL=sua-url-do-banco
   ```

---

## Uso

### Modo de Desenvolvimento
Para rodar o servidor com o **nodemon** (reinicialização automática):
```bash
npm run dev
```

### Modo de Produção
Para rodar o servidor em produção:
```bash
npm start
```

Por padrão, o servidor será iniciado na porta configurada no arquivo `.env` (ou na porta 3000, se não especificado). Acesse em: `http://localhost:3000`

---

## Estrutura do Projeto

```plaintext
/minha-api
|-- index.js           # Arquivo principal
|-- .env               # Variáveis de ambiente
|-- package.json       # Configuração do projeto
|-- /routes            # Rotas da aplicação
|   |-- example.js     # Exemplo de rota
|-- /controllers       # Lógica de controle das rotas
|   |-- exampleController.js # Exemplo de controlador
|-- /node_modules      # Dependências (gerado pelo npm)
```

---

## Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor em modo de desenvolvimento com nodemon.
- **`npm start`**: Inicia o servidor em modo de produção.

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/): Plataforma de execução de JavaScript no lado do servidor.
- [Express](https://expressjs.com/): Framework para construção de APIs e aplicações web.
- [dotenv](https://www.npmjs.com/package/dotenv): Gerenciamento de variáveis de ambiente.
- [nodemon](https://nodemon.io/): Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.

---

## Contribuindo

1. Faça um fork do repositório
2. Crie um branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça as alterações necessárias e commit (`git commit -m 'Adiciona nova feature'`)
4. Envie para o branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

