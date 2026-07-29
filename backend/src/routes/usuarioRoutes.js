import { Router } from "express";
import { usuarios } from "../controllers/usuariosController.js";
import { verificarLogin } from "../middlewares/auth.js";

const router = Router();

router.get("/usuarioscadastrados", verificarLogin,usuarios)

export default router;