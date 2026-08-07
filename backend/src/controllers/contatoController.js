import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function enviarContato(req, res) {
  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email || !telefone || !mensagem) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  transporter.sendMail(
    {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINO,
      subject: `Novo contato do site - ${nome}`,
      text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensagem}`,
    },
    (erroEmail) => {
      if (erroEmail) {
        console.error(erroEmail);
        return res.status(500).json({ error: "Erro ao enviar e-mail." });
      }

      return res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    }
  );
}