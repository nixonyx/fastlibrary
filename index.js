//importar o express 
const express = require('express')

//criação  do app express
const app = express()

//porta do servidor
const PORT = 3000;

//rota de caminho do servidor
app.get('/', (req, res) => {
    res.send('Servidor FastLibrary está rodando com sucesso!');
});

//ligando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}! Acesse: http://localhost:${PORT}`);
});