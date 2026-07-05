import express from "express";
import cors from "cors";
import db from "./db.js";
import session from "express-session";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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


const verificarLogin = (req, res, next) => {

<<<<<<< HEAD
    console.log("Sessão recebida:", req.session);

    if (req.session.usuario) {
=======
    console.log("==============");
    console.log("SessionID:", req.sessionID);
    console.log("Cookies:", req.headers.cookie);
    console.log("Sessão:", req.session);
    console.log("==============");

    if (req.session.userId) {
>>>>>>> c187ec6171bad7aad79aeac55051170053c437e8
        return next();
    }

    return res.status(401).json({
        error: "Usuário não autenticado"
    });
};
<<<<<<< HEAD
=======


>>>>>>> c187ec6171bad7aad79aeac55051170053c437e8

// rota cadastro usuario
app.post("/cadastrousuario", async (req, res) => {
 
    try {
 
        const sql = `
            INSERT INTO cadastro_cliente
            (nomecompleto, email, senha)
            VALUES(?)
        `;
 
        const hash = await bcrypt.hash(req.body.password, 10);
 
        const valores = [
            req.body.name.trim(),
            req.body.email.toLowerCase().trim(),
            hash
        ];
 
        db.query(sql, [valores], (err, data) => {
 
            if (err) {
                console.log(err);
 
                return res.status(500).json({
                    error: "Erro ao cadastrar"
                });
            }
 
            return res.json({
                success: true,
                message: "Usuário cadastrado com sucesso"
            });
 
        });
 
    } catch (err) {
 
        console.log(err);
 
        return res.status(500).json({
            error: "Erro interno"
        });
 
    }
 
});


// rota cadastro adm
app.post("/cadastroadm", async (req, res) => {
 
    try {
 
        const sql = `INSERT INTO cadastro_adm (nomecompletoadm, emailadm, senhaadm) VALUES(?)`;
 
        const name = req.body.name.trim();
        const email = req.body.email.toLowerCase().trim();
        const password = req.body.password.trim();


        const hash = await bcrypt.hash(req.body.password, 10);

 
        db.query(sql, [name, email, hash], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Erro ao cadastrar" });
            }

            return res.json({ message: "Administrador cadastrado com sucesso" });
        });
 
    } catch {
        return res.status(500).json({ error: "Erro interno" });
    }
 
});



<<<<<<< HEAD
=======

//READ LOGIN USUARIO
>>>>>>> c187ec6171bad7aad79aeac55051170053c437e8
// READ LOGIN USUARIO
app.post("/loginusuario", (req, res) => {

    const sql = "SELECT * FROM cadastro_cliente WHERE email = ?";

<<<<<<< HEAD
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

=======
    db.query(sql, [req.body.email], async (err, data) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                error: "Erro no login"
            });
        }

        if (data.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Email ou senha inválidos"
            });
        }

        const usuario = data[0];

        const senhaCorreta = await bcrypt.compare(
            req.body.password,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                success: false,
                message: "Email ou senha inválidos"
            });
        }

        // Salva os dados na sessão
        req.session.userId = usuario.id_cliente;
        req.session.username = usuario.nomecompleto;

        // Apenas para teste
        console.log("Usuário:", usuario);
        console.log("Sessão criada:", req.session);

        return res.json({
            success: true,
            name: usuario.nomecompleto
>>>>>>> c187ec6171bad7aad79aeac55051170053c437e8
        });

    });

});



// READ LOGIN ADM
app.post("/loginadm", (req, res) => {
 
    const sql =
        "SELECT * FROM cadastro_adm WHERE emailadm = ?";
 
    db.query(sql, [req.body.email], async (err, data) => {
 
        if (err) return res.status(500).json({ error: "Erro no login" });
 
        if (data.length === 0) {
            return res.status(401).json({ error: "Email ou senha inválidos" });
        }
 
        const match = await bcrypt.compare(password, data[0].password);
 
        if (!match) { 
            return res.status(401).json({  error: "Email ou senha inválidos" });
        }
 
        req.session.username = data[0].nomecompletoadm;
 
        return res.json({
            message: "Login realizado com sucesso",
            name: data[0].nomecompletoadm
        });
    });
});

// rota de agendamento
app.post("/agendamentos", verificarLogin, (req, res) => {

<<<<<<< HEAD
    console.log("============ POST AGENDAMENTO ===========");
    console.log("SESSION:", req.session);
    console.log("COOKIE:", req.headers.cookie);
=======
    const id_cliente = req.session.userId;
>>>>>>> c187ec6171bad7aad79aeac55051170053c437e8

    const {
    data_consulta,
    horario_consulta
    } = req.body;
<<<<<<< HEAD

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
=======

    console.log("Usuário logado:", id_cliente);
    console.log(req.body);

    const sql = `
    INSERT INTO agendamento
    (id_cliente, data_consulta, horario_consulta)
    VALUES (?, ?, ?)
`;
>>>>>>> c187ec6171bad7aad79aeac55051170053c437e8

    db.query(
        sql,
        [id_cliente, data_consulta, horario_consulta],
        (err, result) => {

            if (err) {
<<<<<<< HEAD
                console.log("Erro MySQL:", err);
=======
                console.log("ERRO DO MYSQL:");
                console.log(err);
>>>>>>> c187ec6171bad7aad79aeac55051170053c437e8
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

