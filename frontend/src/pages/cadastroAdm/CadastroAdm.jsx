import { NavLink, useNavigate } from "react-router-dom";
import ValidacaodeCadastroAdm from "../../services/ValidacaodeCadastroAdm";
import { useState } from "react";
import "./CadastroAdm.css";
import axios from "axios";
 
const CadastroAdm = () => {
  const [valores, setValores] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navegacao = useNavigate();
 
  const [errors, setErrors] = useState({})
 
  const handleInput = (event) => {
    setValores((prev) => ({...prev, [event.target.name]: event.target.value,}));
  }
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(ValidacaodeCadastroAdm(valores));
 
    if(
      errors.name === "" &&
      errors.email === "" &&
      errors.password === ""
    ) {
       axios.post('http://localhost:7006/cadastroadm', valores)
       .then(res => {
        console.log(res);
        navegacao("/loginadm");
       })
       .catch(err => console.log(err));
    }
}
 
  return (
    <div className="card-cadAdm">
      <h1 className="title-cadAdm">Cadastro</h1>
 
      <p className="subtitle-cadAdm">
        Cadastre-se para acessar o site.
      </p>
 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            name="name"
            value={valores.name} // <-- ADICIONADO: Controla o input
            onChange={handleInput}
          />
          {errors.name && <span className="erro">{errors.name}</span>}
        </div>
 
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            value={valores.email} // <-- ADICIONADO: Controla o input
            onChange={handleInput}
          />
          {errors.email && <span className="erro">{errors.email}</span>}
        </div>
 
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            value={valores.password} // <-- ADICIONADO: Controla o input
            onChange={handleInput}
          />
          {errors.password && (
            <span className="erro">{errors.password}</span>
          )}
        </div>
 
        <div className="info-cadAdm">
          Seus dados são protegidos por protocolos de segurança.
          Não compartilhamos informações pessoais com terceiros.
        </div>
 
        <button type="submit" className="btn">
          Cadastrar conta →
        </button>
 
        <div className="login-adm">
          Já possui uma conta?
          <a href="/loginadm"> Clique para fazer login</a>
        </div>
      </form>
    </div>
  )
}
 
export default CadastroAdm;
 