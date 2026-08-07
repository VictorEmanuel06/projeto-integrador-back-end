import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from 'dotenv';
import authRoutes from "./src/routes/authRoutes.js";
import agendamentoRoutes from "./src/routes/agendamentoRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";


dotenv.config();

const app = express();

// Middlewares Globais
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "PUT", "DELETE"],
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
      sameSite: "lax"
    }
}));



app.get("/verificar-login", (req, res) => {
  if (req.session.username) {
    return res.json({ logado: true });
  }
  return res.json({ logado: false });
});
 
 
//rota de logout
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao encerrar sessão"});
        }
        res.clearCookie("connect.sid"); //nome padrão do cookie do express-session
        return res.json({ message: "Logout realizado com sucesso" });
    });
});




// Vinculação de Grupos de Rotas
app.use("/", authRoutes);
app.use("/agendamentos", agendamentoRoutes);
app.use(usuarioRoutes);
app.use("/", contatoRoutes);

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
