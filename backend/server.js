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
    console.log("BODY:", req.body);

    const sql = "INSERT INTO cadastro_cliente(nomecompleto, email, senha) VALUES(?)";

    const valores = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    console.log("VALORES:", valores);

    db.query(sql, [valores], (err, data) => {
        if (err) {
            console.log("ERRO MYSQL:", err);
            return res.status(500).json({ error: "Erro ao cadastrar" });
        }

        return res.json(data);
    });
});




app.listen(7006, () => {
    console.log("Servidor rodando na porta 7006");
})

