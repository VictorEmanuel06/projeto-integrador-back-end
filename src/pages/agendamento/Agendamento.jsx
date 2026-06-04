import "./Agendamento.css";
import Calendario from "../../components/calendario/Calendario";


const Agendamento = () => {
  return (
    <section className="container-agendamento">
      <div className="infopsi">
        <h1>Dr. Romulo</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Labore sint quae possimus consequatur.
        </p>
      </div>

      <div className="horario-disponivel">
        <h2>Horários Disponíveis</h2>
        <h3>Manhã</h3>
        <div className="periodo-grid">
              <button>09:00H</button>
              <button>10:00H</button>
              <button>11:00H</button>
              <button>12:00H</button>
        </div>
        <h3>Tarde</h3>
        <div className="periodo-grid">
              <button>09:00H</button>
              <button>10:00H</button>
              <button>11:00H</button>
              <button>12:00H</button>
        </div>
        <h3>Noite</h3>
        <div className="periodo-grid">
              <button>09:00H</button>
              <button>10:00H</button>
              <button>11:00H</button>
              <button>12:00H</button>
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