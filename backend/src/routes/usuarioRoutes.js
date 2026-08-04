import { Router } from "express";
import { usuarios, excluirUsuario, buscarPorId, atualizar } from "../controllers/usuariosController.js";
import { verificarLogin } from "../middlewares/auth.js";


const router = Router();

router.get("/usuarioscadastrados", verificarLogin,usuarios)
router.delete("/usuarioscadastrados/:id_cliente", excluirUsuario);
router.get("/usuarios/:id", buscarPorId );
router.put("/usuarios/:id", atualizar);

export default router;