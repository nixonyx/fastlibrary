// carrega as variáveis do arquivo .env
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

// importação do pool de conexões do banco de dados no arquivo db.js
const db = require('../config/db');

// cria uma função assíncrona para rodar os comandos no banco de dados
async function inicializarBanco() {
    try {
        // mensagem no terminal avisando que o processo começou
        console.log('Criando tabelas no banco de dados...');

        //comando que cria a tabela se ela ainda não existir no MySQL
        const sqlLivros = `
            CREATE TABLE IF NOT EXISTS livros (
                id INT AUTO_INCREMENT PRIMARY KEY, -- ID único para cada livro
                titulo VARCHAR(255) NOT NULL,      -- Título do livro 
                autor VARCHAR(255) NOT NULL,       -- Autor do livro 
                ano_publicacao INT,                -- Ano que o livro foi lançado 
                status VARCHAR(50) DEFAULT 'disponível' -- Status padrão do livro ao ser cadastrado
            );
        `;

        // envia o comando SQL acima para o MySQL do XAMPP e aguarda (await) a execução terminar
        await db.query(sqlLivros);
        
        // se o comando rodar sem erros, exibe a mensagem de sucesso no terminal
        console.log('Tabela "livros" criada ou já existente com sucesso! ');

        // Encerra o script do Node com código 0 (sucesso absoluto)
        process.exit(0);
    } catch (error) {
        // se acontecer qualquer erro (XAMPP desligado, erro de sintaxe SQL, etc.), cai aqui
        console.error('Erro ao inicializar o banco de dados: ', error.message);
        
        // encerra o script com código 1 (indica que o programa fechou por causa de um erro)
        process.exit(1);
    }
}

// executa a função para o processo rodar de verdade
inicializarBanco();