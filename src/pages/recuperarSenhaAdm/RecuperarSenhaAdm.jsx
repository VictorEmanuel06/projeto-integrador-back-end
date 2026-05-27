import "./RecuperarSenhaAdm.css";

const RecuperarSenhaAdm = () => {

    return (
        <div class="container">

            <div class="card">

                <div class="icon">↺</div>

                <h1 class="title">Recuperar senha</h1>

                <p class="description">
                    Para sua segurança, informe o e-mail cadastrado.
                    Enviaremos um link seguro para a criação de uma nova senha.
                </p>

                <div class="form-group">
                    <label>E-mail</label>
                    <input type="email" placeholder="exemplo@email.com">
                    </input>
                </div>

                <button class="btn">
                    Enviar instruções →
                </button>

                <div class="divider"></div>

                <a href="#" class="back-login">
                    ← Voltar ao login
                </a>

            </div>

            <div class="security-badge">
                Ambiente Seguro
            </div>

            <div class="info">
                <h2>Privacidade e cuidado</h2>

                <p>
                    Seus dados são protegidos por criptografia de ponta a ponta.
                    Priorizamos seu bem-estar em cada etapa da jornada.
                </p>
            </div>
        </div>
    )
}

export default RecuperarSenhaAdm;