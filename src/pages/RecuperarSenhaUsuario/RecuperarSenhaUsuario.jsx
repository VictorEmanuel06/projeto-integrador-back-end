import "./RecuperarSenhaUsuario.css";
import { NavLink } from "react-router-dom";

const RecuperarSenhaUsuario = () => {

    return (
        <div className="container">

            <div className="card-recuperar-usuario">

                <div className="icon-usuario">↺</div>

                <h1 className="title-recuperar-usuario">Recuperar senha</h1>

                <p className="description">
                    Para sua segurança, informe o e-mail cadastrado.
                    Enviaremos um link seguro para a criação de uma nova senha.
                </p>

                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" placeholder="exemplo@email.com">
                    </input>
                </div>

                <button className="btn-instrucoes">
                    Enviar instruções →
                </button>

                <div className="divider"></div>

                <NavLink to="/loginusuario"  href="#" className="back-login" > ← Voltar ao login </NavLink>

            </div>

            <div className="security-badge">
                Ambiente Seguro
            </div>

            <div className="info">
                <h2>Privacidade e cuidado</h2>

                <p>
                    Seus dados são protegidos por criptografia de ponta a ponta.
                    Priorizamos seu bem-estar em cada etapa da jornada.
                </p>
            </div>
        </div>
    )
}

export default RecuperarSenhaUsuario;