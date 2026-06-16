import "./CadastroAdm.css";
 
const CadastroAdm = () => {
  return (
 
    <div class="card-cadAdm">
 
        <h1 class="title-cadAdm">Cadastro</h1>
 
        <p class="subtitle-cadAdm">
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
 
        {/* <div class="form-group">
            <label>Confirmar senha</label>
            <input type="password"></input>
        </div> */}
 
        <div class="info-cadAdm">
            Seus dados são protegidos por protocolos de segurança.
            Não compartilhamos informações pessoais com terceiros.
        </div>
 
        <button class="btn">
            Cadastrar conta →
        </button>
 
        <div class="login-adm">
            Já possui uma conta?
            <a href="/loginadm"> Clique para fazer login</a>
        </div>
 
    </div>
 
  )
}
 
export default CadastroAdm;