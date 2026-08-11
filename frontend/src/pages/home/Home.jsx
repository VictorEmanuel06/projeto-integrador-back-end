import { useEffect, useRef, useState } from 'react';
import './Home.css';
import { NavLink } from "react-router-dom";

import cuidado from '../../assets/img_cuidado.png';
import acolhimento from '../../assets/img_acolhimento.png';
import autoconhecimento from '../../assets/img_autoconhecimento.png';

import terapia from '../../assets/icon_terapia.png';
import relacionamento from '../../assets/icon_relacionamentos.png';
import equilibrio from '../../assets/icon_equilibrio.png';
import emocoes from '../../assets/icon_emocoes.png';

const pilares = [
  {
    id: 1,
    icone: terapia,
    titulo: 'Terapia',
    texto:
      'Espaço seguro de escuta e elaboração de questões emocionais.'
  },
  {
    id: 2,
    icone: autoconhecimento,
    titulo: 'Autoconhecimento',
    texto:
      'Compreensão profunda de si para escolhas mais conscientes.'
  },
  {
    id: 3,
    icone: relacionamento,
    titulo: 'Relacionamentos',
    texto:
      'Construção de vínculos mais saudáveis e significativos.'
  },
  {
    id: 4,
    icone: equilibrio,
    titulo: 'Equilíbrio',
    texto:
      'Busca por equilíbrio emocional e qualidade de vida.'
  },
  {
    id: 5,
    icone: emocoes,
    titulo: 'Emoções positivas',
    texto:
      'Desenvolvimento de bem-estar e fortalecimento interno.'
  }
];

const beneficios = [
  {
    icone: autoconhecimento,
    titulo: 'Autoconhecimento',
    texto:
      'Compreenda seus pensamentos, emoções e comportamentos com mais profundidade.'
  },
  {
    icone: emocoes,
    titulo: 'Elaboração emocional',
    texto:
      'Elabore conflitos, ressignifique vivências e alivie o sofrimento psíquico.'
  },
  {
    icone: relacionamento,
    titulo: 'Relações saudáveis',
    texto:
      'Desenvolva vínculos mais saudáveis e uma comunicação mais consciente.'
  },
  {
    icone: equilibrio,
    titulo: 'Equilíbrio e bem-estar',
    texto:
      'Promova amadurecimento emocional e uma vida mais consciente e equilibrada.'
  }
];

