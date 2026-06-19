import "./Agendamento.css";
import Calendario from "../../components/calendario/Calendario";
import doutor from '../../assets/doutor.jpg';


const Agendamento = () => {
  return (
    <section className="container-agendamento">

    <div className="conteudo-agendamento">

      <div className="coluna-esquerda">
      <div className="caixa-psi">
        <img src={doutor} className="foto_agendamento" />

        <div className="info-psi">
        <h1>Dr. Romulo</h1>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Eaque nihil iusto a voluptatem? Accusantium reprehenderit
          </p>
        </div>
      </div>


        <div className="calendario">
          <Calendario />
        </div>
      </div>

      
      <div className="horarios">
        <h1>Horários Disponíveis</h1>

        <p>Segunda feira, 19 de junho, 2026</p>


        <h2>Manhã</h2>
          <div className="caixa-botoes">
            <button className="botoes">09:00H</button>
            <button className="botoes">10:00H</button>
            <button className="botoes">11:00H</button>
            <button className="botoes">12:00H</button>
          </div>

        <h2>Tarde</h2>
          <div className="caixa-botoes">
            <button className="botoes">09:00H</button>
            <button className="botoes">10:00H</button>
            <button className="botoes">11:00H</button>
            <button className="botoes">12:00H</button>
        </div>

        <h2>Noite</h2>
          <div className="caixa-botoes">
            <button className="botoes">09:00H</button>
            <button className="botoes">10:00H</button>
            <button className="botoes">11:00H</button>
            <button className="botoes">12:00H</button>
          </div>

          <button className="agendamento">Confirmar Agendamento →</button>

      </div>
    </div>


    </section>

  );
};

export default Agendamento;