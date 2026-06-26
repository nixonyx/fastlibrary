const mysql = require('mysql2');

const pool =  mysql.createPool({
    host: process.env.DB_HOST, //coleta o localhost do arquivo .env
    user: process.env.DB_USER, //coleta o root do .env
    password: process.env.DB_PASSWORD, //coleta senha vazia do .env
    database: process.env.DB_NAME, //coleta o database fastlibrary_db do .env

    waitForConnections: true, //se as vagas estiverem cheias, esperar
    connectionLimit: 10,
    queueLimit: 0
})

const promisePool = pool.promise();

promisePool.query('SELECT 1')
    .then(() => console.log('Conexão com banco de dados MySQL realizado com sucesso'))
    .catch((err) => console.error('Erro ao conectar no MySQL:', err.message));

module.exports = promisePool;
