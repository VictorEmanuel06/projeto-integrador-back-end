import { useState } from "react";
import "./Contatos.css";

const API_URL = "http://localhost:7006/contato"; // porta do seu backend (do .env: PORT=7006)

function Contatos() {
  const [dadosContato, setDadosContato] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [status, setStatus] = useState(null); // null | "enviando" | "sucesso" | "erro"

  function handleChange(evento) {
    const { name, value } = evento.target;
    setDadosContato((anterior) => ({ ...anterior, [name]: value }));
  }

  function validar() {
    if (
      !dadosContato.nome.trim() ||
      !dadosContato.email.trim() ||
      !dadosContato.telefone.trim() ||
      !dadosContato.mensagem.trim()
    ) {
      return "Preencha todos os campos.";
    }
    if (!/\S+@\S+\.\S+/.test(dadosContato.email)) {
      return "Informe um e-mail válido.";
    }
    return "";
  }

  async function handleSubmit(evento) {
    evento.preventDefault();

    const mensagemErro = validar();
    if (mensagemErro) {
      document.getElementById("erro").textContent = mensagemErro;
      return;
    }
    document.getElementById("erro").textContent = "";

    setStatus("enviando");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosContato),
      });

      if (!response.ok) throw new Error("Falha ao enviar");

      setStatus("sucesso");
      document.getElementById("erro").textContent = "";
      setDadosContato({ nome: "", email: "", telefone: "", mensagem: "" });
    } catch (erro) {
      console.error(erro);
      setStatus("erro");
      document.getElementById("erro").textContent =
        "Não foi possível enviar sua mensagem. Tente novamente.";
    }
  }

  return (
    <main>
      <section id="contatos" className="contact-section">
        <div className="contact-wrapper">
          <br />

          <div className="contact-conentair">
            <form id="fale-comigo" noValidate onSubmit={handleSubmit}>
              <h2>Vamos Conversar?</h2>

              <p className="subtitle">
                Se você busca agendar uma sessão, tirar dúvidas ou iniciar seu
                processo terapêutico, entre em contato.
                <br />
                Garantimos total sigilo e acolhimento.
              </p>

              <input
                id="nome"
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={dadosContato.nome}
                onChange={handleChange}
              />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Seu e-mail"
                value={dadosContato.email}
                onChange={handleChange}
              />

              <input
                id="number"
                type="tel"
                name="telefone"
                placeholder="Seu telefone"
                value={dadosContato.telefone}
                onChange={handleChange}
              />

              <textarea
                id="mensagem"
                name="mensagem"
                placeholder="Mensagem"
                value={dadosContato.mensagem}
                onChange={handleChange}
              ></textarea>

              <p id="erro"></p>

              <button type="submit" disabled={status === "enviando"}>
                {status === "enviando" ? "Enviando..." : "Enviar"}
              </button>

              {status === "sucesso" && (
                <p className="sucesso-envio">
                  Mensagem enviada com sucesso! Em breve entraremos em contato.
                </p>
              )}

              <div className="horario-atendimento">
                <p>
                  Horário de Atendimento:
                  <br />
                  Segunda, terça, Quinta e Sexta, das 10h às 21h.
                </p>
              </div>

              <div className="frame">
                <iframe
                  title="Mapa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.733004189908!2d-46.667718799999996!3d-23.649731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a9c2e471a07%3A0x34d03b41ee47c258!2sR.%20Salvador%20Iacona%2C%2027%20-%20Vila%20Santa%20Catarina%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004367-070!5e0!3m2!1spt-BR!2sbr!4v1769695078524!5m2!1spt-BR!2sbr"
                  width="600"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contatos;