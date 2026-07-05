import { Router } from "express";
import { 
    cadastrarUsuario, 
    cadastrarAdm, 
    loginUsuario, 
    loginAdm, 
    verificarSessaoRaiz 
} from "../controllers/authController.js";

const router = Router();

router.get("/", verificarSessaoRaiz);
router.post("/cadastrousuario", cadastrarUsuario);
router.post("/cadastroadm", cadastrarAdm);
router.post("/loginusuario", loginUsuario);
router.post("/loginadm", loginAdm);

export default router;
