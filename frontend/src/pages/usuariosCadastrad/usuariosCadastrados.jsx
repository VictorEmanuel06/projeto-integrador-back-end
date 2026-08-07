import "./UsuariosCadastrados.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

function UsuariosCadastrados() {
  const [pesquisa, setPesquisa] = useState("");
  const [lista, setLista] = useState([]);
  const navegacao = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const usuariosFiltrados = lista.filter((item) =>
    (item.nomecompleto || "")
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  // CARREGAR USUARIOS
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

  // EXCLUIR USUARIO
 async function excluirUsuario(id) {
  const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
  if (!confirmar) return;

  try {
    await axios.delete(`http://localhost:7006/usuarioscadastrados/${id}`, {
      withCredentials: true,
    });

    setLista((listaAtual) => listaAtual.filter((item) => item.id_cliente !== id));
    toast.success("Usuário excluído com sucesso!");
  } catch (erro) {
    console.log(erro);
    toast.error("Erro ao excluir o usuário.");
  }
}

  return (
    <>
      <div className="listas-usuarios">
        <h1 className="consultas-titulo">Usuarios Cadastrados</h1>

        <div className="search-container">
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
        </div>

        {/* TABELA */}
        <div className="table-container">
          <table className="consultas-tabela">
            <thead className="consultas-cabecalho">
              <tr>
                <th className="coluna-id">ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr className="linha-consulta" key={usuario.id_cliente}>
                  <td>{usuario.id_cliente}</td>
                  <td>{usuario.nomecompleto}</td>
                  <td>{usuario.email}</td>

                  <td className="acoes">
                    <NavLink
                      to={`/editarusuario/${usuario.id_cliente}`}
                      className="button-editar"
                    >
                      <button className="btn-editar">
                        <i className="fa-solid fa-pen"></i> Editar
                      </button>
                    </NavLink>

                    <button
                      className="btn-excluir"
                      onClick={() => excluirUsuario(usuario.id_cliente)}
                    >
                      <i className="fa-solid fa-trash"></i> Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CARDS PARA TELAS MENORES */}
        <div className="usuarios-cards">
          {usuariosFiltrados.map((item) => (
            <div className="usuario-card" key={item.id_cliente}>
              <h3>{item.nomecompleto}</h3>

              <p>
                <strong>ID:</strong> {item.id_cliente}
              </p>

              <p>
                <strong>Email:</strong> {item.email}
              </p>

              <div className="acoes-card">
                <NavLink to={`/editarusuario/${item.id_cliente}`}>
                  <button className="btn-editar">
                    <i className="fa-solid fa-pen"></i> Editar
                  </button>
                </NavLink>

                <button
                  className="btn-excluir"
                  onClick={() => excluirUsuario(item.id_cliente)}
                >
                  <i className="fa-solid fa-trash"></i> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UsuariosCadastrados;