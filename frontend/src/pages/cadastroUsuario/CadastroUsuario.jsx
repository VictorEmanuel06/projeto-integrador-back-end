import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CadastroUsuario.css"
import axios from "axios";
import ValidacaodeCadastro from "../../services/ValidacaodeCadastro";

const CadastroUsuario = () => {
    const [valores, setValores] = useState({
        name: "",
        email: "",
        password: ""
    });

const navegacao = useNavigate();

const [validationErrors, setValidationErrors] = useState({})


const handleInput = async (event) => {
    setValores(prev => ({...prev, [event.target.name]: event.target.value}))
}

const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationErrors(ValidacaodeCadastro(valores));

    if(
      validationErrors.name === "" && 
      validationErrors.email === "" && 
      validationErrors.password === ""
    ) {
        axios.post('http://localhost:7006/cadastrousuario', valores)
        .then(res => {
            console.log(res);
            navegacao("/loginusuario");
        })
        .catch(err => console.log(err));
    }
}


  return (
    <form action="" onSubmit={handleSubmit} className="form-cad-user">
        <div className="caixa-usuario">

        <h1 className="title-usuario">Cadastro</h1>

        <p className="subtitle-usuario">
            Cadastre-se para acessar o site.
        </p>

        <div className="form-usuario">
            <label htmlFor="name">Nome Completo</label>
            <input type="text" placeholder="Digite seu nome completo" name="name"
                onChange={handleInput} />
            <span> {validationErrors.name} </span>
        </div>

        <div className="form-usuario">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email"
                onChange={handleInput} />
            <span> {validationErrors.email} </span>
        </div>

        <div className="form-usuario">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password"
                onChange={handleInput} />
            <span> {validationErrors.password} </span>
        </div>

        {/* <div className="form-usuario">
            <label>Confirmar senha</label>
            <input type="password"></input>
        </div> */}

        <div className="info-usuario">
            Seus dados são protegidos por protocolos de segurança.
            Não compartilhamos informações pessoais com terceiros.
        </div>

        <button type="submit" className="btn-usuario">
            Cadastrar conta →
        </button>
            
            <NavLink to="/loginusuario" className="voltar_login" >Já possui uma conta? Clique para fazer login</NavLink>

    </div>
    </form>
  )
}

export default CadastroUsuario;