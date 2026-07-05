import { Router } from "express";
import { criarAgendamento, listarAgendamentosPorData } from "../controllers/agendamentoController.js";
import { verificarLogin } from "../middlewares/auth.js";

const router = Router();

// Ambas as rotas exigem validação de login antes de executar a lógica
router.post("/", verificarLogin, criarAgendamento);
router.get("/:data", verificarLogin, listarAgendamentosPorData);

export default router;
