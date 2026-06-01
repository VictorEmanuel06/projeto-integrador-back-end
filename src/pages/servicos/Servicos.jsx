import "./Servicos.css"

const Servicos = () => {
  return (
    <>
      <div class="container">
        <h1>Serviços</h1>
      </div>

      <div className="services-grid">
        <div className="bubble">
          <img src="img/jpeg 1.png" alt="Suporte emocional" className="bubble-img" />
          <p>Oferecer suporte emocional e orientação para ajudar no processo a lidar com desafios pessoais,
            profissionais e sociais. Auxiliar no autoconhecimento dos pensamentos, sentimentos e comportamentos,
            promovendo o autoconhecimento e bem-estar, sempre respeitando a ética e a individualidade de cada
            pessoa.</p>
        </div>

        <div className="bubble">
          <img src="img/jpeg novo.png" alt="Processo terapêutico" className="bubble-img" />
          <p>Não trabalho com respostas prontas ou soluções mágicas. O processo terapêutico é construído gradualmente
            e permite que você se compreenda de forma mais profunda, identificando causas internas das suas
            angústias e mudando a maneira como vive e se relaciona.</p>
        </div>
      </div>
    </>
  )
}

export default Servicos;