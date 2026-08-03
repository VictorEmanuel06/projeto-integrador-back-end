import { NavLink } from "react-router-dom";
import "./EditarUsuario.css";
import { useState } from "react";

function EditarUsuario() {
  const [dados, setDados] = useState({
    id: "1",
    nome: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDados((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(dados);
  };

  return (
    <div className="alterar-container">
      <div className="alterar-card">

        <h2 className="alterar-titulo">Alteração de Dados</h2>

        <form className="alterar-formulario" onSubmit={handleSubmit}>

          <div className="alterar-campo">
            <label className="alterar-label">ID</label>

            <input
              className="alterar-input"
              type="text"
              name="id"
              value={dados.id}
              disabled
            />
          </div>

          <div className="alterar-campo">
            <label className="alterar-label">Nome</label>

            <input
              className="alterar-input"
              type="text"
              name="nome"
              value={dados.nome}
              onChange={handleChange}
              placeholder="Digite o nome"
            />
          </div>

          <div className="alterar-campo">
            <label className="alterar-label">Email</label>

            <input
              className="alterar-input"
              type="email"
              name="email"
              value={dados.email}
              onChange={handleChange}
              placeholder="Digite o e-mail"
            />
          </div>

          <div className="alterar-botoes">

          <NavLink to="/usuarioscadastrados" className="btn-voltar-cad">
            <button
              type="button"
              className="alterar-btn-cancelar"
            >
              Cancelar
            </button>
          </NavLink>

            <button
              type="submit"
              className="alterar-btn-salvar"
            >
              Salvar Alterações
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditarUsuario;