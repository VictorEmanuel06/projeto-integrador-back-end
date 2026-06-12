import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

app.post("/cadastrousuario", (req, res) => {
    const { nome, email, senha } = req.body;

    const sql = "INSERT INTO cadastro_cliente (nome, email, password) VALUES(?)";

    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({ message: "Usuário cadastrado com sucesso!" });
    });
});




app.listen(7006, () => {
    console.log("Servidor rodando na porta 7006");
})

