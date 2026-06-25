// import "./usuarioCadastrado.css";
// import { NavLink } from "react-router-dom";

const usuarioCadastrado = () => {
  return (
  <div className="container">

    <div className="search-bar">
      <span className="icon">🔍</span>
      <input type="text" placeholder="Pesquisar" />
    </div>

    
    <div className="card">

      <div className="actions">
        <button className="btn edit">Editar</button>
        <button className="btn delete">Excluir</button>
      </div>

      <div className="content">
    
      </div>

    </div>

  </div>
  )
}

export default usuarioCadastrado;