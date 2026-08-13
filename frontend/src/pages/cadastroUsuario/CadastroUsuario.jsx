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

    // Verifica os erros atuais, e não o estado anterior
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

          <div className="cadastro-label">
            <span></span>
            <p>CADASTRO</p>
            <span></span>
          </div>

          <h1 className="title-usuario">
            Cadastro
          </h1>

          <p className="subtitle-cadastro">
            Cadastre-se para acessar o site.
          </p>

          <div className="cadastro-divider">
            <span></span>
            <i>♧</i>
            <span></span>
          </div>

          {/* Nome */}
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

          {/* E-mail */}
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

          {/* Senha */}
          <div className="form-usuario">
            <label htmlFor="password">
              Senha
            </label>

            <div className="input-wrapper">
              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                placeholder="Digite sua senha"
                value={valores.password}
                onChange={handleInput}
              />
            </div>

            {validationErrors.password && (
              <span className="error-message">
                {validationErrors.password}
              </span>
            )}
          </div>

          {/* Aviso de segurança */}
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

          {/* Botão */}
          <button
            type="submit"
            className="btn-usuario"
          >
            Cadastrar conta
            <span>→</span>
          </button>

          {/* Login */}
          <div className="voltar-login">
            <span>Já possui uma conta?</span>

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