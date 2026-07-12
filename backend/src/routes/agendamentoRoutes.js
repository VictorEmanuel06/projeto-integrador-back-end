import { Router } from "express";
import {
    criarAgendamento,
    listarAgendamentosPorData,
    listarAgendamentos,
    alterarStatusAgendamento,
    buscarAgendamentoPorId
} from "../controllers/agendamentoController.js";
import { verificarLogin } from "../middlewares/auth.js";

const router = Router();

// Lista todos os agendamentos
router.get("/", verificarLogin, listarAgendamentos);

// Lista horários ocupados por data
router.get("/:data", verificarLogin, listarAgendamentosPorData);

// Cria um agendamento
router.post("/", verificarLogin, criarAgendamento);

router.put("/:id/status", verificarLogin, alterarStatusAgendamento);

router.get("/data/:data", verificarLogin, buscarAgendamentoPorId);

export default router;