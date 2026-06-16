import React from 'react'
import "./LoginAdm.css";
import { NavLink } from "react-router-dom";
 
const LoginAdm = () => {
  return (
 
    <div class="card-loginAdm">
 
      <h1 class="title-loginAdm">Login</h1>
 
      <p class="subtitle-adm">
        Faça o login para acessar o site.
      </p>
 
      <div class="form-adm">
        <label>E-mail</label>
        <input type="email"></input>
      </div>
 
      <div class="form-adm">
        <label>Senha</label>
        <input type="password"></input>
        <NavLink to="/recuperarsenhaadm" className="esquecisenhaadm">Esqueci minha senha</NavLink>
      </div>

 
      <div class="info-adm">
        Seus dados são protegidos por protocolos de segurança.
        Não compartilhamos informações pessoais com terceiros.
      </div>
 
      <button class="btn-loginAdm">
        Logar →
      </button>
 
      <div class="login-adm">
        Não possui uma conta?
        <NavLink to="/cadastroadm" className="redi-cad-adm"> Clique para fazer o cadastro</NavLink>
      </div>
 
    </div>
 
  );
 
}
 
export default LoginAdm