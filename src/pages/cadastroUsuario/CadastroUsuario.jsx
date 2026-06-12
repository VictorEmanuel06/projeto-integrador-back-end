import { NavLink } from "react-router-dom";
import "./CadastroUsuario.css"

const CadastroUsuario = () => {
  return (
    <main>
        <div className="caixa-usuario">

        <h1 className="title-usuario">Cadastro</h1>

        <p className="subtitle-usuario">
            Cadastre-se para acessar o site.
        </p>

        <div className="form-usuario">
            <label>Nome Completo</label>
            <input type="text"></input>
        </div>

        <div className="form-usuario">
            <label>E-mail</label>
            <input type="mail"></input>
        </div>

        <div className="form-usuario">
            <label>Senha</label>
            <input type="password"></input>
        </div>

        <div className="form-usuario">
            <label>Confirmar senha</label>
            <input type="password"></input>
        </div>

        <div className="info-usuario">
            Seus dados são protegidos por protocolos de segurança.
            Não compartilhamos informações pessoais com terceiros.
        </div>

        <button className="btn-usuario">
            Cadastrar conta →
        </button>
            
            <NavLink to="/loginusuario" className="voltar_login" >Já possui uma conta? Clique para fazer login</NavLink>

    </div>
    </main>
  )
}

export default CadastroUsuario;