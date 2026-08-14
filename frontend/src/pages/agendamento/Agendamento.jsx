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

  if (!isAuthenticated) {
    alert("Você precisa estar logado para realizar uma ação.");
    navigate("/loginusuario");
    return;
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataEscolhida = new Date(dataSelecionada);
  dataEscolhida.setHours(0, 0, 0, 0);

  if (dataEscolhida < hoje) {
    alert ("Não é possível agendar em uma data passada.");
    return;
  }

  if (!horarioSelecionado) {
    alert("Escolha um horário antes de continuar.");
    return;
  }

  const dados = {
    data_consulta: dataSelecionada.toISOString().split("T")[0],
    horario_consulta: horarioSelecionado,
    tipo: isAdmin && tipoAcaoAdm === "bloquear"
      ? "bloqueio"
      : "agendamento",
  };

  try {

    let res;

    if (id) {

      res = await axios.put(
        `http://localhost:7006/agendamentos/${id}`,
        dados,
        {
          withCredentials: true,
        }
      );

    } else {

      res = await axios.post(
        "http://localhost:7006/agendamentos",
        dados,
        {
          withCredentials: true,
        }
      );

    }

    console.log("Resposta do servidor:", res.data);

    alert(
      id
        ? "Agendamento reagendado com sucesso!"
        : isAdmin && tipoAcaoAdm === "bloquear"
        ? "Horário bloqueado com sucesso!"
        : "Agendamento feito com sucesso!"
    );

    setHorarioSelecionado("");
    buscarHorariosDaData();

  } catch (err) {

    console.error("Erro Axios:", err);

    const mensagemErro =
      err.response?.data?.error ||
      "Erro ao agendar. Tente novamente mais tarde.";

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

      console.log(res.data);
  
      setDataSelecionada(new Date(res.data.data_consulta));
  
      setHorarioSelecionado(
        res.data.horario_consulta.substring(0, 5) + "H"
      );
  
    } catch (err) {
  
      console.log("Erro ao carregar agendamento:", err);
  
    }
  
  };




