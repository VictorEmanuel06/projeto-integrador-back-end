import React, { useState } from "react";
import "./LoginAdm.css";
import { NavLink } from "react-router-dom";
import ValidacaodeLoginAdm from "../../services/ValidacaodeLoginAdm";
 
const LoginAdm = () => {
  const [valores, setValores] = useState({
    email: "",
    password: "",
  });
 
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
 
  const handleInput = (event) => {
    setValores({
      ...valores,
      [event.target.name]: event.target.value,
    });
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
 
    const validationErrors = ValidacaodeLoginAdm(valores);
    setErrors(validationErrors);
 
    const semErros = Object.values(validationErrors).every((erro) => erro === "");
 
    if (semErros) {
      alert("Login realizado com sucesso!");
      console.log(valores);
      // axios.post() aqui
    }
  };
 
  return (
    <div className="card-loginAdm">
      <h1 className="title-loginAdm">Login</h1>
 
      <p className="subtitle-adm">
        Faça o login para acessar o site.
      </p>
 
      {/* noValidate impede o navegador de mostrar aquele balão flutuante */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-adm">
          <label>E-mail</label>
 
          <input
            type="email"
            name="email"
            value={valores.email}
            onChange={handleInput}
          />
 
          {/* O erro agora aparece fixo aqui embaixo, igual ao da senha */}
          {errors.email && (
            <span className="erro">{errors.email}</span>
          )}
        </div>
 
        <div className="form-adm">
          <label>Senha</label>
 
          <input
            type="password"
            name="password"
            value={valores.password}
            onChange={handleInput}
          />
 
          {errors.password && (
            <span className="erro">{errors.password}</span>
          )}
 
          <NavLink
            to="/recuperarsenhaadm"
            className="esquecisenhaadm"
          >
            Esqueci minha senha
          </NavLink>
        </div>
 
        <div className="info-adm">
          Seus dados são protegidos por protocolos de segurança.
          Não compartilhamos informações pessoais com terceiros.
        </div>
 
        <button type="submit" className="btn-loginAdm">
          Logar →
        </button>
 
        <div className="login-adm">
          Não possui uma conta?
          <NavLink
            to="/cadastroadm"
            className="redi-cad-adm"
          >
            Clique para fazer o cadastro
          </NavLink>
        </div>
      </form>
    </div>
  );
};
 
export default LoginAdm;