import "./CadastroUsuario.css"

const CadastroUsuario = () => {
  return (
    <div>
        <div className="card">

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

        <div className="info">
            Seus dados são protegidos por protocolos de segurança.
            Não compartilhamos informações pessoais com terceiros.
        </div>

        <button className="btn">
            Cadastrar conta →
        </button>

        <div className="login">
            Já possui uma conta?
            <a href="#">Clique para fazer login</a>
        </div>

    </div>
    </div>
  )
}

export default CadastroUsuario;