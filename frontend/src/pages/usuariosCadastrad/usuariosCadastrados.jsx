import "./UsuariosCadastrados.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
 
function UsuariosCadastrados() {
 
  const [lista, setLista] = useState([]);
  const navegacao = useNavigate();
 
  useEffect(() => {
    carregarUsuarios();
   
  }, []);
 
  //CARREAGR USUARIOS
  const carregarUsuarios = () => {
    axios.get('http://localhost:7006/usuarioscadastrados', {withCredentials: true})
    .then(res => {
      setLista(res.data);
    })
  }
 
  return (
    <main className="main-container">
      <div className="search-container">
 
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
 
          <input
            type="text"
            placeholder="Pesquisar"
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
 
            {[1, 2, 3, 4].map((item) => (
 
              <tr key={item}>
 
                <td></td>
                <td></td>
                <td></td>
                <td></td>
 
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