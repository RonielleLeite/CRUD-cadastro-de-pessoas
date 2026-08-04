// Importa bibliotecas
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors()); // Permite acesso do front-end
app.use(express.json()); // Lê dados JSON enviados no corpo da requisição

// Conexão com o banco
let db;
(async () => {
  db = await open({
    filename: "./database.db", // Arquivo do banco
    driver: sqlite3.Database,
  });

  // Cria tabela se não existir
  await db.exec(`
    CREATE TABLE IF NOT EXISTS pessoas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      idade INTEGER,
      email TEXT
    )
  `);

  console.log("Banco conectado e tabela pronta!");
})();

// ---------------- ROTAS ---------------- //

// GET → listar todas as pessoas
app.get("/api/pessoas", async (req, res) => {
  const pessoas = await db.all("SELECT * FROM pessoas");
  res.json(pessoas);
});

// POST → adicionar nova pessoa
app.post("/api/pessoas", async (req, res) => {
  const { nome, idade, email } = req.body;
  await db.run("INSERT INTO pessoas (nome, idade, email) VALUES (?, ?, ?)", [
    nome,
    idade,
    email,
  ]);
  res.status(201).json({ message: "Pessoa adicionada com sucesso" });
});

// PUT → atualizar pessoa existente pelo ID
app.put("/api/pessoas/:id", async (req, res) => {
  const { id } = req.params; // pega o ID da URL
  const { nome, idade, email } = req.body; // pega os novos dados
  await db.run(
    "UPDATE pessoas SET nome = ?, idade = ?, email = ? WHERE id = ?",
    [nome, idade, email, id],
  );
  res.json({ message: "Pessoa atualizada com sucesso" });
});

// DELETE → excluir pessoa pelo ID
app.delete("/api/pessoas/:id", async (req, res) => {
  const { id } = req.params; // pega o ID da URL
  await db.run("DELETE FROM pessoas WHERE id = ?", [id]);
  res.json({ message: "Pessoa excluída com sucesso" });
});

// Inicializa servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
