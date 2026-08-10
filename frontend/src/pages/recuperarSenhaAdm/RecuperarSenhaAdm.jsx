import { useState } from "react";
import "./RecuperarSenhaAdm.css";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../../config"; // ajuste o caminho conforme sua pasta

const RecuperarSenhaAdm = () => {
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
            const res = await fetch(`${API_URL}/api/recuperar-senha`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, tipo: "adm" }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Erro ao enviar e-mail");
            }

            navigate("/verificar-codigo", { state: { email, tipo: "adm" } });
        } catch (err) {
            setErro(err.message);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container-rec">

            <div className="card-rec">

                <div className="icon">↺</div>

                <h1 className="title-rec">Recuperar senha</h1>

                <p className="description-rec">
                    Para sua segurança, informe o e-mail cadastrado.
                    Enviaremos um link seguro para a criação de uma nova senha.
                </p>

                <div className="form-group-adm">
                    <label>E-mail</label>
                    <input
                        type="email"
                        placeholder="exemplo@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {erro && <p className="erro-mensagem">{erro}</p>}

                <button
                    className="btn"
                    onClick={handleEnviar}
                    disabled={carregando}
                >
                    {carregando ? "Enviando..." : "Enviar instruções →"}
                </button>

                <div className="divider"></div>

                <NavLink to="/loginadm" className="back-login">
                    ← Voltar ao login
                </NavLink>

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

export default RecuperarSenhaAdm;