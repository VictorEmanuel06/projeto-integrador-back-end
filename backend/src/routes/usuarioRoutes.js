import { Router } from "express";
import { usuarios, excluirUsuario, buscarPorId, atualizar } from "../controllers/usuariosController.js";
import { verificarLogin } from "../middlewares/auth.js";

const router = Router();

router.get("/usuarioscadastrados", verificarLogin, usuarios);
router.delete("/usuarioscadastrados/:id_cliente", verificarLogin, excluirUsuario);
router.get("/usuarios/:id", verificarLogin, buscarPorId);
router.put("/usuarios/:id", verificarLogin, atualizar);

export default router;