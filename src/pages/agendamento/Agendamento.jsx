import { useState } from "react";
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

      <div className="calendario">
        <Calendario />
      </div>

      <div className="horario-disponivel">
        <h2>Horários Disponíveis</h2>

        <p>Selecione uma data no calendário.</p>

        <button>Confirmar Agendamento</button>
      </div>
    </section>
  );
};

export default Agendamento;