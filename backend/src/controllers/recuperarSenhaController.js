import db from "../../db.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const codigosPendentes = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const solicitarRecuperacao = (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const sql = `SELECT id_cliente FROM cadastro_cliente WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno" });
    }

    if (result.length === 0) {
      return res.status(200).json({
        message: "Se o e-mail existir, enviaremos um código de recuperação.",
      });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    codigosPendentes[email] = {
      codigo,
      expira: Date.now() + 15 * 60 * 1000,
      verificado: false,
    };

    try {
      await transporter.sendMail({
        from: `"Sua Empresa" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Código para redefinir sua senha",
        html: `<p>Seu código de recuperação é: <strong>${codigo}</strong></p>
               <p>Ele expira em 15 minutos.</p>`,
      });
      res.status(200).json({
        message: "Se o e-mail existir, enviaremos um código de recuperação.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao enviar e-mail" });
    }
  });
};

export const verificarCodigo = (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const { codigo } = req.body;
  const registro = codigosPendentes[email];

  if (!registro || registro.codigo !== codigo || Date.now() > registro.expira) {
    return res.status(400).json({ message: "Código inválido ou expirado" });
  }

  registro.verificado = true;
  res.status(200).json({ message: "Código válido", autorizado: true });
};

export const alterarSenha = async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const { novaSenha } = req.body;
  const registro = codigosPendentes[email];

  if (!registro || !registro.verificado) {
    return res.status(403).json({ message: "Verifique o código antes de alterar a senha" });
  }

  if (!novaSenha || novaSenha.length < 6) {
    return res.status(400).json({ message: "Senha deve ter no mínimo 6 caracteres" });
  }

  try {
    const hash = await bcrypt.hash(novaSenha, 10);
    const sql = `UPDATE cadastro_cliente SET senha = ? WHERE email = ?`;

    db.query(sql, [hash, email], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao atualizar senha" });
      }
      delete codigosPendentes[email];
      res.status(200).json({ message: "Senha alterada com sucesso" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};