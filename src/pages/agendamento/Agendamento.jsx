import "./Agendamento.css";
import Calendario from "../../components/calendario/Calendario";
import doutor from '../../assets/doutor.jpg';


const Agendamento = () => {
  return (
    <section className="container-agendamento">

      <div className="infopsi">
        <img src={doutor} className="foto_agendamento" />
        <h1>Dr. Romulo</h1>
          <p>
          </p>
      </div>

      <div className="horarios">
        <h1>Horários Disponíveis</h1>
        <div className="periodo">
          <h2>Manhã</h2>
          <div className="botoes">
            <button>09:00H</button>
            <button>10:00H</button>
            <button>11:00H</button>
            <button>12:00H</button>
          </div>
        </div>
        <div className="periodo">
          <h2>Tarde</h2>
          <div className="botoes">
            <button>09:00H</button>
            <button>10:00H</button>
            <button>11:00H</button>
            <button>12:00H</button>
          </div>
        </div>
        <div className="periodo">
          <h2>Noite</h2>
          <div className="botoes">
            <button>09:00H</button>
            <button>10:00H</button>
            <button>11:00H</button>
            <button>12:00H</button>
          </div>
        </div>

        <div className="btn_agendamento">
          <button>Confirmar Agendamento</button>
        </div>
      </div>

      <div className="calendario">
        {/* <Calendario /> */}
      </div>

    </section>

  );
};

export default Agendamento;