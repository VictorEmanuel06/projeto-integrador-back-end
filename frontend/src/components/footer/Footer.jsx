import './Footer.css';

import logo_page from '../../assets/logo_page.png';

import { NavLink } from 'react-router-dom';

const Footer = () => {

    const endereco =
        "Rua Salvador Iacona, 27, Vila Santa Catarina, São Paulo, SP";

    const mapsUrl =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;

    return (
        <footer className="footer">

            <div className="footer-content">

                {/* =================================================
                    COLUNA 1 — LOGO / DESCRIÇÃO / REDES
                ================================================= */}

                <div className="footer-brand">

                    <NavLink to="/" className="footer-logo">
                        <img
                            src={logo_page}
                            alt="RNR Psicólogo"
                        />
                    </NavLink>

                    <p className="footer-description">
                        Escuta, acolhimento e transformação
                        <br />
                        para uma vida mais consciente.
                    </p>

                     <div className="footer-social">

                                <a
                                    href="https://wa.me/5511992678813"
                                    aria-label="WhatsApp"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="fa-brands fa-whatsapp"></i>
                                </a>

                                <a
                                    href="mailto:neves.romulo@yahoo.com"
                                    aria-label="E-mail"
                                >
                                <i className="fa-regular fa-envelope"></i>
                            </a>

                    </div>

                </div>


                {/* =================================================
                    COLUNA 2 — NAVEGAÇÃO
                ================================================= */}

                <div className="footer-column">

                    <h4>NAVEGAÇÃO</h4>

                    <ul>

                        <li>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/SobreMim">
                                Sobre Mim
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/Servicos">
                                Serviços
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/Contatos">
                                Contato
                            </NavLink>
                        </li>

                    </ul>

                </div>


                {/* =================================================
                    COLUNA 3 — SERVIÇOS
                ================================================= */}

                <div className="footer-column">

                    <h4>SERVIÇOS</h4>

                    <ul>

                        <li>
                            <span>Psicanálise</span>
                        </li>

                        <li>
                            <span>Terapia Individual</span>
                        </li>

                        <li>
                            <span>Autoconhecimento</span>
                        </li>

                        <li>
                            <span>Saúde Mental</span>
                        </li>

                    </ul>

                </div>


                {/* =================================================
                    COLUNA 4 — CONTATO
                ================================================= */}

                <div className="footer-column footer-contact">

                    <h4>CONTATO</h4>

                    <a
                        href="https://wa.me/5511992678813"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa-solid fa-phone"></i>

                        <span>
                            (11) 99267-8813
                        </span>
                    </a>


                    <a
                        href="mailto:neves.romulo@yahoo.com"
                    >
                        <i className="fa-regular fa-envelope"></i>

                        <span>
                            neves.romulo@yahoo.com
                        </span>
                    </a>


                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-address"
                    >
                        <i className="fa-solid fa-location-dot"></i>

                        <span>
                            Rua Salvador Iacona, 27
                            <br />
                            Vila Santa Catarina
                            <br />
                            São Paulo - SP
                        </span>
                    </a>

                </div>

            </div>


            {/* =================================================
                RODAPÉ / COPYRIGHT
            ================================================= */}

            <div className="footer-bottom">

                <p>
                    © 2024 RNR Psicólogo. Todos os direitos reservados.
                </p>

            </div>

        </footer>
    );
};

export default Footer;