import express from "express";
import { enviarContato } from "../controllers/contatoController.js";

const router = express.Router();
router.post("/contato", enviarContato);

export default router;