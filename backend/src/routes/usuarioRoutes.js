import { Router } from "express";
import { usuarios } from "../controllers/usuariosController.js";

const router = Router();

router.get("/usuarioscadastrados", usuarios)

export default router;