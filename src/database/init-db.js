// Carrega as variáveis do arquivo .env
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

// Importa a conexão com o banco de dados
const db = require('../config/db');

async function inicializarBanco() {
    try {
        console.log('Iniciando a configuração das tabelas da FastLibrary...');

        // 1. TABELA DE LIVROS
        const sqlLivros = `
            CREATE TABLE IF NOT EXISTS livros (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                autor VARCHAR(255) NOT NULL,
                ano_publicacao INT,
                status VARCHAR(50) DEFAULT 'disponível'
            );
        `;
        await db.query(sqlLivros);
        console.log('Tabela "livros" configurada!');

        // 2. TABELA DE USUÁRIOS (Para separar Estudante de Bibliotecário)
        const sqlUsuarios = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                senha VARCHAR(255) NOT NULL,
                cargo VARCHAR(50) DEFAULT 'estudante'
            );
        `;
        await db.query(sqlUsuarios);
        console.log('Tabela "usuarios" configurada! ');

        // 3. TABELA DE EMPRÉSTIMOS (O controle de prazos do Admin)
        const sqlEmprestimos = `
            CREATE TABLE IF NOT EXISTS emprestimos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_usuario INT,
                id_livro INT,
                data_emprestimo DATETIME DEFAULT CURRENT_TIMESTAMP,
                data_devolucao DATETIME NOT NULL,
                status VARCHAR(50) DEFAULT 'ativo',
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
                FOREIGN KEY (id_livro) REFERENCES livros(id) ON DELETE CASCADE
            );
        `;
        await db.query(sqlEmprestimos);
        console.log('Tabela "emprestimos" configurada com sucesso!');

    } catch (error) {
        console.error('Erro ao inicializar o banco de dados', error.message);
        process.exitCode = 1; // Define o código de erro sem derrubar o processo antes da hora
    } finally {
        // Fecha o pool de conexões corretamente após tudo rodar (ou falhar)
        if (db && typeof db.end === 'function') {
            await db.end();
            console.log('Conexão com o banco encerrada com segurança.');
        }
    }
}

inicializarBanco();