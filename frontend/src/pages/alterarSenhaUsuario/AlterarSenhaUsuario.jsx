import React from 'react'
import "./AlterarSenhaUsuario.css"
import { NavLink } from "react-router-dom"
 
 
const AlterarSenhaUsuario = () => {
    return (
         <div className="container-alt-user">
            <div className="card-alt-user">
 
            <h1 className="user-h1">Alterar senha</h1>
 
            <p className="subtitle-user">
                Atualize suas crendenciais de acesso com segurança.
            </p>
 
            <form>
               
                <div className="input-group-user">
                    <label>Nova senha</label>
                    <input type="password"></input>
                </div>
 
                <div className="input-group-user">
                    <label>Confirmar nova senha</label>
                    <input type="password"></input>
                </div>
 
                <div className="info-box-user">
                    Certifique-se de que sua senha contenha letras,
                    números e símbolos. Nunca compartilhe seus dados
                    de acesso e sua privacidade é nossa prioridade absoluta.
                </div>
 
                <button type="submit" className="btn">
                    Salvar nova senha
                </button>
 
                <NavLink to="/loginadm" className="back-login-user">
                    ← Voltar ao login
                </NavLink>
            </form>
 
        </div>
    </div>
    )
 
}
 
export default AlterarSenhaUsuario;
 