import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from 'dotenv';
import authRoutes from "./src/routes/authRoutes.js";
import agendamentoRoutes from "./src/routes/agendamentoRoutes.js";

dotenv.config();

const app = express();

// Middlewares Globais
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
      sameSite: "lax"
    }
}));

// Vinculação de Grupos de Rotas
app.use("/", authRoutes);
app.use("/agendamentos", agendamentoRoutes);

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
