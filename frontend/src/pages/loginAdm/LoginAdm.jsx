import "./LoginAdm.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ValidacaodeLoginAdm from "../../services/ValidacaodeLoginAdm";
 
const LoginAdm = () => {
  const [valores, setValores] = useState({
    email: "",
    password: "",
  });

  const navegacao = useNavigate();
 
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
 
  const handleInput = (event) => {
    setValores(prev => ({...prev, [event.target.name]: event.target.value,}))
  }

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:7006')
    .then( res => {
      if(res.data.valid){
        navegacao('/')
      }
    })
    .catch(err => console.log(err))
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(ValidacaodeLoginAdm(valores));
 
    if(errors.email === "" && errors.password === ""){
      axios.post('http://localhost:7006/loginadm', valores, { withCredentials: true })
      .then(res => {
        console.log("RESPOSTA:", res.data);

        if(res.data.success ) {
          console.log(res.data);
          navegacao("/");
        } else {
          alert("Registro inexistente");
        }
      })
      .catch(err => console.log(err));
    }
  }
 
  return (
    <div className="card-loginAdm">
      <h1 className="title-loginAdm">Login</h1>
 
      <p className="subtitle-adm">
        Faça o login para acessar o site.
      </p>
 
      {/* noValidate impede o navegador de mostrar aquele balão flutuante */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-adm">
          <label htmlFor="email">E-mail</label>
 
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={valores.email}
            onChange={handleInput}
          />
 
          {/* O erro agora aparece fixo aqui embaixo, igual ao da senha */}
          {errors.email && (
            <span className="erro">{errors.email}</span>
          )}
        </div>
 
        <div className="form-adm">
          <label htmlFor="password">Senha</label>
 
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
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
  )
}

 
export default LoginAdm;