import "./ListaDeAgendamento.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListadeAgendamento = () => {

    const [pesquisa, setPesquisa] = useState("");
    const navigate = useNavigate();


   const [consultas, setConsultas] = useState([

    {
        id: 1,
        nomeCliente: "João Silva",
        dataConsulta: "07/07/2026",
        horarioConsulta: "14:00",
        status: "CONFIRMADO"
    },


    {
        id: 2,
        nomeCliente: "Maria Oliveira",
        dataConsulta: "08/07/2026",
        horarioConsulta: "15:30",
        status: "AGENDADO"
    },


    {
        id: 3,
        nomeCliente: "Pedro Santos",
        dataConsulta: "09/07/2026",
        horarioConsulta: "09:00",
        status: "CANCELADO"
    },

    {
        id: 4,
        nomeCliente: "Ricardo Junior",
        dataConsulta: "10/07/2026",
        horarioConsulta: "09:00",
        status: "CONFIRMADO"
    }

]);


const consultasFiltradas = consultas.filter((consulta) =>
        consulta.nomeCliente
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
</>
  )
}

export default ListadeAgendamento;