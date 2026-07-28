import "./UsuariosCadastrados.css";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

function UsuariosCadastrados() {
 
  const [pesquisa, setPesquisa] = useState("");

  const [lista, setLista] = useState([]);
  const navegacao = useNavigate();
 
  useEffect(() => {
    carregarUsuarios();
  }, []);


  const usuariosFiltrados = lista.filter((item) =>
        (item.nome || "")
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
    );
 
  //CARREAGR USUARIOS
  async function carregarUsuarios() {
    try {
      const resposta = await axios.get(
        "http://localhost:7006/usuarioscadastrados",
        { withCredentials: true }
      );

      setLista(Array.isArray(resposta.data) ? resposta.data : []);
    } catch (erro) {
      console.log(erro);
      setLista([]);
    }
  }


  return (
    <>
    <div className="listas-usuarios">

        <h1 className="consultas-titulo">
          Usuarios Cadastrados
        </h1>

      <div className="search-container">
 
        <div className="campo-pesquisa">

          <FaSearch className="icone-pesquisa"/>
 
          <input
            className="consultas-input"
            type="text"
            placeholder="Pesquisar"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
 
      </div>
 
      <div className="table-container">
        <table className="consultas-tabela">
          <thead className="consultas-cabecalho">
 
            <tr>
              <th className="coluna-id">ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
 
          </thead>
         
          <tbody>
 
            {usuariosFiltrados.map((item) => (
 
              <tr 
              className="linha-consulta"
              key={item.id_cliente}>
 
                <td>
                  {item.id_cliente}
                </td>

                <td>
                  {item.nomecompleto}
                </td>

                <td>
                  {item.email}
                </td>

                <td className="acoes">
 
                  <button className="btn-editar">
                    <i className="fa-solid fa-pen"></i>
                    Editar
                  </button>
 
                  <button className="btn-excluir">
                    <i className="fa-solid fa-trash"></i>
                    Excluir
                  </button>
 
                </td>
 
              </tr>
 
            ))}
 
          </tbody>
 
        </table>
 
      </div>
 </div>
    </>
  );
}
 
export default UsuariosCadastrados;