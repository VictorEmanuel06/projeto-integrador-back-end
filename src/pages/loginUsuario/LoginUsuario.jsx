import React from "react";
import "./loginUsuario.css";
import { NavLink } from "react-router-dom";

function LoginUsuario() {
  return (
    <main>
      <div className="card">
        <h1 className="card_login_h1">Login</h1>

        <p className="descricao">
          Realize o Login para acessar a agenda
        </p>

        <form>
          <label>Login atual</label>
          <input type="text" />

          <label>Senha</label>
          <input type="password" />

          <div className="alerta">
            Certifique-se de que sua senha contenha letras,
            números e símbolos. Nunca compartilhamos seus
            dados de acesso e sua privacidade é nossa prioridade absoluta.
          </div>

          <button className="entrar" type="submit">
            ENTRAR
          </button>

          <NavLink to="/" className="cancelar">
            Cancelar
          </NavLink>

          <NavLink to="/cadastrousuario"  className="btn_cadastro">Ainda não tem cadastro? Click aqui</NavLink>

        </form>
      </div>
    </main>
  );
}

export default LoginUsuario;