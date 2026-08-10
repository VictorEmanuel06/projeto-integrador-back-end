import { useState } from "react";
import "./Home.css";
import cuidado from '../../assets/img_cuidado.png';
import acolhimento from '../../assets/img_acolhimento.png';
import autoconhecimento from '../../assets/img_autoconhecimento.png';
import terapia from '../../assets/icon_terapia.png';
import icon_auto from '../../assets/img_autoconhecimento.png';
import relacionamento from '../../assets/icon_relacionamentos.png';
import equilibrio from '../../assets/icon_equilibrio.png';
import emocoes from '../../assets/icon_emocoes.png';

const pilares = [
  { id: "terapia", icone: terapia, titulo: "Terapia", texto: "Espaço de escuta e acolhimento para você trabalhar suas questões emocionais com ética e sigilo." },
  { id: "autoconhecimento", icone: icon_auto, titulo: "Autoconhecimento", texto: "Compreender quem você é, suas emoções e comportamentos, para ter mais equilíbrio e crescimento pessoal." },
  { id: "relacionamentos", icone: relacionamento, titulo: "Relacionamentos", texto: "Fortalecer vínculos saudáveis e desenvolver formas mais claras e empáticas de se comunicar." },
  { id: "equilibrio", icone: equilibrio, titulo: "Equilíbrio", texto: "Buscar harmonia entre vida pessoal, profissional e emocional no dia a dia." },
  { id: "emocoes", icone: emocoes, titulo: "Emoções positivas", texto: "Cultivar bem-estar, gratidão e experiências que fortalecem a saúde mental." },
];

const Home = () => {
  const [aberto, setAberto] = useState(null);

  const alternar = (id) => {
    setAberto(aberto === id ? null : id);
  };

  return (
    <>
      <main className='container'>
        {/* <!-- Bem Vindo --> */}

        <section className='caixa-bem-vindo'>
          <div className='texto'>
            <h1>Bem-Vindo(a).</h1>
            <p>
              Se ao você compartilhar sua <br />
              história você abre espaço <br />
              para ser escutado.
            </p>
          </div>

          <div className='img-2'>
            <img src={acolhimento} alt='Ilustração de acolhimento' />
          </div>
        </section>

        {/* <!-- CUIDADO --> */}

        <section className='caixa-cuidado'>
          <div className='texto'>
            <h1>Você Merece <br />Cuidado.</h1>
            <p>Psicoterapia para adultos <br />
              com acolhimento e etica </p>
          </div>

          <div className='img-1'>
            <img src={cuidado} alt='Ilustração sobre cuidado emocional' />
          </div>
        </section>

        {/* <!-- AUTOCONHECIMENTO  --> */}

        <section className='caixa-autoconhecimento'>
          <div className='autoconhecimento'>

            <div className='titulo-autoconhecimento'>
              <img src={autoconhecimento} alt='Ícone de autoconhecimento' />
              <h1>Autoconhecimento</h1>
            </div>

            <p>
              O autoconhecimento é a capacidade de compreender a quem somos, nossas emoções, pensamentos e comportamentos, permintindo maior equilíbrio e crescimento pessoal.
            </p>

          </div>
        </section>

        {/* <!-- PILARES - Círculo + FAQ --> */}

        <section className='caixa-pilares'>
          <h1 className="os-cinco-pilares">Os 5 Pilares da Psicologia</h1>

          <div className='pilares-content'>

            {/* Círculo com as letras */}
            <div className='circulo'>
              <ul className='letras-perma'>
                <li className='p'>T</li>
                <li className='e'>A</li>
                <li className='r'>R</li>
                <li className='m'>E</li>
                <li className='a'>E</li>
              </ul>
            </div>

            {/* Lista dos pilares (FAQ) */}
            <div className='pilares-faq'>
              {pilares.map((pilar) => (
                <div
                  key={pilar.id}
                  className={`pilar-faq-item ${aberto === pilar.id ? "active" : ""}`}
                >
                  <div
                    className="pilar-faq-pergunta"
                    onClick={() => alternar(pilar.id)}
                  >
                    <img src={pilar.icone} alt={pilar.titulo} />
                    <span>{pilar.titulo}</span>
                    <span className="seta">▼</span>
                  </div>

                  <div className="pilar-faq-resposta">
                    <p>{pilar.texto}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
