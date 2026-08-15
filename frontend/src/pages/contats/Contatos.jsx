import { useState } from "react";
import "./Contatos.css";
import { toast } from "react-toastify";

const API_URL = "http://localhost:7006/contato";

function Contatos() {
  const [dadosContato, setDadosContato] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [status, setStatus] = useState(null);

  function handleChange(evento) {
    const { name, value } = evento.target;

    setDadosContato((anterior) => ({
      ...anterior,
      [name]: value,
    }));
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
      toast.error(mensagemErro);
      return;
    }

    setStatus("enviando");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosContato),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar");
      }

      setStatus("sucesso");

      setDadosContato({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
      });

      toast.success("Mensagem enviada com sucesso!");
    } catch (erro) {
      console.error(erro);

      setStatus("erro");

      toast.error(
        "Não foi possível enviar sua mensagem. Tente novamente."
      );
    }
  }

  return (
    <main className="contatos-page">

      <section id="contatos" className="contact-section">

        <div className="contact-wrapper">

          {/* =========================
              LADO ESQUERDO
          ========================== */}

          <div className="contact-form-area">

            <div className="contact-title">

              <span className="contact-label">
                CONTATO
              </span>

              <h1>
                Vamos Conversar?
              </h1>

              <p>
                Se você busca agendar uma sessão, tirar dúvidas ou iniciar
                seu processo terapêutico, entre em contato.
                <br />
                Garantimos total sigilo e acolhimento.
              </p>

            </div>

            <form
              id="fale-comigo"
              noValidate
              onSubmit={handleSubmit}
            >

              <div className="input-group">

                <span className="input-icon">
                  ♙
                </span>

                <input
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  value={dadosContato.nome}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Seu e-mail"
                  value={dadosContato.email}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <span className="input-icon">
                  ☎
                </span>

                <input
                  id="telefone"
                  type="tel"
                  name="telefone"
                  placeholder="Seu telefone"
                  value={dadosContato.telefone}
                  onChange={handleChange}
                />

              </div>

              <div className="textarea-group">

                <span className="textarea-icon">
                  ♡
                </span>

                <textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Mensagem"
                  value={dadosContato.mensagem}
                  onChange={handleChange}
                />

              </div>

              <button
                type="submit"
                disabled={status === "enviando"}
              >
                {status === "enviando"
                  ? "Enviando..."
                  : "➤  Enviar mensagem"}
              </button>

            </form>

            <div className="privacy-message">

              <div className="privacy-icon">
                🔒
              </div>

              <p>
                Todas as informações são tratadas
                <br />
                com total sigilo e segurança.
              </p>

            </div>

          </div>


          {/* =========================
              LADO DIREITO
          ========================== */}

          <div className="contact-info-area">

            <div className="office-image">

              <img
                src="/src/assets/escritorio.jpg"
                alt="Consultório psicológico"
              />

            </div>


            {/* INFORMAÇÕES */}

            <div className="contact-info">

              <div className="info-item">

                <div className="info-icon">
                  ◷
                </div>

                <div>
                  <strong>
                    Horário de Atendimento:
                  </strong>

                  <p>
                    Segunda a Sexta
                    <br />
                    10h às 21h.
                  </p>
                </div>

              </div>


              <div className="info-item">

                <div className="info-icon">
                  ☎
                </div>

                <div>
                  <strong>
                    Telefone / WhatsApp:
                  </strong>

                  <p>
                    (11) 99267-8813
                  </p>
                </div>

              </div>


              <div className="info-item">

                <div className="info-icon">
                  ✉
                </div>

                <div>
                  <strong>
                    E-mail:
                  </strong>

                  <p>
                    neves.romulo@yahoo.com
                  </p>
                </div>

              </div>

            </div>


            {/* MAPA */}

            <div className="frame">

              <iframe
                title="Mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.733004189908!2d-46.667718799999996!3d-23.649731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a9c2e471a07%3A0x34d03b41ee47c258!2sR.%20Salvador%20Iacona%2C%2027%20-%20Vila%20Santa%20Catarina%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004367-070!5e0!3m2!1spt-BR!2sbr!4v1769695078524!5m2!1spt-BR!2sbr"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contatos;