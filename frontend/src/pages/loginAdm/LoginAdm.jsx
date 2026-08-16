import "./LoginAdm.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ValidacaodeLoginAdm from "../../services/ValidacaodeLoginAdm";
import { useAuth } from "../../context/AuthContext";

const LoginAdm = () => {
  const [valores, setValores] = useState({
    email: "",
    password: "",
  });

  // Controla se a senha está visível
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navegacao = useNavigate();
  const { setUsuarioLogado } = useAuth();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setValores((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:7006")
      .then((res) => {
        if (res.data.valid) {
          navegacao("/");
        }
      })
      .catch((err) => console.log(err));
  }, [navegacao]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = ValidacaodeLoginAdm(valores);
    setErrors(validationErrors);

    if (
      validationErrors.email === "" &&
      validationErrors.password === ""
    ) {
      axios
        .post("http://localhost:7006/loginadm", valores, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("RESPOSTA:", res.data);

          if (res.data.success) {
            localStorage.setItem(
              "usuario",
              JSON.stringify({
                id: res.data.id || res.data.user?.id,
                nomecompleto:
                  res.data.nomecompleto ||
                  res.data.user?.nomecompleto,
                tipo: "adm",
              })
            );

            setUsuarioLogado(true);
            navegacao("/");
          } else {
            alert("Registro inexistente");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main className="login-adm-page">

      {/* Elementos decorativos */}
          <div className="login-decoration login-decoration-left">
            <span>𓆰</span>
            <span>❧</span>
          </div>

          <div className="login-decoration login-decoration-right">
            <span>❧</span>
            <span>❧</span>
          </div>

      <section className="card-loginadm">

          {/* Ícone */}
          <div className="icone-adm">
            <i className="fa-regular fa-user"></i>
          </div>

          <h1 className="title-loginAdm">
            Administrador
          </h1>

          <p className="subtitle-admm">
            Faça o login para acessar o painel administrativo.
          </p>

        <div className="login-divider-adm">
          <span></span>
          <i>♧</i>
          <span></span>
        </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* =========================================
                E-MAIL
            ========================================= */}
            <div className="form-adm">

              <label htmlFor="email">
                E-mail
              </label>

              <div className="input-wrapper">

                <i className="fa-regular fa-envelope"></i>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  value={valores.email}
                  onChange={handleInput}
                />

              </div>

              {errors.email && (
                <span className="erro">
                  {errors.email}
                </span>
              )}

            </div>

            {/* =========================================
                SENHA
            ========================================= */}
            <div className="form-adm">

              <label htmlFor="password">
                Senha
              </label>

              <div className="input-wrapper">

                {/* Cadeado */}
                <i className="fa-solid fa-lock"></i>

                {/* Campo de senha */}
                <input
                  
                  type={mostrarSenha ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  value={valores.password}
                  onChange={handleInput}
                />

                {/* Olho */}
                <button
                  type="button"
                  className="password-eye-adm"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label={
                    mostrarSenha
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
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
                <span className="erro">
                  {errors.password}
                </span>
              )}

              <NavLink
                to="/recuperarsenhaadm"
                className="esquecisenhaadm"
              >
                Esqueci minha senha
              </NavLink>

            </div>

            {/* =========================================
                AVISO DE SEGURANÇA
            ========================================= */}
            <div className="info-adm">

              <div className="info-adm-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>

              <p>
                Esta área é restrita. Acesso permitido apenas
                para administradores e equipe autorizada.
              </p>

            </div>

            {/* =========================================
                BOTÃO
            ========================================= */}
            <button
              type="submit"
              className="btn-loginAdm"
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

            {/* =========================================
                VOLTAR PARA LOGIN CLIENTE
            ========================================= */}

            <div className="adm-container">
            <NavLink
              to="/loginusuario"
              className="voltar-login-cliente"
            >
              <i className="fa-solid fa-shield-halved"></i>
              Voltar para Login de Cliente
            </NavLink>
            </div>

          </form>

      </section>

    </main>
  );
};

export default LoginAdm;