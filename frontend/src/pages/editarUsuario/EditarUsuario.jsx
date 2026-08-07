import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./EditarUsuario.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    id: id || "",
    nome: "",
    email: "",
  });

  const [carregando, setCarregando] = useState(true);

  // Busca os dados do usuário quando a tela carrega
// EditarUsuario.jsx - ajuste dentro do useEffect

useEffect(() => {
  fetch(`http://localhost:7006/usuarios/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao buscar usuário");
      return res.json();
    })
    .then((data) => {
      setDados({
        id: data.id_cliente,
        nome: data.nomecompleto,
        email: data.email,
      });
      setCarregando(false);
    })
    .catch((err) => {
      console.error(err);
      setCarregando(false);
    });
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  fetch(`http://localhost:7006/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: dados.nome,
      email: dados.email,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao atualizar usuário");
      return res.json();
    })
    .then(() => {
      toast.success("Usuário atualizado com sucesso!");
      setTimeout(() => navigate("/usuarioscadastrados"), 1500); // Aguarda o toast aparecer antes de redirecionar
    })
    .catch((err) => {
      console.error(err);
      toast.error("Falha ao salvar as alterações.");
    });
};

  if (carregando) {
    return <div className="alterar-container"><p>Carregando dados...</p></div>;
  }

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
              required
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
              required
            />
          </div>

          <div className="alterar-botoes">
            <NavLink to="/usuarioscadastrados" className="btn-voltar-cad">
              <button type="button" className="alterar-btn-cancelar">
                Cancelar
              </button>
            </NavLink>

            <button type="submit" className="alterar-btn-salvar">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuario;