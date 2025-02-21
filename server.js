const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const FILE_PATH = 'lista-itens.txt';

// Adiciona item ao arquivo
app.post('/adicionar', (req, res) => {
    const item = req.body.item;
    if (!item) return res.status(400).send("Item inválido");

    fs.appendFile(FILE_PATH, item + '\n', (err) => {
        if (err) return res.status(500).send("Erro ao salvar item");
        res.send("Item adicionado com sucesso");
    });
});

// Lê os itens do arquivo
app.get('/itens', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).send("Erro ao ler arquivo");
        res.send(data.split('\n').filter(Boolean));
    });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
