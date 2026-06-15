import React from 'react'
 
const LoginAdm = () => {
  return (
 
    <div class="card-loginAdm">
 
      <h1 class="title-loginAdm">Login</h1>
 
      <p class="subtitle">
        Faça o login para acessar o site.
      </p>
 
      <div class="form-adm">
        <label>E-mail</label>
        <input type="email"></input>
      </div>
 
      <div class="form-adm">
        <label>Senha</label>
        <input type="password"></input>
      </div>
 
      <div className="esquecisenha">
        <a href="/alterar"></a>
      </div>
 
      <div class="info">
        Seus dados são protegidos por protocolos de segurança.
        Não compartilhamos informações pessoais com terceiros.
      </div>
 
      <button class="btn-loginAdm">
        Logar →
      </button>
 
      <div class="login">
        Não possui uma conta?
        <a href="/cadastroadm"> Clique para fazer o cadastro</a>
      </div>
 
    </div>
 
  );
 
}
 
export default LoginAdm