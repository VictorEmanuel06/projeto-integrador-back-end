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

const [mostrarSenha, setMostrarSenha] = useState(false);

  const navegacao = useNavigate();
  const { setUsuarioLogado } = useAuth();

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    setValores((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:7006", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          navegacao("/");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }, [navegacao]);

  const handleSubimt = async (event) => {
    event.preventDefault();

    const validacao = ValidacaoDeLogin(valores);
    setErrors(validacao);

    if (validacao.email === "" && validacao.password === "") {
      axios
        .post(
          "http://localhost:7006/loginusuario",
          valores,
          { withCredentials: true }
        )
        .then((res) => {
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
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("Email ou senha inválidos");
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <main className="login-page">

      {/* Elementos decorativos */}
      <div className="login-decoration login-decoration-left">
        <span>❧</span>
        <span>❧</span>
      </div>

      <div className="login-decoration login-decoration-right">
        <span>❧</span>
        <span>❧</span>
      </div>

      <section className="card-loginusuario">

        {/* Ícone */}
        <div className="login-iconp">
          <i className="fa-regular fa-user"></i>
        </div>

        <h1 className="title-loginusuario">
          Login
        </h1>

        <p className="subtitle-usuario">
          Realize o login para acessar a agenda
        </p>

        <div className="login-divider">
          <span></span>
          <i>♧</i>
          <span></span>
        </div>

        <form onSubmit={handleSubimt} noValidate>

          {/* EMAIL */}
          <div className="form-usuario">

            <label htmlFor="email">
              E-mail
            </label>

            <div className="input-wrapper">
              <i className="fa-regular fa-envelope"></i>

              <input
                type="email"
                placeholder="seuemail@email.com"
                name="email"
                id="email"
                autoComplete="email"
                value={valores.email}
                onChange={handleInput}
              />
            </div>

            {errors.email && (
              <span className="error-message">
                {errors.email}
              </span>
            )}

          </div>

          {/* SENHA */}
          <div className="form-usuario">

            <label htmlFor="password">
              Senha
            </label>

       <div className="input-wrapper">

  <i className="fa-solid fa-lock"></i>

  <input
    className="password-usuario"
    type={mostrarSenha ? "text" : "password"}
    name="password"
    id="password"
    placeholder="••••••••••"
    autoComplete="current-password"
    value={valores.password}
    onChange={handleInput}
  />

  <button
  type="button"
  className="password-eye"
  onClick={() => setMostrarSenha(!mostrarSenha)}
  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
>
  <i
    className={
      mostrarSenha
        ? "fa-regular fa-eye-slash"
        : "fa-regular fa-eye"
    }
  ></i>
</button>

</div>

            {errors.password && (
              <span className="error-message">
                {errors.password}
              </span>
            )}

            <NavLink
              to="/recuperarsenhausuario"
              className="esqueci-senha-usuario"
            >
              Esqueci minha senha!
            </NavLink>

          </div>

          {/* AVISO */}
          <div className="alerta">

            <div className="alerta-icon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>

            <p>
              Nunca compartilhamos seus dados de acesso
              e sua privacidade é nossa prioridade absoluta.
            </p>

          </div>

          {/* BOTÃO LOGIN */}
          <button
            className="btn-loginusuario"
            type="submit"
          >
            Entrar
            <span>→</span>
          </button>

          {/* OU */}
          <div className="login-ou">
            <span></span>
            <p>OU</p>
            <span></span>
          </div>

          {/* CANCELAR */}
          <NavLink
            to="/"
            className="cancelar"
          >
            Cancelar
          </NavLink>

          {/* CADASTRO */}
          <div className="login-usuario">

            <span>
              Não possui uma conta?
            </span>

            <NavLink
              to="/cadastrousuario"
              className="redi-cad-usuario"
            >
              Clique aqui para fazer o cadastro
            </NavLink>

          </div>

          {/* ADMIN */}
          <div className="adm-container">

            <NavLink
              to="/loginadm"
              className="btn-login-adm"
            >
              <i className="fa-solid fa-shield-halved"></i>
              Acesso da Equipe / ADM
            </NavLink>

          </div>

        </form>

      </section>

    </main>
  );
}

export default LoginUsuario;