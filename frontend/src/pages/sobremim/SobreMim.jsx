import "./SobreMim.css";
import doutor from '../../assets/doutor - sobremim.jpg';
import { NavLink } from "react-router-dom";

const SobreMim = () => {
    return (
        <main className="sobre-page">

            {/* =====================================================
                APRESENTAÇÃO
            ===================================================== */}

            <section className="sobre-hero">

                <div className="sobre-hero-content">

                    {/* FOTO */}
                    <div className="sobre-foto-area">

                        <div className="sobre-foto-wrapper">
                            <img
                                src={doutor}
                                alt="Psicólogo"
                                className="sobre-foto"
                            />
                        </div>

                        <div className="sobre-frase">
                            <span className="aspas">“</span>

                            <p>
                                A transformação começa quando
                                você se permite se ouvir.
                            </p>

                            <span className="linha-frase"></span>
                        </div>

                    </div>


                    {/* TEXTO */}
                    <div className="sobre-introducao">

                        <span className="sobre-label">
                            SOBRE MIM
                        </span>

                        <h1>
                            Escuta, acolhimento
                            <br />
                            e transformação.
                        </h1>

                        <p className="sobre-texto">
                            Sou psicólogo especializado em ajudar pessoas
                            a lidarem com ansiedade, autoestima e conflitos
                            emocionais. Meu objetivo é oferecer um espaço
                            seguro para você se expressar, compreender suas
                            emoções e construir novas possibilidades.
                        </p>


                        {/* BENEFÍCIOS */}

                        <div className="beneficios">

                            <div className="beneficio">

                                <div className="beneficio-icon">
                                    <i className="fa-regular fa-user"></i>
                                </div>

                                <span>
                                    Atendimento humanizado
                                    <br />
                                    e individualizado
                                </span>

                            </div>


                            <div className="beneficio">

                                <div className="beneficio-icon">
                                    <i className="fa-solid fa-brain"></i>
                                </div>

                                <span>
                                    Abordagem baseada
                                    <br />
                                    na Psicanálise
                                </span>

                            </div>


                            <div className="beneficio">

                                <div className="beneficio-icon">
                                    <i className="fa-solid fa-lock"></i>
                                </div>

                                <span>
                                    Ambiente seguro,
                                    <br />
                                    ético e acolhedor
                                </span>

                            </div>


                            <div className="beneficio">

                                <div className="beneficio-icon">
                                    <i className="fa-solid fa-spa"></i>
                                </div>

                                <span>
                                    Foco no autoconhecimento
                                    <br />
                                    e no bem-estar
                                </span>

                            </div>

                        </div>


                        {/* BOTÃO */}

                        <NavLink
                            to="/agendamento"
                            className="sobre-btn"
                        >
                            <i className="fa-regular fa-calendar"></i>
                            Agende sua sessão!
                        </NavLink>

                    </div>

                </div>

            </section>


            {/* =====================================================
                INFORMAÇÕES PROFISSIONAIS
            ===================================================== */}

            <section className="informacoes-profissionais">

                <div className="info-card">

                    <div className="info-icon">
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>

                    <h3>Formação</h3>

                    <p>
                        Formação Centro Universitário
                        FMU (1997)
                    </p>

                    <p>
                        Pós-graduação em psicoterapia
                        psicanalítica pela UNIP (2023)
                    </p>

                </div>


                <div className="info-card">

                    <div className="info-icon">
                        <i className="fa-regular fa-user"></i>
                    </div>

                    <h3>Especializações</h3>

                    <p>
                        Ansiedade, autoestima
                        e relacionamentos
                    </p>

                </div>


                <div className="info-card">

                    <div className="info-icon">
                        <i className="fa-regular fa-lightbulb"></i>
                    </div>

                    <h3>Abordagem Terapêutica</h3>

                    <p>
                        Psicanálise
                    </p>

                </div>


                <div className="info-card">

                    <div className="info-icon">
                        <i className="fa-regular fa-star"></i>
                    </div>

                    <h3>Experiência</h3>

                    <p>
                        26 Anos
                    </p>

                    <span className="info-extra">
                        dedicados à saúde mental
                        e ao cuidado com pessoas
                    </span>

                </div>

            </section>

        </main>
    );
};

export default SobreMim;