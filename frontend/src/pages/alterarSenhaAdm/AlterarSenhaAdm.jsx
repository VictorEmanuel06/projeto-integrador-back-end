import React from 'react'
import "./AlterarSenhaAdm.css"
 
 
const AlterarSenhaAdm = () => {
    return (
         <div className="container-alt-adm">
        <div className="card-alt-adm">
 
        <h1 className="user-h1">Alterar senha</h1>
 
            <p className="subtitle-adm">
                Atualize suas crendenciais de acesso com segurança.
            </p>
 
            <form>
               
                <div className="input-group-adm">
                    <label>Nova senha</label>
                    <input type="password"></input>
                </div>
 
                <div className="input-group-adm">
                    <label>Confirmar nova senha</label>
                    <input type="password"></input>
                </div>
 
                <div className="info-box-adm">
                    Certifique-se de que sua senha contenha letras,
                    números e símbolos. Nunca compartilhe seus dados
                    de acesso e sua privacidade é nossa prioridade absoluta.
                </div>
 
                <button type="submit" className="btn">
                    Salvar nova senha
                </button>
 
                <a href="/loginadm" className="back-login-adm">
                    ← Voltar ao login
                </a>
            </form>
 
        </div>
    </div>
    )
 
}
 
export default AlterarSenhaAdm;
 