const Home = () => {
  const [pilarAberto, setPilarAberto] = useState(null);
  const pilaresRef = useRef(null);

  const toggleExpandir = (id) => {
    setPilarAberto((atual) => (atual === id ? null : id));
  };

  useEffect(() => {
    const handleClickFora = (event) => {
      if (
        pilaresRef.current &&
        !pilaresRef.current.contains(event.target)
      ) {
        setPilarAberto(null);
      }
    };

    document.addEventListener('mousedown', handleClickFora);

    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, []);

  return (
    <main className="container">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-text">

            <span className="eyebrow">
              BEM-VINDO(A)
              <span className="eyebrow-line"></span>
            </span>

            <h1>
              Aqui, a sua história
              <br />
              encontra espaço
              <br />
              para ser ouvida.
            </h1>

            <p>
              Um espaço seguro, ético e acolhedor para cuidar
              da sua saúde mental e promover transformações
              reais na sua vida.
            </p>

            <div className="hero-buttons">

              <a
                href="#contato"
                className="btn btn-primary"
              >
                <span>▣</span>
                Agendar atendimento
              </a>

              <a
                href="https://wa.me/5511992678813"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <span>◔</span>
                Falar no WhatsApp
              </a>

            </div>

            <div className="hero-features">

              <div className="hero-feature">
                <span className="feature-icon">♡</span>
                <div>
                  <strong>Sigilo e ética</strong>
                  <small>profissional</small>
                </div>
              </div>

              <div className="hero-feature">
                <span className="feature-icon">♧</span>
                <div>
                  <strong>Atendimento</strong>
                  <small>individualizado</small>
                </div>
              </div>

              <div className="hero-feature">
                <span className="feature-icon">♡</span>
                <div>
                  <strong>Ambiente seguro</strong>
                  <small>e acolhedor</small>
                </div>
              </div>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-circle"></div>

            <div className="hero-image">
              <img
                src={acolhimento}
                alt="Ilustração de acolhimento"
              />
            </div>

            <div className="hero-decoration hero-decoration-one"></div>
            <div className="hero-decoration hero-decoration-two"></div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SOBRE / PSICÓLOGO
      ===================================================== */}

      <section className="sobre-section">

        <div className="sobre-image">

          <img
            src={cuidado}
            alt="Ilustração relacionada ao cuidado emocional"
          />

          <div className="sobre-badge">
            <span>◉</span>
            Atendimento
            <br />
            para adultos
          </div>

        </div>

        <div className="sobre-content">

          <div className="section-label">
            <img
              src={cuidado}
              alt=""
            />

            <span>Psicólogo Psicanalista</span>
          </div>

          <h2>
            Um espaço seguro para
            <br />
            cuidar de você.
          </h2>

          <p>
            Psicoterapia para adultos baseada no acolhimento,
            na ética e no respeito à sua história.
          </p>

          <p>
            A psicanálise é um método de investigação e tratamento
            terapêutico criado pelo neurologista Sigmund Freud.
            Seu foco é acessar conteúdos do inconsciente — como
            desejos reprimidos e traumas infantis — que influenciam
            nosso comportamento e podem causar sofrimento psíquico.
          </p>

          <p>
            Nascida no final do século XIX, a psicanálise transformou
            a forma como entendemos a mente humana e a cultura.
            Além de ser um método de tratamento, também serve como
            ferramenta de pesquisa e observação de fenômenos sociais.
          </p>

          <blockquote>
            <span>“</span>

            <p>
              A mente humana é como um iceberg, flutuando com
              uma pequena parte acima da água e uma grande parte
              abaixo dela.
            </p>

            <cite>— Sigmund Freud</cite>
          </blockquote>

        </div>

      </section>


      {/* =====================================================
          BENEFÍCIOS
      ===================================================== */}

      <section className="beneficios-section">

        <div className="section-heading">

          <div className="heading-icon">
            <img
              src={autoconhecimento}
              alt=""
            />
          </div>

          <h2>
            Quais os benefícios da psicanálise?
          </h2>

          <span className="heading-line"></span>

          <p>
            A Psicanálise é um convite ao autoconhecimento e ao
            cuidado com a saúde mental. Por meio de uma escuta
            acolhedora e ética, o processo terapêutico ajuda a
            compreender emoções, elaborar conflitos, ressignificar
            experiências e aliviar o sofrimento psíquico.
          </p>

        </div>


        <div className="beneficios-grid">

          {beneficios.map((beneficio) => (
            <article
              className="beneficio-card"
              key={beneficio.titulo}
            >

              <div className="beneficio-icon">
                <img
                  src={beneficio.icone}
                  alt=""
                />
              </div>

              <h3>{beneficio.titulo}</h3>

              <p>{beneficio.texto}</p>

            </article>
          ))}

        </div>

      </section>


      {/* =====================================================
          5 PILARES
      ===================================================== */}

      <section className="pilares-section">

        <div className="section-heading pilares-heading">

          <h2>Os 5 Pilares da Psicologia</h2>

          <span className="heading-line"></span>

        </div>


        <div
          ref={pilaresRef}
          className="pilares-wrapper"
        >

          <div className="circulo">

            <ul className="letras-perma">

              <li className="letra-t">T</li>
              <li className="letra-a">A</li>
              <li className="letra-r">R</li>
              <li className="letra-e">E</li>
              <li className="letra-e2">E</li>

            </ul>

          </div>


          <div className="pilares-cards">

            {pilares.map((pilar, index) => {

              const aberto = pilarAberto === pilar.id;

              return (
                <div
                  key={pilar.id}
                  className={`
                    pilar
                    pilar-${index + 1}
                    ${aberto ? 'pilar-expandido' : ''}
                  `}
                  onClick={() => toggleExpandir(pilar.id)}
                >

                  <div className="pilar-cabecalho">

                    <img
                      src={pilar.icone}
                      alt=""
                    />

                    <div>
                      <strong>{pilar.titulo}</strong>

                      <span>
                        {pilar.texto}
                      </span>
                    </div>

                  </div>

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        id="contato"
        className="cta-section"
      >

        <div className="cta-content">

          <span>UM PRIMEIRO PASSO</span>

          <h2>
            Vamos conversar?
          </h2>

          <p>
            Dê o primeiro passo para uma vida com mais
            leveza, consciência e bem-estar.
          </p>

        <NavLink to="/agendamento">
          <a
            target="_blank"
            rel="noreferrer"
            className="cta-button"
          >
            Agendar atendimento
          </a>
        </NavLink>
        </div>

      </section>

    </main>
  );
};

export default Home;