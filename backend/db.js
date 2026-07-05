import mysql from "mysql";
import 'dotenv/config';

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco:", err);
        return;
    }

    console.log("Banco de dados conectado com sucesso!");
});

export default db;