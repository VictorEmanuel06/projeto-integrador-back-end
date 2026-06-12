import React from "react";
import "./loginUsuario.css";
import { NavLink } from "react-router-dom";

function LoginUsuario() {
  return (
    <main>
      <div className="card-usuario">
        <h1 className="card-login-h1">Login</h1>

        <p className="descricao-usuario">
          Realize o Login para acessar a agenda
        </p>

        <form className="form-usuario">
          <label className="label-usuario">Login atual</label>
          <input type="text" placeholder="exemplo@email.com"/>

          <label className="label-usuario">Senha</label>
          <input className="password-usuario" type="password" />
          <NavLink to="/recuperarsenhausuario" className="esqueci-senha-usuario">Esqueci minha senha!</NavLink>

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