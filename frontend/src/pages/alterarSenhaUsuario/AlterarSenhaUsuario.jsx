import { useState } from "react";
import "./AlterarSenhaUsuario.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const AlterarSenhaUsuario = () => {
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
        e.preventDefault();

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
            const res = await fetch(
                "http://localhost:7006/api/alterar-senha",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        novaSenha,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Erro ao alterar senha"
                );
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

                {/* ÍCONE */}
                <div className="icon-alt-user">
                    <i className="fa-solid fa-lock"></i>
                </div>

                {/* TÍTULO */}
                <h1 className="user-h1">
                    Alterar senha
                </h1>

                {/* DETALHE DECORATIVO */}
                <div className="decoracao-alt-user">
                    <span></span>
                    <i className="fa-solid fa-spa"></i>
                    <span></span>
                </div>

                {/* DESCRIÇÃO */}
                <p className="subtitle-user">
                    Atualize suas credenciais de acesso
                    <br />
                    com segurança.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* NOVA SENHA */}
                    <div className="input-group-user">

                        <label>
                            Nova senha
                        </label>

                        <div className="password-wrapper-user">

                            <i className="fa-solid fa-lock password-icon-user"></i>

                            <input
                                type={
                                    mostrarNovaSenha
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Digite sua nova senha"
                                value={novaSenha}
                                onChange={(e) =>
                                    setNovaSenha(e.target.value)
                                }
                            />

                            <i
                                className={`fa-solid ${
                                    mostrarNovaSenha
                                        ? "fa-eye-slash"
                                        : "fa-eye"
                                } toggle-senha-user`}
                                onClick={() =>
                                    setMostrarNovaSenha(
                                        (prev) => !prev
                                    )
                                }
                            ></i>

                        </div>

                        <p className="password-hint-user">
                            Use pelo menos 6 caracteres com letras,
                            números e símbolos.
                        </p>

                    </div>

                    {/* CONFIRMAR SENHA */}
                    <div className="input-group-user">

                        <label>
                            Confirmar nova senha
                        </label>

                        <div className="password-wrapper-user">

                            <i className="fa-solid fa-lock password-icon-user"></i>

                            <input
                                type={
                                    mostrarConfirmarSenha
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirme sua nova senha"
                                value={confirmarSenha}
                                onChange={(e) =>
                                    setConfirmarSenha(e.target.value)
                                }
                            />

                            <i
                                className={`fa-solid ${
                                    mostrarConfirmarSenha
                                        ? "fa-eye-slash"
                                        : "fa-eye"
                                } toggle-senha-user`}
                                onClick={() =>
                                    setMostrarConfirmarSenha(
                                        (prev) => !prev
                                    )
                                }
                            ></i>

                        </div>

                    </div>

                    {/* ERRO */}
                    {erro && (
                        <p className="erro-mensagem">
                            {erro}
                        </p>
                    )}

                    {/* AVISO DE SEGURANÇA */}
                    <div className="info-box-user">

                        <div className="info-icon-alt-user">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>

                        <p>
                            Certifique-se de que sua senha contenha
                            letras, números e símbolos. Nunca compartilhe
                            seus dados de acesso e sua privacidade é nossa
                            prioridade absoluta.
                        </p>

                    </div>

                    {/* BOTÃO */}
                    <button
                        type="submit"
                        className="btn-alt-user"
                        disabled={carregando}
                    >

                        <i className="fa-solid fa-lock"></i>

                        {carregando
                            ? "Salvando..."
                            : "Salvar nova senha"
                        }

                    </button>

                    {/* VOLTAR */}
                    <NavLink
                        to="/loginusuario"
                        className="back-login-user"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                        Voltar ao login
                    </NavLink>

                </form>

            </div>

        </div>
    );
};

export default AlterarSenhaUsuario;