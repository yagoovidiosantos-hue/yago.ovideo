const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.urlencoded({ extended: true }));

// conecta no banco
const db = new sqlite3.Database('./yago.db');

// rota principal (abre o HTML)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// rota pra salvar dados
app.post('/salvar', (req, res) => {
  const { nome, telefone, email } = req.body;

  const sql = `INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)`;

  db.run(sql, [nome, telefone, email], function(err) {
    if (err) {
      return res.send("Erro: " + err.message);
    }

    res.send(`
      <h1>Sucesso!</h1>
      <p>Contato salvo no banco.</p>
      <a href="/">Voltar</a>
    `);
  });
});

// inicia servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});