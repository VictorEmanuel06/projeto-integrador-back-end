import { NavLink } from "react-router-dom";
import "./CadastroUsuario.css"

const CadastroUsuario = () => {
  return (
    <main>
        <div className="card_cadastro">

        <h1 className="title">Cadastro</h1>

        <p className="subtitle">
            Cadastre-se para acessar o site.
        </p>

        <div className="form-group">
            <label>Nome Completo</label>
            <input type="text"></input>
        </div>

        <div className="form-group">
            <label>E-mail</label>
            <input type="mail"></input>
        </div>

        <div className="form-group">
            <label>Senha</label>
            <input type="password"></input>
        </div>

        <div className="form-group">
            <label>Confirmar senha</label>
            <input type="password"></input>
        </div>

        <div className="info-cadastro">
            Seus dados são protegidos por protocolos de segurança.
            Não compartilhamos informações pessoais com terceiros.
        </div>

        <button className="btn-cadastro">
            Cadastrar conta →
        </button>
            
            <NavLink to="/loginusuario" className="voltar_login" >Já possui uma conta? Clique para fazer login</NavLink>

    </div>
    </main>
  )
}

export default CadastroUsuario;