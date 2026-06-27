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
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true
    }
}));


//middleware de autenticação
const verificarLogin = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
}

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



//READ LOGIN USUARIO
app.post("/loginusuario", (req, res) => {

    const email = req.body.email.toLowerCase().trim();
    const senha = req.body.password.trim();


    const sql ="SELECT * FROM cadastro_cliente WHERE email = ? AND senha = ?";
    console.log(email);
    console.log(senha);

    db.query(sql, [email, senha], async (err, data) => {
      
        console.log("Resultado:", data)

        if (err) return res.status(500).json({ error: "Erro no login" }); 
        

        if (data.length === 0) {
            return res.status(401).json({ error: "Email ou senha inválidos" })
        }
        console.log(data[0]);
        

       req.session.username = data[0].nomecompleto;

        return res.json({
            message: "Login realizado com sucesso",
            nomecompleto: data[0].nomecompleto
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
    const {
        id_cliente,
        id_adm,
        data_consulta,
        horario_consulta
    } = req.body;
    console.log(req.body);

    const sql = `INSERT INTO agendamento (id_cliente, id_adm, data_consulta, horario_consulta) VALUES (?, ?, ?, ?)`;

    db.query(
        sql,
        [id_cliente, id_adm, data_consulta, horario_consulta],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Agendamento criado com sucesso"
            });
        }
    );
});


app.get("/agendamentos/:data", verificarLogin, (req, res) => {

    const { data } = req.params;

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
    if (req.session.username) {
        return res.json({
            valid: true,
            name: req.session.username
        });
    } else {
        return res.json({
            valid: false
        });
    }
});



app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})

