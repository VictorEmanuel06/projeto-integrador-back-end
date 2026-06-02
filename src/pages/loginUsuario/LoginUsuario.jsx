import React from "react";
import "./loginUsuario.css";

function LoginUsuario() {
  return (
    <main>
      <div className="card">
        <h1>Login</h1>

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

          <button type="submit">
            ENTRAR
          </button>

          <a href="#" className="cancelar">
            Cancelar
          </a>
        </form>
      </div>
    </main>
  );
}

export default LoginUsuario;