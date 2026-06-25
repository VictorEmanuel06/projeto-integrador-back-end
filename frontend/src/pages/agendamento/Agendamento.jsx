import "./Agendamento.css";
import Calendario from "../../components/calendario/Calendario";
import doutor from '../../assets/doutor.jpg';
import { useState } from "react";
import axios from "axios";


const Agendamento = () => {


const [horarioSelecionado, setHorarioSelecionado] = useState("");

const selecionarHorario = (horario) => {
  setHorarioSelecionado(horario);
};

const handleSubmit = async (e) => {
  e.preventDefalut();

  try {
    await axios.post(
      "http://localhost:7006/agendamentos",
      {
        id_clientee: 1,
        id_adm: 1,
        data_consulta: dataSelecionada,
        horario_consulta: horarioSelecionado,
      },
      {
        withCredentials: true,
      }
    );

    alert("Agendamento realizado!");
  } catch (err) {
    console.log(err);
  }
}



  // Ajustar ainda
  const gerarHorarios = (inicio, fim, intervalo) => {
    const horarios = [];

    for (let hora = inicio; hora <= fim; hora++) {
      horarios.push(`${hora.toString().padStart(2, "0")}:00H`);
    }
    return horarios;
  };

  const manha = ["08:30H", "09:30H", "10:30H", "11:30H"];
  const tarde = gerarHorarios(13, 16);
  const noite = ["19:00H", "19:30H", "20:00H", "20:30H"];


  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const dataFormatada = dataSelecionada.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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


        {/* Calendario */}
        <div className="calendario">
          <Calendario 
          value={dataSelecionada}
          onChange={(novaData) => {
            if (novaData) {
          setDataSelecionada(novaData);
          }
        }}
          />
        </div>
      </div>

      
      <div className="horarios">
        <h1>Horários Disponíveis</h1>

        <p>
          {dataFormatada.charAt(0).toUpperCase() + 
          dataFormatada.slice(1)}
        </p>


        <h2>Manhã</h2>
          <div className="caixa-botoes">

            {manha.map((horario) => (
              <button 
              key={horario} 
              onClick={() => selecionarHorario(horario)}
              className="botoes"
              >
                {horario}
              </button>
            ))}
          
          </div>

        <h2>Tarde</h2>

          <div className="caixa-botoes">
            {tarde.map((horario) => (
              <button key={horario} className="botoes">{horario}</button>
            ))}
            
        </div>

        <h2>Noite</h2>

          <div className="caixa-botoes">
            {noite.map((horario) =>(
              <button key={horario} className="botoes">{horario}</button>
            ))}
            
          </div>

          <button className="agendamento">Confirmar Agendamento →</button>

      </div>
    </div>


    </section>

  );
};

export default Agendamento;