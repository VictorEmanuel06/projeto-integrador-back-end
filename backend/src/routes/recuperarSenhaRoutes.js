import { Router } from "express";
import {
  solicitarRecuperacao,
  verificarCodigo,
  alterarSenha,
} from "../controllers/recuperarSenhaController.js";

const router = Router();

router.post("/api/recuperar-senha", solicitarRecuperacao);
router.post("/api/verificar-codigo", verificarCodigo);
router.post("/api/alterar-senha", alterarSenha);

export default router;