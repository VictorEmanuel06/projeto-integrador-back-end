import "./Agendamento.css";
import Calendario from "../../components/calendario/Calendario";
import doutor from '../../assets/doutor.jpg';
import { useState, useEffect } from "react";
import axios from "axios";
import { alertTitleClasses } from "@mui/material/AlertTitle";


const Agendamento = () => {

const [horarioSelecionado, setHorarioSelecionado] = useState("");
const [horariosOcupados, setHorariosOcupados] = useState([]);


const selecionarHorario = (horario) => {
  setHorarioSelecionado(horario);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!horarioSelecionado) {
    return alert("Escolha um horário antes de continuar.");
  }

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return alert("Você precisa estar logado!");
  }

  const dados = {
    id_cliente: usuario.id,
    id_adm: 1,
    data_consulta: dataSelecionada.toISOString().split("T")[0],
    horario_consulta: horarioSelecionado,
  };

  console.log("Usuário:", usuario);
  console.log("Dados enviados:", dados);

  try {
    const res = await axios.post(
      "http://localhost:7006/agendamentos",
      dados,
      {
        withCredentials: true // 🔥 ESSENCIAL PRA SESSÃO
      }
    );

    console.log("Resposta:", res.data);
    alert("Agendamento feito com sucesso!");
  } catch (err) {
    console.log("Erro Axios:", err);
    alert("Erro ao agendar");
  }
};



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


  useEffect(() => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
  
    if (!usuario) return;
  
    const buscarHorarios = async () => {
      try {
        const data = dataSelecionada.toISOString().split("T")[0];
  
        const res = await axios.get(
          `http://localhost:7006/agendamentos/${data}`,
          {
            withCredentials: true,
          }
        );
  
        setHorariosOcupados(res.data);
  
      } catch (err) {
        console.log(err);
      }
    };
  
    buscarHorarios();
  
  }, [dataSelecionada]);





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

            {manha.map((horario) => {

              const ocupado = horariosOcupados.some(
                item => item.horario_consulta.slice(0,5) === horario.slice(0,5)
              );

              return (

              <button 
              key={horario} 
              disabled={ocupado}
              onClick={() => selecionarHorario(horario)}
              className={`botoes ${ocupado ? "ocupado" : ""}`}
              >
                {horario}
              </button>

              );

            })}
          
          </div>

        <h2>Tarde</h2>

          <div className="caixa-botoes">

            {tarde.map((horario) => {

              const ocupado = horariosOcupados.some(
                item => item.horario_consulta.slice(0,5) === horario.slice(0,5)
              );

              return (

              <button 
              key={horario} 
              disabled={ocupado}
              onClick={() => selecionarHorario(horario)}
              className={`botoes ${ocupado ? "ocupado" : ""}`}
              >
                {horario}
              </button>

              );

            })}
            
        </div>

        <h2>Noite</h2>

          <div className="caixa-botoes">

            {noite.map((horario) => {

              const ocupado = horariosOcupados.some(
                item => item.horario_consulta.slice(0,5) === horario.slice(0,5)
              );

              return (

              <button 
              key={horario} 
              disabled={ocupado}
              onClick={() => selecionarHorario(horario)}
              className={`botoes ${ocupado ? "ocupado" : ""}`}
              >
                {horario}
              </button>

              );

            })}
            
          </div>

          <button onClick={handleSubmit}  className="agendamento">Confirmar Agendamento →</button>

      </div>
    </div>


    </section>

  );
};

export default Agendamento;