import { useState } from "react";
import "./RecuperarSenhaAdm.css";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const RecuperarSenhaAdm = () => {
    const [email, setEmail] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    const handleEnviar = async (event) => {
        event.preventDefault();

        setErro("");

        // Validação do e-mail
        if (!email.trim()) {
            setErro("Informe um e-mail válido.");
            return;
        }

        setCarregando(true);

        try {
            const res = await fetch(
                `${API_URL}/api/recuperar-senha`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        tipo: "adm",
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Erro ao enviar e-mail."
                );
            }

            // Vai para a tela de verificação
            navigate("/verificar-codigo", {
                state: {
                    email: email,
                    tipo: "adm",
                },
            });

        } catch (err) {
            console.error("Erro:", err);

            setErro(
                err.message ||
                "Não foi possível enviar as instruções."
            );
        } finally {
            setCarregando(false);
        }
    };

    return (
        <main className="container-rec">

            <div className="card-rec">

                {/* Ícone */}
                <div className="icon-rec">
                    <i className="fa-solid fa-lock"></i>
                </div>

                {/* Título */}
                <h1 className="title-rec">
                    Recuperar senha
                </h1>

                {/* Descrição */}
                <p className="description-rec">
                    Para sua segurança, informe o e-mail cadastrado.
                    Enviaremos um código seguro para a criação de
                    uma nova senha.
                </p>

                {/* Formulário */}
                <form onSubmit={handleEnviar}>

                    {/* E-mail */}
                    <div className="form-group-adm">

                        <label htmlFor="email">
                            E-mail
                        </label>

                        <div className="input-rec-wrapper">

                            <i className="fa-regular fa-envelope"></i>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="exemplo@email.com"
                                autoComplete="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* Mensagem de erro */}
                    {erro && (
                        <p className="erro-mensagem">
                            {erro}
                        </p>
                    )}

                    {/* Botão */}
                    <button
                        type="submit"
                        className="btn-adm-rec"
                        disabled={carregando}
                    >
                        {carregando
                            ? "Enviando..."
                            : "Enviar instruções →"}
                    </button>

                </form>

                {/* Divisor */}
                <div className="divider"></div>

                {/* Voltar */}
                <NavLink
                    to="/loginadm"
                    className="back-login"
                >
                    ← Voltar ao login
                </NavLink>

            </div>

            {/* Badge de segurança */}
            <div className="security-badge">
                <i className="fa-solid fa-shield-halved"></i>
                Ambiente Seguro
            </div>

            {/* Informações */}
            <div className="info">

                <h2>
                    Privacidade e cuidado
                </h2>

                <p>
                    Seus dados são protegidos por criptografia
                    de ponta a ponta. Priorizamos sua segurança
                    e privacidade em cada etapa da jornada.
                </p>

            </div>

        </main>
    );
};

export default RecuperarSenhaAdm;