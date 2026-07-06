import "./loginUsuario.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ValidacaoDeLogin from "../../services/ValidacaodeLogin";
import axios from "axios";


const LoginUsuario = () => {
  const [valores, setValores] = useState({
    email: "",
    password: ""
  });

  const navegacao = useNavigate();

  const [errors, setErrors] = useState ({
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    setValores(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:7006', { withCredentials: true })
    .then( res => {
      if(res.data.valid){
        navegacao('/')
      }
    })
    .catch(err => console.log(err))
  }, [navegacao]);

  const handleSubimt = async (event) => {
    event.preventDefault();
     
   const Validacao = ValidacaoDeLogin(valores);
   setErrors(Validacao);

    if(Validacao.email === "" && Validacao.password === ""){
      axios.post('http://localhost:7006/loginusuario', valores, {withCredentials: true})
      .then(res => {

        console.log("LOGIN:", res.data);
    
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            id: res.data.id,
            nomecompleto: res.data.nomecompleto
          })
        );
    
        console.log(
          "SALVO:",
          JSON.parse(localStorage.getItem("usuario"))
        );
    
        navegacao("/");
    })
      .catch(err => {
        if (err.response && err.response.status === 401) {
            alert("Email ou senha inválidos");
        } else {
          console.log(err);
        }
      });
    }
  }

  return (
    
    <div className="container-login-user">
      <div className="card-usuario">
        <h1 className="card-login-h1">Login</h1>

        <p className="descricao-usuario">
          Realize o Login para acessar a agenda
        </p>

        <form action="" onSubmit={handleSubimt} className="form-usuario">

          <div>
            <label htmlFor="email" className="label-usuario">Login atual</label>
            <input type="text" placeholder="exemplo@email.com" name="email" id="email" autoComplete="email"
            onChange={handleInput} />
            <span>{errors.email}</span>
          </div>

          <div>
            <label htmlFor="password" className="label-usuario-senha">Senha</label>
            <input className="password-usuario" type="password" name="password" id="password" autoComplete="current-password"
            onChange={handleInput}/>
            <span>{errors.password}</span>
            <NavLink to="/recuperarsenhausuario" className="esqueci-senha-usuario">Esqueci minha senha!</NavLink>
          </div>

          <div className="alerta">
            Nunca compartilhamos seus
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
    </div>
      
  );
}

export default LoginUsuario;