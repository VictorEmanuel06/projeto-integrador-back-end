import "./loginUsuario.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ValidacaoDeLogin from "../../services/ValidacaodeLogin";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function LoginUsuario() {
  const [valores, setValores] = useState({
    email: "",
    password: ""
  });

  const navegacao = useNavigate();
  const { setUsuarioLogado } = useAuth();

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    setValores(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:7006', { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          navegacao('/');
          window.location.reload();
        }
      })
      .catch(err => console.log(err));
  }, [navegacao]);

  const handleSubimt = async (event) => {
    event.preventDefault();

    const validacao = ValidacaoDeLogin(valores);
    setErrors(validacao);

    if (validacao.email === "" && validacao.password === "") {
      axios.post('http://localhost:7006/loginusuario', valores, { withCredentials: true })
        .then(res => {
          console.log("LOGIN:", res.data);

          localStorage.setItem(
            "usuario",
            JSON.stringify({
              id: res.data.id,
              nomecompleto: res.data.nomecompleto
            })
          );

          setUsuarioLogado(true);
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
  };

  return (
      <div className="card-loginusuario">
        <h1 className="title-loginusuario">Login</h1>

        <p className="subtitle-usuario">
          Realize o Login para acessar a agenda
        </p>

        <form onSubmit={handleSubimt} noValidate>

          <div className="form-usuario">
            <label htmlFor="email">Email</label>

            <input 
            type="text"
            placeholder="exemplo@email.com"
            name="email"
            id="email"
            autoComplete="email"
            onChange={handleInput} />

            <span>{errors.email}</span>
          </div>

          <div className="form-usuario">
            <label htmlFor="password">Senha</label>

            <input
            className="password-usuario"
            type="password" name="password"
            id="password"
             placeholder="***********"
            autoComplete="current-password"
            onChange={handleInput} />
            
            <span>{errors.password}</span>
            <NavLink to="/recuperarsenhausuario" className="esqueci-senha-usuario">Esqueci minha senha!</NavLink>
          </div>

          <div className="alerta">
            Nunca compartilhamos seus
            dados de acesso e sua privacidade é nossa prioridade absoluta.
          </div>

          <button className="btn-loginusuario" type="submit">
            Logar →
          </button>

          <NavLink to="/" className="cancelar"> 
            Cancelar
          </NavLink>

          <div className="login-usuario">
            Não possui uma conta?
            <NavLink
              to="/cadastrousuario"
              className="redi-cad-usuario"
              >
                Clique aqui para fazer o cadastro
              </NavLink>
          </div>
          {/* Coloque logo abaixo do link de cadastro ou antes de fechar a tag </form> */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <NavLink 
              to="/loginadm" 
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#f8fafc",
                color: "#475569",
                fontSize: "0.85rem",
                fontWeight: "500",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <i className="fa-solid fa-shield-halved"></i> Acesso da Equipe / ADM
            </NavLink>
          </div>

          {/* <NavLink to="/loginadm" className="btn-login-adm">Login Adiministrativo</NavLink> */}

        </form>
      </div>
  );
}

export default LoginUsuario;