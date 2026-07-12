import "./Agendamento.css";
import Calendario from "../../components/calendario/Calendario";
import doutor from '../../assets/doutor.jpg';
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Agendamento = () => {
const [horarioSelecionado, setHorarioSelecionado] = useState("");
const [horariosOcupados, setHorariosOcupados] = useState([]);
const [logado, setLogado] = useState(false);
const [dataSelecionada, setDataSelecionada] = useState(new Date());
const [tipoAcaoAdm, setTipoAcaoAdm] = useState("agendar"); 

const navigate = useNavigate();
const {id} = useParams();

// Recupera os dados do localStorage
const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
const isAdmin = usuarioLogado?.role === "ADMIN";

// CORREÇÃO: O sistema estará liberado se o backend disser que sim OU se for um Admin com Token válido
const isAuthenticated = logado || (isAdmin && !!usuarioLogado?.token);

useEffect(() => {
    axios.get("http://localhost:7006", { withCredentials: true })
    .then(res => {
        setLogado(res.data.valid);
    })
    .catch(err => {
      console.log("Erro ao checar login:", err);
      setLogado(false);
    });
}, []);

const selecionarHorario = (horario) => {
  setHorarioSelecionado(horario);
};

const handleSubmit = async (e) => {
  e.preventDefault();


  // CORREÇÃO: Usa a nova validação unificada para o bloqueio
  if (!isAuthenticated) {
    alert("Você precisa estar logado para realizar uma ação.");
    navigate("/loginusuario");
    return;
  }

  if (!horarioSelecionado) {
    return alert("Escolha um horário antes de continuar.");
  }

  const dados = {
    data_consulta: dataSelecionada.toISOString().split("T")[0],
    horario_consulta: horarioSelecionado,
    tipo: isAdmin && tipoAcaoAdm === "bloquear" ? "bloqueio" : "agendamento",
  };

  try {
    const res = await axios.post(
      "http://localhost:7006/agendamentos",
      dados,
      { 
        withCredentials: true
      }
    );

    console.log("Resposta do servidor:", res.data);
    alert(isAdmin && tipoAcaoAdm === "bloquear" ? "Horário bloqueado com sucesso!" : "Agendamento feito com sucesso!");
    
    setHorarioSelecionado("");
    buscarHorariosDaData();

  } catch (err) {
    console.error("Erro Axios:", err);
    const mensagemErro = err.response?.data?.error || "Erro ao agendar. Tente novamente mais tarde.";
    alert(mensagemErro);
  }
};

  const gerarHorarios = (inicio, fim) => {
    const horarios = [];
    for (let hora = inicio; hora <= fim; hora++) {
      horarios.push(`${hora.toString().padStart(2, "0")}:00H`);
    }
    return horarios;
  };

  const manha = ["08:30H", "09:30H", "10:30H", "11:30H"];
  const tarde = gerarHorarios(13, 16);
  const noite = ["19:00H", "19:30H", "20:00H", "20:30H"];

  const dataFormatada = dataSelecionada.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const carregarAgendamento = async () => {

    try {

        const res = await axios.get(
            `http://localhost:7006/agendamentos/${id}`,
            {
                withCredentials: true
            }
        );

        setDataSelecionada(new Date(res.data.data_consulta));

        setHorarioSelecionado(
            res.data.horario_consulta.substring(0,5) + "H"
        );

    } catch (err) {

        console.log(err);

    }

};




const buscarHorariosDaData = async () => {

  try {
    const data = dataSelecionada.toISOString().split("T")[0];
    const res = await axios.get(
      `http://localhost:7006/agendamentos/${data}`,
      { 
        withCredentials: true
      }
    );

    setHorariosOcupados(Array.isArray(res.data) ? res.data : []);

  } catch (err) {
    if (err.response && err.response.status === 401) {
      return;
    }
    console.error("Erro ao buscar horários:", err);
  }
};

useEffect(() => {
  buscarHorariosDaData();
}, [dataSelecionada]);

const verificarSeOcupado = (horario) => {
  return horariosOcupados.some(item => {
    if (!item.horario_consulta) return false;
    return item.horario_consulta.trim().substring(0, 5) === horario.trim().substring(0, 5);
  });
};

useEffect(() => {

  if (id) {
      carregarAgendamento();
  }

}, [id]);



return (
  <section className="container-agendamento">
    <div className="conteudo-agendamento">
      <div className="coluna-esquerda">
        <div className="caixa-psi">
          <img src={doutor} className="foto_agendamento" alt="Doutor" />
          <div className="info-psi">
            <h1>Dr. Romulo</h1>
            <p>
              Sou psicólogo especializado em ajudar pessoas a lidarem com ansiedade, autoestima e conflitos
              emocionais. Meu objetivo é oferecer um espaço seguro para você se expressar, compreender suas emoções e
              construir novas possibilidades.
            </p>
          </div>
        </div>

        <div className="calendario">
          <Calendario 
            value={dataSelecionada}
            onChange={(novaData) => {
              if (novaData) {
                setDataSelecionada(novaData);
                setHorarioSelecionado("");
              }
            }}
          />
        </div>
      </div>

      <div className="horarios">
        <h1>Horários Disponíveis</h1>
        <p>{dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1)}</p>

        {isAdmin && (
          <div className="painel-adm-botoes" style={{ margin: "10px 0", padding: "10px", background: "#f0f0f0", borderRadius: "5px" }}>
            <span style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Modo Admin:</span>
            <label style={{ marginRight: "15px", cursor: "pointer" }}>
              <input 
                type="radio" 
                name="acaoAdm" 
                checked={tipoAcaoAdm === "agendar"} 
                onChange={() => setTipoAcaoAdm("agendar")} 
              /> Agendar Livre
            </label>
            <label style={{ cursor: "pointer" }}>
              <input 
                type="radio" 
                name="acaoAdm" 
                checked={tipoAcaoAdm === "bloquear"} 
                onChange={() => setTipoAcaoAdm("bloquear")} 
              /> Apenas Bloquear Horário
            </label>
          </div>
        )}

        <h2>Manhã</h2>
        <div className="caixa-botoes">
          {manha.map((horario) => {
            const ocupado = verificarSeOcupado(horario);
            return (
              <button 
                key={horario} 
                disabled={ocupado}
                onClick={() => selecionarHorario(horario)}
                className={`botoes ${ocupado ? "ocupado" : ""} ${horarioSelecionado === horario ? "selecionado" : ""} `}
              >
                {horario}
              </button>
            );
          })}
        </div>

        <h2>Tarde</h2>
        <div className="caixa-botoes">
          {tarde.map((horario) => {
            const ocupado = verificarSeOcupado(horario);
            return (
              <button 
                key={horario} 
                disabled={ocupado}
                onClick={() => selecionarHorario(horario)}
                className={`botoes ${ocupado ? "ocupado" : ""} ${horarioSelecionado === horario ? "selecionado" : ""} `}
              >
                {horario}
              </button>
            );
          })}
        </div>

        <h2>Noite</h2>
        <div className="caixa-botoes">
          {noite.map((horario) => {
            const ocupado = verificarSeOcupado(horario);
            return (
              <button 
                key={horario} 
                disabled={ocupado}
                onClick={() => selecionarHorario(horario)}
                className={`botoes ${ocupado ? "ocupado" : ""} ${horarioSelecionado === horario ? "selecionado" : ""} `}
              >
                {horario}
              </button>
            );
          })}
        </div>

        {/* CORREÇÃO: A mensagem de erro agora some se o Admin estiver autenticado via localStorage */}
        {!isAuthenticated && (
          <span className="erro-login">
            Você precisa estar logado para realizar um agendamento.
            <br />
            <NavLink to="/loginusuario">Clique aqui para fazer login.</NavLink>
          </span>
        )}

        {/* CORREÇÃO: O botão fica ativo se for Admin válido */}
        <button onClick={handleSubmit} disabled={!isAuthenticated} className="agendamento">
          {isAdmin && tipoAcaoAdm === "bloquear" ? "Confirmar Bloqueio do Horário →" : "Confirmar Agendamento →"}
        </button>
      </div>
    </div>
  </section>
);
};

export default Agendamento;
