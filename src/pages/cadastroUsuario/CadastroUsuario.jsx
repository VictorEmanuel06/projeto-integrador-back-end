import "./CadastroUsuario.css"

const CadastroUsuario = () => {
  return (
    <div>
        <div class="card">

        <h1 class="title">Cadastro</h1>

        <p class="subtitle">
            Cadastre-se para acessar o site.
        </p>

        <div class="form-group">
            <label>Nome Completo</label>
            <input type="text"></input>
        </div>

        <div class="form-group">
            <label>E-mail</label>
            <input type="email"></input>
        </div>

        <div class="form-group">
            <label>Senha</label>
            <input type="password"></input>
        </div>

        <div class="form-group">
            <label>Confirmar senha</label>
            <input type="password"></input>
        </div>

        <div class="info">
            Seus dados são protegidos por protocolos de segurança.
            Não compartilhamos informações pessoais com terceiros.
        </div>

        <button class="btn">
            Cadastrar conta →
        </button>

        <div class="login">
            Já possui uma conta?
            <a href="#">Clique para fazer login</a>
        </div>

    </div>
    </div>
  )
}

export default CadastroUsuario;