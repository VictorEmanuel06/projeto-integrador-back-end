import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PainelDoUsuario.css";

const PainelDoUsuario = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("perfil");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = "http://localhost:7006";

    const [usuarioId, setUsuarioId] = useState(null);

    const [profile, setProfile] = useState({
        nome: "",
        email: ""
    });

    const [consultas, setConsultas] = useState([]);
    const [mensagem, setMensagem] = useState("");

    const [consultaSelecionada, setConsultaSelecionada] = useState(null);
    const [consultaParaCancelar, setConsultaParaCancelar] = useState(null);

    // CARREGAR DADOS DO USUÁRIO E CONSULTAS
    useEffect(() => {
        const carregarDadosDoUsuario = async () => {
            try {
                setLoading(true);

                const resLogin = await fetch(`${API_BASE_URL}/`, {
                    credentials: "include"
                });

                const dadosLogin = await resLogin.json();

                if (!dadosLogin.valid) {
                    throw new Error("Sessão expirada. Faça login novamente.");
                }

                setUsuarioId(dadosLogin.id);

                const [resPerfil, resAgendamentos] = await Promise.all([
                    fetch(`${API_BASE_URL}/usuarios/${dadosLogin.id}`, {
                        credentials: "include"
                    }),

                    fetch(`${API_BASE_URL}/agendamentos`, {
                        credentials: "include"
                    })
                ]);

                if (!resPerfil.ok) {
                    throw new Error(
                        "Não foi possível carregar seus dados pessoais."
                    );
                }

                if (!resAgendamentos.ok) {
                    throw new Error(
                        "Não foi possível carregar suas consultas."
                    );
                }

                const dataPerfil = await resPerfil.json();
                const dataAgendamentos = await resAgendamentos.json();

                setProfile({
                    nome: dataPerfil.nomecompleto,
                    email: dataPerfil.email
                });

                setConsultas(dataAgendamentos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        carregarDadosDoUsuario();
    }, []);

    // ATUALIZAR DADOS PESSOAIS
    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_BASE_URL}/usuarios/${usuarioId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome: profile.nome,
                        email: profile.email
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Falha ao atualizar dados pessoais.");
            }

            setMensagem("Dados alterados com sucesso!");

            setTimeout(() => {
                setMensagem("");
            }, 3000);
        } catch (err) {
            setMensagem(err.message);
        }
    };

    // CANCELAR CONSULTA
    const handleCancelarConsulta = async () => {
        if (!consultaParaCancelar) {
            return;
        }

        const id = consultaParaCancelar.id;

        try {
            const response = await fetch(
                `${API_BASE_URL}/agendamentos/${id}/status`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: "CANCELADO"
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao cancelar a consulta.");
            }

            setConsultas((prev) =>
                prev.map((consulta) =>
                    consulta.id === id
                        ? {
                              ...consulta,
                              status: "CANCELADO"
                          }
                        : consulta
                )
            );

            setConsultaParaCancelar(null);
            setMensagem("Consulta cancelada com sucesso!");

            setTimeout(() => {
                setMensagem("");
            }, 3000);
        } catch (err) {
            setMensagem(err.message);
            setConsultaParaCancelar(null);
        }
    };

    // ABRIR AGENDAMENTO
    const handleNovaConsulta = () => {
        navigate("/agendamento");
    };

    // INICIAIS DO USUÁRIO
    const iniciais = profile.nome
        ? profile.nome.substring(0, 2).toUpperCase()
        : "US";

    if (loading) {
        return (
            <div className="painel-loading">
                <div className="painel-loading-spinner"></div>
                <p>Carregando informações...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="painel-error">
                <div className="painel-error-card">
                    <h2>Não foi possível carregar o painel</h2>
                    <p>{error}</p>
                    <button
                        className="painel-error-button"
                        onClick={() => window.location.reload()}
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="painel-container">

                {/* SIDEBAR */}
                <aside className="painel-sidebar">

                    <div className="painel-user">

                        <div className="painel-avatar">
                            {iniciais}
                        </div>

                        <div className="painel-user-info">
                            <h3>{profile.nome}</h3>
                            <p>Paciente</p>
                        </div>

                    </div>

                    <div className="painel-divider"></div>

                    <nav className="painel-nav">

                        <button
                            className={`painel-nav-button ${
                                activeTab === "perfil"
                                    ? "painel-nav-button-active"
                                    : ""
                            }`}
                            onClick={() => setActiveTab("perfil")}
                        >
                            <span className="painel-nav-icon">👤</span>
                            <span>Dados Pessoais</span>
                        </button>

                        <button
                            className={`painel-nav-button ${
                                activeTab === "consultas"
                                    ? "painel-nav-button-active"
                                    : ""
                            }`}
                            onClick={() => setActiveTab("consultas")}
                        >
                            <span className="painel-nav-icon">📅</span>
                            <span>Minhas Consultas</span>
                        </button>

                        <button
                            className="painel-nav-button"
                            onClick={handleNovaConsulta}
                        >
                            <span className="painel-nav-icon">➕</span>
                            <span>Agendar Consulta</span>
                        </button>

                    </nav>

                </aside>


                {/* CONTEÚDO */}
                <main className="painel-content">

                    {mensagem && (
                        <div className="painel-alert">
                            <span className="painel-alert-icon">✓</span>
                            <span>{mensagem}</span>
                        </div>
                    )}


                    {/* PERFIL */}
                    {activeTab === "perfil" && (
                        <section className="painel-card">

                            <div className="painel-card-header">

                                <div>
                                    <h2>Dados Pessoais</h2>
                                    <p>
                                        Mantenha seus dados sempre atualizados.
                                    </p>
                                </div>

                                <div className="painel-card-icon">
                                    👤
                                </div>

                            </div>

                            <div className="painel-card-divider"></div>

                            <form
                                onSubmit={handleProfileSubmit}
                                className="painel-form"
                            >

                                <div className="painel-form-group">

                                    <label htmlFor="nome">
                                        Nome Completo
                                    </label>

                                    <input
                                        id="nome"
                                        type="text"
                                        value={profile.nome}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                nome: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                <div className="painel-form-group">

                                    <label htmlFor="email">
                                        E-mail
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) =>
                                            setProfile({
                                                ...profile,
                                                email: e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>


                                <div className="painel-form-actions">

                                    <button
                                        type="submit"
                                        className="painel-primary-button"
                                    >
                                        Salvar alterações
                                    </button>

                                </div>

                            </form>

                        </section>
                    )}


                    {/* CONSULTAS */}
                    {activeTab === "consultas" && (
                        <section className="painel-card">

                            <div className="painel-card-header painel-consultas-header">

                                <div>
                                    <h2>Minhas Consultas</h2>

                                    <p>
                                        Acompanhe e gerencie suas consultas.
                                    </p>
                                </div>

                                <button
                                    className="painel-new-button"
                                    onClick={handleNovaConsulta}
                                >
                                    <span>+</span>
                                    Nova consulta
                                </button>

                            </div>


                            <div className="painel-card-divider"></div>


                            {consultas.length === 0 ? (

                                <div className="painel-empty">

                                    <div className="painel-empty-icon">
                                        📅
                                    </div>

                                    <h3>
                                        Nenhuma consulta agendada
                                    </h3>

                                    <p>
                                        Você ainda não possui consultas
                                        agendadas.
                                    </p>

                                    <button
                                        className="painel-primary-button"
                                        onClick={handleNovaConsulta}
                                    >
                                        Agendar uma consulta
                                    </button>

                                </div>

                            ) : (

                                <div className="painel-consultas-list">

                                    {consultas.map((item) => (

                                        <div
                                            className="painel-consulta-card"
                                            key={item.id}
                                        >

                                            <div className="painel-consulta-date">

                                                <span className="painel-date-day">
                                                    {item.dataConsulta?.split("/")[0]}
                                                </span>

                                                <span className="painel-date-month">
                                                    AGO
                                                </span>

                                            </div>


                                            <div className="painel-consulta-info">

                                                <div className="painel-consulta-title">
                                                    Consulta psicológica
                                                </div>

                                                <div className="painel-consulta-details">

                                                    <span>
                                                        📅 {item.dataConsulta}
                                                    </span>

                                                    <span>
                                                        🕐 {item.horarioConsulta}
                                                    </span>

                                                </div>

                                                <div className="painel-consulta-paciente">
                                                    {item.nomeCliente}
                                                </div>

                                            </div>


                                            <div className="painel-consulta-status">

                                                <span
                                                    className={`painel-status ${
                                                        item.status
                                                            ? item.status.toLowerCase()
                                                            : ""
                                                    }`}
                                                >
                                                    <span className="painel-status-dot"></span>
                                                    {item.status}
                                                </span>

                                            </div>


                                            <div className="painel-consulta-actions">

                                                <button
                                                    className="painel-details-button"
                                                    onClick={() =>
                                                        setConsultaSelecionada(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Ver detalhes
                                                </button>

                                                {item.status !== "CANCELADO" && (
                                                    <button
                                                        className="painel-cancel-button"
                                                        onClick={() =>
                                                            setConsultaParaCancelar(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        Cancelar
                                                    </button>
                                                )}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </section>
                    )}

                </main>

            </div>


            {/* MODAL DETALHES */}
            {consultaSelecionada && (

                <div
                    className="painel-modal-overlay"
                    onClick={() => setConsultaSelecionada(null)}
                >

                    <div
                        className="painel-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="painel-modal-header">

                            <div>
                                <h2>Detalhes da consulta</h2>
                                <p>Informações do seu agendamento.</p>
                            </div>

                            <button
                                className="painel-modal-close"
                                onClick={() => setConsultaSelecionada(null)}
                            >
                                ×
                            </button>

                        </div>


                        <div className="painel-modal-content">

                            <div className="painel-detail-item">
                                <span>Paciente</span>
                                <strong>
                                    {consultaSelecionada.nomeCliente}
                                </strong>
                            </div>

                            <div className="painel-detail-item">
                                <span>Data</span>
                                <strong>
                                    {consultaSelecionada.dataConsulta}
                                </strong>
                            </div>

                            <div className="painel-detail-item">
                                <span>Horário</span>
                                <strong>
                                    {consultaSelecionada.horarioConsulta}
                                </strong>
                            </div>

                            <div className="painel-detail-item">
                                <span>Status</span>
                                <strong>
                                    {consultaSelecionada.status}
                                </strong>
                            </div>

                        </div>


                        <div className="painel-modal-actions">

                            <button
                                className="painel-secondary-button"
                                onClick={() =>
                                    setConsultaSelecionada(null)
                                }
                            >
                                Fechar
                            </button>

                            {consultaSelecionada.status !== "CANCELADO" && (
                                <button
                                    className="painel-cancel-button painel-modal-cancel"
                                    onClick={() => {
                                        setConsultaParaCancelar(
                                            consultaSelecionada
                                        );
                                        setConsultaSelecionada(null);
                                    }}
                                >
                                    Cancelar consulta
                                </button>
                            )}

                        </div>

                    </div>

                </div>

            )}


            {/* MODAL CANCELAMENTO */}
            {consultaParaCancelar && (

                <div
                    className="painel-modal-overlay"
                    onClick={() => setConsultaParaCancelar(null)}
                >

                    <div
                        className="painel-confirm-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="painel-confirm-icon">
                            !
                        </div>

                        <h2>Cancelar consulta?</h2>

                        <p>
                            Tem certeza que deseja cancelar sua consulta
                            do dia{" "}
                            <strong>
                                {consultaParaCancelar.dataConsulta}
                            </strong>{" "}
                            às{" "}
                            <strong>
                                {consultaParaCancelar.horarioConsulta}
                            </strong>
                            ?
                        </p>


                        <div className="painel-confirm-actions">

                            <button
                                className="painel-secondary-button"
                                onClick={() =>
                                    setConsultaParaCancelar(null)
                                }
                            >
                                Voltar
                            </button>

                            <button
                                className="painel-confirm-cancel"
                                onClick={handleCancelarConsulta}
                            >
                                Sim, cancelar
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default PainelDoUsuario;