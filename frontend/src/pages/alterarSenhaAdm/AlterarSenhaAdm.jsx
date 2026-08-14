import { useState } from "react";
import "./AlterarSenhaAdm.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const AlterarSenhaAdm = () => {
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault(); // evita recarregar a página

        setErro("");

        if (!email) {
            setErro("Sessão expirada. Refaça o processo de recuperação.");
            return;
        }

        if (!novaSenha || !confirmarSenha) {
            setErro("Preencha os dois campos de senha.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        if (novaSenha.length < 6) {
            setErro("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        setCarregando(true);

        try {
            const res = await fetch("http://localhost:7006/api/alterar-senha-adm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, novaSenha }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Erro ao alterar senha");
            }

            navigate("/loginadm");
        } catch (err) {
            setErro(err.message);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container-alt-adm">
            <div className="card-alt-adm">

                <h1 className="adm-h1">Alterar senha</h1>

                <p className="subtitle-adm">
                    Atualize suas crendenciais de acesso com segurança.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group-adm">
                        <label>Nova senha</label>
                        <div className="password-wrapper-adm">
                            <input
                                type={mostrarNovaSenha ? "text" : "password"}
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                            <i
                                className={`fa-solid ${mostrarNovaSenha ? "fa-eye-slash" : "fa-eye"} toggle-senha-adm`}
                                onClick={() => setMostrarNovaSenha((prev) => !prev)}
                            ></i>
                        </div>
                    </div>

                    <div className="input-group-adm">
                        <label>Confirmar nova senha</label>
                        <div className="password-wrapper-adm">
                            <input
                                type={mostrarConfirmarSenha ? "text" : "password"}
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                            <i
                                className={`fa-solid ${mostrarConfirmarSenha ? "fa-eye-slash" : "fa-eye"} toggle-senha-adm`}
                                onClick={() => setMostrarConfirmarSenha((prev) => !prev)}
                            ></i>
                        </div>
                    </div>

                    {erro && <p className="erro-mensagem">{erro}</p>}

                    <div className="info-box-adm">
                        Certifique-se de que sua senha contenha letras,
                        números e símbolos. Nunca compartilhe seus dados
                        de acesso e sua privacidade é nossa prioridade absoluta.
                    </div>

                    <button type="submit" className="btn" disabled={carregando}>
                        {carregando ? "Salvando..." : "Salvar nova senha"}
                    </button>

                    <NavLink to="/loginadm" className="back-login-adm">
                        ← Voltar ao login
                    </NavLink>
                </form>

            </div>
        </div>
    )
}

export default AlterarSenhaAdm;