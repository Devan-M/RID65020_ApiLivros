const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let livros = [
  { id: 1, titulo: "Livro A", autor: "Autor A" },
  { id: 2, titulo: "Livro B", autor: "Autor B" }
];

// Listar todos os livros
app.get('/livros', (req, res) => res.json(livros));

// Buscar livro por ID
app.get('/livros/:id', (req, res) => {
  const livro = livros.find(l => l.id == req.params.id);
  livro ? res.json(livro) : res.status(404).send("Livro não encontrado");
});

// Criar novo livro com ID fornecida pelo frontend
app.post('/livros', (req, res) => {
  const { id, titulo, autor } = req.body;

  if (!id || !titulo || !autor) {
    return res.status(400).send("Campos obrigatórios: id, titulo, autor");
  }

  const existe = livros.find(l => l.id == id);
  if (existe) {
    return res.status(409).send("ID já existe");
  }

  const novoLivro = { id, titulo, autor };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

// Atualizar livro existente
app.put('/livros/:id', (req, res) => {
  const index = livros.findIndex(l => l.id == req.params.id);
  if (index !== -1) {
    livros[index] = { id: livros[index].id, ...req.body };
    res.json(livros[index]);
  } else {
    res.status(404).send("Livro não encontrado");
  }
});

// Remover livro por ID
app.delete('/livros/:id', (req, res) => {
  livros = livros.filter(l => l.id != req.params.id);
  res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));