const buscarHorariosDaData = async () => {

  try {
    const data = dataSelecionada.toISOString().split("T")[0];
    const res = await axios.get(
      `http://localhost:7006/agendamentos/data/${data}`,
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

    <div className="titulo-agendamento">
      <span className="detalhe-titulo">✦</span>

      <h1>Agende sua consulta</h1>

      <p>
        Escolha a data e o melhor horário para você.
      </p>

      <div className="etapas-agendamento">
        <div className="etapa etapa-ativa">
          <span>1</span>
          <p>Data</p>
        </div>

        <div className="linha-etapa"></div>

        <div className="etapa">
          <span>2</span>
          <p>Horário</p>
        </div>

        <div className="linha-etapa"></div>

        <div className="etapa">
          <span>3</span>
          <p>Confirmação</p>
        </div>
      </div>
    </div>

    <div className="conteudo-agendamento">

      {/* COLUNA DO PROFISSIONAL */}
      <div className="coluna-esquerda">

        <div className="caixa-psi">

          <img
            src={doutor}
            className="foto_agendamento"
            alt="Dr. Romulo"
          />

          <div className="info-psi">

            <h1>Dr. Romulo</h1>

            <span className="cargo-psi">
              Psicólogo
            </span>

            <div className="linha-decorativa-agdm">
              ✦
            </div>

            <p>
              Atendimento acolhedor e personalizado para
              ajudar você a cuidar da sua saúde emocional.
            </p>

            <div className="info-extra-psi">
              <span>◉</span>
              <div>
                <strong>Atendimento</strong>
                <small>Presencial</small>
              </div>
            </div>

          </div>
        </div>


        {/* CALENDÁRIO */}
        <div className="calendario-container">

          <div className="titulo-calendario">
            <span>Escolha uma data</span>
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

          <div className="data-escolhida">

            <span className="icone-data">▣</span>

            <span>
              {dataFormatada.charAt(0).toUpperCase() +
                dataFormatada.slice(1)}
            </span>

          </div>

        </div>

      </div>


      {/* HORÁRIOS */}
      <div className="horarios">

        <div className="titulo-horarios">

          <h1>Escolha um horário disponível</h1>

          <p>
            Selecione um dos horários abaixo.
          </p>

        </div>


        {/* ADMIN */}
        {isAdmin && (
          <div className="painel-adm-botoes">

            <span className="titulo-admin">
              Modo administrador
            </span>

            <div className="opcoes-admin">

              <label className="opcao-admin">

                <input
                  type="radio"
                  name="acaoAdm"
                  checked={tipoAcaoAdm === "agendar"}
                  onChange={() => setTipoAcaoAdm("agendar")}
                />

                <span>Agendar horário</span>

              </label>

              <label className="opcao-admin">

                <input
                  type="radio"
                  name="acaoAdm"
                  checked={tipoAcaoAdm === "bloquear"}
                  onChange={() => setTipoAcaoAdm("bloquear")}
                />

                <span>Bloquear horário</span>

              </label>

            </div>

          </div>
        )}


        {/* MANHÃ */}
        <div className="grupo-horarios">

          <div className="titulo-periodo">
            <span className="icone-periodo">☀</span>
            <h2>Manhã</h2>
          </div>

          <div className="caixa-botoes">

            {manha.map((horario) => {

              const ocupado = verificarSeOcupado(horario);
              const selecionado = horarioSelecionado === horario;

              return (
                <button
                  key={horario}
                  disabled={ocupado}
                  onClick={() => selecionarHorario(horario)}
                  className={`botoes ${
                    ocupado ? "ocupado" : ""
                  } ${
                    selecionado ? "selecionado" : ""
                  }`}
                >

                  {selecionado && (
                    <span className="check-selecionado">
                      ✓
                    </span>
                  )}

                  {horario.replace("H", "")}

                </button>
              );

            })}

          </div>

        </div>


        {/* TARDE */}
        <div className="grupo-horarios">

          <div className="titulo-periodo">
            <span className="icone-periodo">☀</span>
            <h2>Tarde</h2>
          </div>

          <div className="caixa-botoes">

            {tarde.map((horario) => {

              const ocupado = verificarSeOcupado(horario);
              const selecionado = horarioSelecionado === horario;

              return (
                <button
                  key={horario}
                  disabled={ocupado}
                  onClick={() => selecionarHorario(horario)}
                  className={`botoes ${
                    ocupado ? "ocupado" : ""
                  } ${
                    selecionado ? "selecionado" : ""
                  }`}
                >

                  {selecionado && (
                    <span className="check-selecionado">
                      ✓
                    </span>
                  )}

                  {horario.replace("H", "")}

                </button>
              );

            })}

          </div>

        </div>


        {/* NOITE */}
        <div className="grupo-horarios">

          <div className="titulo-periodo">
            <span className="icone-periodo">☾</span>
            <h2>Noite</h2>
          </div>

          <div className="caixa-botoes">

            {noite.map((horario) => {

              const ocupado = verificarSeOcupado(horario);
              const selecionado = horarioSelecionado === horario;

              return (
                <button
                  key={horario}
                  disabled={ocupado}
                  onClick={() => selecionarHorario(horario)}
                  className={`botoes ${
                    ocupado ? "ocupado" : ""
                  } ${
                    selecionado ? "selecionado" : ""
                  }`}
                >

                  {selecionado && (
                    <span className="check-selecionado">
                      ✓
                    </span>
                  )}

                  {horario.replace("H", "")}

                </button>
              );

            })}

          </div>

        </div>


        {/* LEGENDA */}
        <div className="legenda-horarios">

          <div>
            <span className="bolinha disponivel"></span>
            Disponível
          </div>

          <div>
            <span className="bolinha indisponivel"></span>
            Indisponível
          </div>

          <div>
            <span className="bolinha selecionado-legenda"></span>
            Selecionado
          </div>

        </div>


        {/* RESUMO */}
        {horarioSelecionado && (

          <div className="resumo-agendamento">

            <p>Horário selecionado</p>

            <strong>
              {dataFormatada.charAt(0).toUpperCase() +
                dataFormatada.slice(1)}
              {" "}às{" "}
              {horarioSelecionado.replace("H", "")}
            </strong>

          </div>

        )}


        {/* ERRO LOGIN */}
        {!isAuthenticated && (

          <span className="erro-login">

            Você precisa estar logado para realizar um agendamento.

            <br />

            <NavLink to="/loginusuario">
              Clique aqui para fazer login.
            </NavLink>

          </span>

        )}


        {/* BOTÃO */}
        <button
          onClick={handleSubmit}
          disabled={!isAuthenticated || !horarioSelecionado}
          className="agendamento"
        >

          {isAdmin && tipoAcaoAdm === "bloquear"
            ? "Confirmar bloqueio"
            : "Confirmar agendamento"}

          <span>→</span>

        </button>

      </div>

    </div>

  </section>
);
};

export default Agendamento;
