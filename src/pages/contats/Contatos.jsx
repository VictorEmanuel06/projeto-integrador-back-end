import React from "react";
import "./Contatos.css";

function Contatos() {
  return (
    <main>
      <section id="contatos" className="contact-section">
        <div className="contact-wrapper">
          <br />

          <div className="contact-conentair">
            <form id="fale-comigo" noValidate>
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
              />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Seu e-mail"
              />

              <input
                id="number"
                type="tel"
                name="telefone"
                placeholder="Seu telefone"
              />

              <textarea
                id="mensagem"
                name="mensagem"
                placeholder="Mensagem"
              ></textarea>

              <p id="erro"></p>

              <button type="submit">Enviar</button>

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