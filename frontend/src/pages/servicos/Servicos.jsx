import "./Servicos.css";

import img from "../../assets/img.png";
import img_novo from "../../assets/img_novo.png";

const Servicos = () => {
  return (
    <main className="servicos-page">

      {/* =========================
          CABEÇALHO DA PÁGINA
      ========================= */}
      <section className="servicos-hero">

        <div className="servicos-label">
          <span></span>
          <small>SERVIÇOS</small>
          <span></span>
        </div>

        <h1>Serviços</h1>

        <p>
          A psicoterapia é um caminho de autoconhecimento e transformação.
          <br />
          Cada processo é único, e meu papel é caminhar ao seu lado
          <br />
          com escuta, acolhimento e profissionalismo.
        </p>

      </section>


      {/* =========================
          CARDS PRINCIPAIS
      ========================= */}
      <section className="servicos-cards">

        {/* CARD 1 */}
        <article className="servico-card">

          <div className="servico-imagem">

            <img
              src={img}
              alt="Ilustração de atendimento psicológico"
            />

            <div className="servico-icone">
              ♡
            </div>

          </div>

          <h2>Suporte emocional e orientação</h2>

          <div className="linha-decorativa"></div>

          <p>
            Oferecer suporte emocional e orientação para ajudar no processo
            a lidar com desafios pessoais, profissionais e sociais. Auxiliar
            no autoconhecimento dos pensamentos, sentimentos e comportamentos,
            promovendo o autoconhecimento e o bem-estar, sempre respeitando
            a ética e a individualidade de cada pessoa.
          </p>

        </article>


        {/* CARD 2 */}
        <article className="servico-card">

          <div className="servico-imagem">

            <img
              src={img_novo}
              alt="Ilustração de processo terapêutico"
            />

            <div className="servico-icone">
              ✿
            </div>

          </div>

          <h2>Processo terapêutico profundo</h2>

          <div className="linha-decorativa"></div>

          <p>
            Não trabalho com respostas prontas ou soluções mágicas.
            O processo terapêutico é construído gradualmente e permite
            que você se compreenda de forma mais profunda, identificando
            causas internas das suas angústias e mudando a maneira como
            vive e se relaciona.
          </p>

        </article>

      </section>


      {/* =========================
          DIFERENCIAIS
      ========================= */}
      <section className="diferenciais">

        {/* ITEM 1 */}
        <div className="diferencial">

          <div className="diferencial-icone">
            ♙
          </div>

          <div className="diferencial-texto">
            <h3>Atendimento individualizado</h3>

            <p>
              Cada história é única
              <br />
              e merece atenção especial.
            </p>
          </div>

        </div>


        <div className="divisoria"></div>


        {/* ITEM 2 */}
        <div className="diferencial">

          <div className="diferencial-icone">
            ♢
          </div>

          <div className="diferencial-texto">
            <h3>Ambiente seguro e acolhedor</h3>

            <p>
              Espaço ético, confidencial
              <br />
              e livre de julgamentos.
            </p>
          </div>

        </div>


        <div className="divisoria"></div>


        {/* ITEM 3 */}
        <div className="diferencial">

          <div className="diferencial-icone">
            ♧
          </div>

          <div className="diferencial-texto">
            <h3>Abordagem baseada na Psicanálise</h3>

            <p>
              Com embasamento técnico
              <br />
              e olhar humano.
            </p>
          </div>

        </div>


        <div className="divisoria"></div>


        {/* ITEM 4 */}
        <div className="diferencial">

          <div className="diferencial-icone">
            ♧
          </div>

          <div className="diferencial-texto">
            <h3>Foco no autoconhecimento</h3>

            <p>
              Mais consciência para
              <br />
              escolhas mais livres.
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          FRASE FINAL
      ========================= */}
      <section className="servicos-final">

        <h2>
          Cuidar de si também é uma forma de se conhecer.
        </h2>

        <p>
          O processo terapêutico pode ser o primeiro passo para compreender
          melhor sua história e construir novas possibilidades.
        </p>

      </section>

    </main>
  );
};

export default Servicos;