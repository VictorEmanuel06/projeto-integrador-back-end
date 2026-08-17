import { useState } from "react";
import "./VerificarCodigo.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../config";

const VerificarCodigo = () => {
    const [codigo, setCodigo] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    const tipo = location.state?.tipo || "cliente"; // padrão cliente se não vier nada

    const handleVerificar = async () => {
        setErro("");

        if (!codigo) {
            setErro("Informe o código recebido por e-mail.");
            return;
        }

        if (!email) {
            setErro("E-mail não encontrado. Volte e tente novamente.");
            return;
        }

        setCarregando(true);

        try {
            const res = await fetch(`${API_URL}/api/verificar-codigo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, codigo, tipo }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Código inválido");
            }

            // decide pra qual tela ir, dependendo do tipo
            const destino = tipo === "adm" ? "/alterarsenhaadm" : "/alterarsenhausuario";
            navigate(destino, { state: { email, tipo } });
        } catch (err) {
            setErro(err.message);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container">
            <div className="card-recuperar-usuario">
                <div className="icon-usuario">✉</div>
                <h1 className="title-recuperar-usuario">Verificar código</h1>
                <p className="description">
                    Enviamos um código de 6 dígitos para <strong>{email}</strong>.
                    Digite abaixo para continuar.
                </p>

                <div className="codigo-form">
                    <label htmlFor="codigo">Código</label>

                    <input
                        id="codigo"
                        type="text"
                        inputMode="numeric"
                        placeholder="000000"
                        maxLength={6}
                        value={codigo}
                        onChange={(e) => {
                            const valor = e.target.value.replace(/\D/g, "");
                            setCodigo(valor);
                        }}
                    />
                </div>

                {erro && <p className="erro-mensagem">{erro}</p>}

                <button
                    className="btn-instrucoes"
                    onClick={handleVerificar}
                    disabled={carregando}
                >
                    {carregando ? "Verificando..." : "Verificar código →"}
                </button>

                <div className="divider"></div>

                <NavLink to={tipo === "adm" ? "/loginadm" : "/loginusuario"} className="back-login">
                    ← Voltar ao login
                </NavLink>
            </div>

            <div className="security-badge-user">
                Ambiente Seguro
            </div>

            <div className="info-user">
                <h2>Privacidade e cuidado</h2>
                <p>
                    Seus dados são protegidos por criptografia de ponta a ponta.
                    Priorizamos seu bem-estar em cada etapa da jornada.
                </p>
            </div>
        </div>
    )
}

export default VerificarCodigo;