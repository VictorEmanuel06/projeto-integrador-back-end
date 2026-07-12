import "./ListaDeAgendamento.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListadeAgendamento = () => {

    const [pesquisa, setPesquisa] = useState("");
    const navigate = useNavigate();

    const [consultas, setConsultas] = useState([]);

   useEffect(() => {
    carregarConsultas();
   }, []);

   async function carregarConsultas() {
    try {

        const resposta = await axios.get(
            "http://localhost:7006/agendamentos",
            {
                withCredentials: true
            }
        );

        setConsultas(resposta.data);
    } catch (erro) {
        console.log(erro);
    }
   }


const consultasFiltradas = consultas.filter((consulta) =>
        (consulta.nomeCliente || "")
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
    );

    const alterarStatus = (id, novoStatus) => {

    setConsultas((consultasAtuais) =>
        consultasAtuais.map((consulta) =>
            consulta.id === id
                ? { ...consulta, status: novoStatus }
                : consulta
        )
    );

};


  return (
    <>
    <div className="consultas">

    <h1 className="consultas-titulo">
        Consultas Agendadas
    </h1>


    <div className="consultas-topo">

        <div className="campo-pesquisa">

            <FaSearch className="icone-pesquisa" />

            <input
                className="consultas-input"
                type="text"
                placeholder="Pesquisar paciente..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />
        </div>


        {/* <button className="botao-nova-consulta">
            Nova Consulta
        </button> */}

    </div>

<div className="tabela-container">
    <table className="consultas-tabela">

        <thead className="consultas-cabecalho">

            <tr>

                <th className="coluna-id">
                    ID
                </th>

                <th>
                    Cliente
                </th>

                <th>
                    Data da Consulta
                </th>

                <th>
                    Horário
                </th>

                <th>
                    Status
                </th>

                <th>
                    Ações
                </th>

            </tr>

        </thead>



        <tbody>


            {consultasFiltradas.map((consulta)=>(

                <tr 
                    className="linha-consulta"
                    key={consulta.id}
                >


                    <td>
                        {consulta.id}
                    </td>


                    <td>
                        {consulta.nomeCliente}
                    </td>


                    <td>
                        {consulta.dataConsulta}
                    </td>


                    <td>
                        {consulta.horarioConsulta}
                    </td>


                    <td>

                        <span className={`status-${consulta.status.toLowerCase()}`}>

                            {consulta.status}

                        </span>

                    </td>



                    <td className="acoes">


                        <button 
                            className="botao-reagendar"
                            onClick={() => navigate(`/agendamento/${consulta.id}`)}
                        >

                            Reagendar

                        </button>



                        <button 
                            className="botao-cancelar"
                             onClick={() => alterarStatus(consulta.id, "CANCELADO" )}
                        >

                            Cancelar

                        </button>

                        <button 
                            className="botao-confirmar"
                             onClick={() => alterarStatus(consulta.id, "CONFIRMADO" )}
                        >

                            Confirmar

                        </button>


                    </td>


                </tr>

            ))}


        </tbody>


    </table>
</div>
<div className="consultas-cards">

{consultasFiltradas.map((consulta) => (

    <div className="consulta-card" key={consulta.id}>

        <h3>{consulta.nomeCliente}</h3>

        <p>
            <strong>ID:</strong> {consulta.id}
        </p>

        <p>
            <strong>Data:</strong> {consulta.dataConsulta}
        </p>

        <p>
            <strong>Horário:</strong> {consulta.horarioConsulta}
        </p>

        <p>
            <strong>Status:</strong>

            <span className={`status-${consulta.status.toLowerCase()}`}>
                {" "}{consulta.status}
            </span>

        </p>

        <div className="acoes-card">

            <button
             className="botao-reagendar"
             onClick={() => navigate(`/agendamento/${consulta.id}`)}
             >
                Reagendar
            </button>

            <button
             className="botao-cancelar"
             onClick={() => alterarStatus(consulta.id, "CANCELADO" )}
             >
                Cancelar
            </button>

            <button 
            className="botao-confirmar"
            onClick={() => alterarStatus(consulta.id, "CONFIRMADO" )}
            
            >
                Confirmar
            </button>

        </div>

    </div>

))}

</div>


</div>
</>
  )
}

export default ListadeAgendamento;