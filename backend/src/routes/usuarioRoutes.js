import { Router } from "express";
import { usuarios } from "../controllers/usuariosController.js";
import { verificarLogin } from "../middlewares/auth.js";
import { excluirUsuario} from "../controllers/usuariosController.js";


const router = Router();

router.get("/usuarioscadastrados", verificarLogin,usuarios)
router.delete("/usuarioscadastrados/:id", excluirUsuario);

export default router;