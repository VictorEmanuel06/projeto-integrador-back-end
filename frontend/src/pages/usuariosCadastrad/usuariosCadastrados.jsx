import "./UsuariosCadastrados.css";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

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
    <main className="main-container">
      <div className="search-container">
 
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
 
          <input
            type="text"
            placeholder="Pesquisar"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
 
      </div>
 
      <div className="table-card">
 
        <table>
 
          <thead>
 
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th className="acoes">Ações</th>
            </tr>
 
          </thead>
         
          <tbody>
 
            {usuariosFiltrados.map((item) => (
 
              <tr key={item.id_cliente}>
 
                <td>
                  {item.id_cliente}
                </td>

                <td>
                  {item.nomecompleto}
                </td>

                <td>
                  {item.email}
                </td>

                <td>
 
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
 
    </main>
  );
}
 
export default UsuariosCadastrados;