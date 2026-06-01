import React from "react";
import "./loginAdm.css";

function LoginAdm() {
  return (
    <main>
      <div className="card">
        <h1>Login ADMIN!</h1>

        <p className="descricao">
          Login administrativo do SITE
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

export default LoginAdm;