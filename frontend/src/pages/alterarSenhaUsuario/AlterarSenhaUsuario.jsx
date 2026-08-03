import { useState } from "react";
import "./AlterarSenhaUsuario.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const AlterarSenhaUsuario = () => {
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
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
            const res = await fetch("http://localhost:7006/api/alterar-senha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, novaSenha }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Erro ao alterar senha");
            }

            navigate("/loginusuario");
        } catch (err) {
            setErro(err.message);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container-alt-user">
            <div className="card-alt-user">

                <h1 className="user-h1">Alterar senha</h1>

                <p className="subtitle-user">
                    Atualize suas crendenciais de acesso com segurança.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group-user">
                        <label>Nova senha</label>
                        <input
                            type="password"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                    </div>

                    <div className="input-group-user">
                        <label>Confirmar nova senha</label>
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>

                    {erro && <p className="erro-mensagem">{erro}</p>}

                    <div className="info-box-user">
                        Certifique-se de que sua senha contenha letras,
                        números e símbolos. Nunca compartilhe seus dados
                        de acesso e sua privacidade é nossa prioridade absoluta.
                    </div>

                    <button type="submit" className="btn" disabled={carregando}>
                        {carregando ? "Salvando..." : "Salvar nova senha"}
                    </button>

                    <NavLink to="/loginusuario" className="back-login-user">
                        ← Voltar ao login
                    </NavLink>
                </form>

            </div>
        </div>
    )
}

export default AlterarSenhaUsuario;