import { useState } from "react";
import "./RecuperarSenhaUsuario.css";
import { NavLink, useNavigate } from "react-router-dom";


const RecuperarSenhaUsuario = () => {
    const [email, setEmail] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleEnviar = async () => {
        setErro("");

        if (!email) {
            setErro("Informe um e-mail válido.");
            return;
        }

        setCarregando(true);

        try {
            const res = await fetch("http://localhost:7006/api/recuperar-senha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Erro ao enviar e-mail");
            }

            // leva para a tela de digitar o código, passando o e-mail
            navigate("/verificar-codigo", { state: { email } });
        } catch (err) {
            setErro(err.message);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <main className="container">

            <div className="card-recuperar-usuario">

                <div className="icon-usuario">
                    <i className="fa-solid fa-lock"></i>
                </div>

                <h1 className="title-recuperar-usuario">Recuperar senha</h1>

                <p className="description">
                    Para sua segurança, informe o e-mail cadastrado.
                    Enviaremos um link seguro para a criação de uma nova senha.
                </p>

                <div className="form-group-user">

                    <label>E-mail</label>

                    <div className="input-rec-wrapper-user">

                        <i className="fa-regular fa-envelope"></i>

                        <input
                            type="email"
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                </div>

                {erro && <p className="erro-mensagem">{erro}</p>}

                <button
                    className="btn-instrucoes"
                    onClick={handleEnviar}
                    disabled={carregando}
                >
                    {carregando ? "Enviando..." : "Enviar instruções →"}
                </button>

                <div className="divider"></div>

                <NavLink to="/loginusuario" className="back-login"> ← Voltar ao login </NavLink>

            </div>

            <div className="security-badge-user">
                <i className="fa-solid fa-shield-halved"></i>
                Ambiente Seguro
            </div>

            <div className="info-user">
                <h2>Privacidade e cuidado</h2>

                <p>
                    Seus dados são protegidos por criptografia de ponta a ponta.
                    Priorizamos seu bem-estar em cada etapa da jornada.
                </p>
            </div>
        </main>
    )
}

export default RecuperarSenhaUsuario;