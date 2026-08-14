import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CadastroUsuario.css";
import axios from "axios";
import ValidacaodeCadastro from "../../services/ValidacaodeCadastro";

const CadastroUsuario = () => {
  const [valores, setValores] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Controla se a senha está visível
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navegacao = useNavigate();

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setValores((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Faz a validação
    const erros = ValidacaodeCadastro(valores);

    // Atualiza os erros na tela
    setValidationErrors(erros);

    // Verifica se não existem erros
    if (
      erros.name === "" &&
      erros.email === "" &&
      erros.password === ""
    ) {
      try {
        const res = await axios.post(
          "http://localhost:7006/cadastrousuario",
          valores
        );

        console.log(res);

        // Depois do cadastro, vai para o login
        navegacao("/loginusuario");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <main className="cadastro-page">

      {/* Decoração lateral */}
      <div className="cadastro-decoration cadastro-decoration-left">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="cadastro-decoration cadastro-decoration-right">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <form
        className="form-cad-user"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="caixa-usuario">

          {/* Ícone */}
          <div className="cadastro-icon">
            <i className="fa-regular fa-user"></i>
          </div>

          {/* Título pequeno */}
          <div className="cadastro-label">
            <span></span>
            <p>CADASTRO</p>
            <span></span>
          </div>

          {/* Título */}
          <h1 className="title-usuario">
            Cadastro
          </h1>

          {/* Subtítulo */}
          <p className="subtitle-cadastro">
            Cadastre-se para acessar o site.
          </p>

          {/* Divisor */}
          <div className="cadastro-divider">
            <span></span>
            <i>♧</i>
            <span></span>
          </div>

          {/* =========================================
              NOME COMPLETO
          ========================================= */}
          <div className="form-usuario">

            <label htmlFor="name">
              Nome Completo
            </label>

            <div className="input-wrapper">

              <i className="fa-regular fa-user"></i>

              <input
                type="text"
                placeholder="Digite seu nome completo"
                name="name"
                id="name"
                autoComplete="name"
                value={valores.name}
                onChange={handleInput}
              />

            </div>

            {validationErrors.name && (
              <span className="error-message">
                {validationErrors.name}
              </span>
            )}

          </div>

          {/* =========================================
              E-MAIL
          ========================================= */}
          <div className="form-usuario">

            <label htmlFor="email">
              E-mail
            </label>

            <div className="input-wrapper">

              <i className="fa-regular fa-envelope"></i>

              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Digite seu email"
                value={valores.email}
                onChange={handleInput}
              />

            </div>

            {validationErrors.email && (
              <span className="error-message">
                {validationErrors.email}
              </span>
            )}

          </div>

          {/* =========================================
              SENHA
          ========================================= */}
          <div className="form-usuario">

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
                autoComplete="new-password"
                placeholder="Digite sua senha"
                value={valores.password}
                onChange={handleInput}
              />

              {/* Olho */}
              <button
                type="button"
                className="password-eye"
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

            {validationErrors.password && (
              <span className="error-message">
                {validationErrors.password}
              </span>
            )}

          </div>

          {/* =========================================
              AVISO DE SEGURANÇA
          ========================================= */}
          <div className="alerta-cadastro">

            <div className="alerta-icon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>

            <p>
              Seus dados são protegidos por protocolos de segurança.
              <br />
              Não compartilhamos informações pessoais com terceiros.
            </p>

          </div>

          {/* =========================================
              BOTÃO
          ========================================= */}
          <button
            type="submit"
            className="btn-usuario"
          >
            Cadastrar conta
            <span>→</span>
          </button>

          {/* =========================================
              LOGIN
          ========================================= */}
          <div className="voltar-login">

            <span>
              Já possui uma conta?
            </span>

            <NavLink
              to="/loginusuario"
              className="voltar-link"
            >
              Clique para fazer login
            </NavLink>

          </div>

        </div>
      </form>

    </main>
  );
};

export default CadastroUsuario;