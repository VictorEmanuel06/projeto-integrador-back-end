import express from "express";
import cors from "cors";
import db from "./db.js";
import session from "express-session";
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "PUT"],
    credentials: true
}));
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax" // 🔥 ESSENCIAL pro localhost
    }
}));


//middleware de autenticação
const verificarLogin = (req, res, next) => {

    console.log("Sessão recebida:", req.session);

    if (req.session.usuario) {
        return next();
    }

    return res.status(401).json({
        error: "Usuário não autenticado"
    });
};

// rota cadastro usuario
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


// rota cadastro adm
app.post("/cadastroadm", (req, res) => {
    console.log("BODY:", req.body);

    const sql = "INSERT INTO cadastro_adm(nomecompletoadm, emailadm, senhaadm) VALUES(?)";

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



// READ LOGIN USUARIO
app.post("/loginusuario", (req, res) => {

    const email = req.body.email.toLowerCase().trim();
    const senha = req.body.password.trim();

    const sql = "SELECT * FROM cadastro_cliente WHERE email = ? AND senha = ?";

    console.log(email);
    console.log(senha);

    db.query(sql, [email, senha], (err, data) => {

        console.log("Resultado:", data);

        if (err) {
            return res.status(500).json({ error: "Erro no login" });
        }

        if (data.length === 0) {
            return res.status(401).json({ error: "Email ou senha inválidos" });
        }

        console.log(data[0]);

        // Salva os dados do usuário na sessão
        req.session.usuario = {
            id: data[0].id_cliente,
            nomecompleto: data[0].nomecompleto
        };

        // Salva a sessão antes de responder
        req.session.save((err) => {

            if (err) {
                return res.status(500).json({
                    error: "Erro ao salvar sessão"
                });
            }

            return res.json({
                message: "Login realizado com sucesso",
                id: data[0].id_cliente,
                nomecompleto: data[0].nomecompleto
            });

        });

    });

});



// READ LOGIN ADM
app.post("/loginadm", (req, res) => {
    const sql =
       "SELECT * FROM cadastro_adm WHERE emailadm = ? AND senhaadm = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).json({ 
                error: "Erro no login"
            });
            
        }
        console.log(req.body);
        console.log(data);

        if(data.length > 0) {

            req.session.username = 
              data[0].nomecompleto;

            return res.json({
                success: true,
                name: data[0].nomecompleto
            });
        } 
            return res.json({
                success: false
         });
        }
    );
});

// rota de agendamento
app.post("/agendamentos", verificarLogin, (req, res) => {

    console.log("============ POST AGENDAMENTO ===========");
    console.log("SESSION:", req.session);
    console.log("COOKIE:", req.headers.cookie);

    const {
        id_cliente,
        id_adm,
        data_consulta,
        horario_consulta
    } = req.body;

    console.log({
        id_cliente,
        id_adm,
        data_consulta,
        horario_consulta
    });

    const sql = `
        INSERT INTO agendamento
        (id_cliente, id_adm, data_consulta, horario_consulta)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [id_cliente, id_adm, data_consulta, horario_consulta],
        (err, result) => {

            if (err) {
                console.log("Erro MySQL:", err);
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Agendamento criado com sucesso"
            });
        }
    );
});



// Rota get agendamentos
app.get("/agendamentos/:data", verificarLogin, (req, res) => {

    const { data } = req.params;
    console.log("SESSION GET:", req.session);
   console.log("COOKIE GET:", req.headers.cookie);

    const sql = `
        SELECT horario_consulta
        FROM agendamento
        WHERE data_consulta = ?
        AND status_agendamento = 'AGENDADO'
    `;

    db.query(sql, [data], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


// verifica sessão - via get
app.get("/", (req, res) => {

    console.log("Sessão na rota /:", req.session);

    if (req.session.username) {
        return res.json({
            valid: true,
            name: req.session.username
        });
    }

    return res.json({
        valid: false
    });
});



app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})

