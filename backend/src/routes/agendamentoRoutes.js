import { Router } from "express";
import {
    criarAgendamento,
    listarAgendamentosPorData,
    listarAgendamentos,
    alterarStatusAgendamento,
    buscarAgendamentoPorId,
    atualizarAgendamento
} from "../controllers/agendamentoController.js";

import { verificarLogin } from "../middlewares/auth.js";

const router = Router();

// Lista todos os agendamentos
router.get("/", verificarLogin, listarAgendamentos);

// Busca um agendamento pelo ID
router.get("/:id", verificarLogin, buscarAgendamentoPorId);

// Lista horários ocupados por data
router.get("/data/:data", verificarLogin, listarAgendamentosPorData);

// Cria um agendamento
router.post("/", verificarLogin, criarAgendamento);

// Atualiza status
router.put("/:id/status", verificarLogin, alterarStatusAgendamento);

// Atualiza agendamento pelo id
router.put("/:id", verificarLogin, atualizarAgendamento);

export default router;