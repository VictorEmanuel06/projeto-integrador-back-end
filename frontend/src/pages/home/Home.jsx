import { useEffect, useRef, useState } from 'react';
import './Home.css';

import cuidado from '../../assets/img_cuidado.png';
import acolhimento from '../../assets/img_acolhimento.png';
import autoconhecimento from '../../assets/img_autoconhecimento.png';

import terapia from '../../assets/icon_terapia.png';
import icon_auto from '../../assets/img_autoconhecimento.png';
import relacionamento from '../../assets/icon_relacionamentos.png';
import equilibrio from '../../assets/icon_equilibrio.png';
import emocoes from '../../assets/icon_emocoes.png';


const Home = () => {

    const [pilarAberto, setPilarAberto] = useState(null);

    // Referência SOMENTE para a área das caixas
    const pilaresRef = useRef(null);


    // =========================================================
    // PILARES
    // =========================================================

    const pilares = [
        {
            id: 1,
            icone: terapia,
            titulo: 'Terapia',
            texto:
                'Um espaço seguro para você se ouvir e ser ouvido, com acolhimento e ética.'
        },

        {
            id: 2,
            icone: icon_auto,
            titulo: 'Autoconhecimento',
            texto:
                'Compreender quem você é, suas emoções e comportamentos, para crescer com mais clareza.'
        },

        {
            id: 3,
            icone: relacionamento,
            titulo: 'Relacionamentos',
            texto:
                'Construir vínculos mais saudáveis com quem está ao seu redor e com você mesmo.'
        },

        {
            id: 4,
            icone: equilibrio,
            titulo: 'Equilíbrio',
            texto:
                'Encontrar harmonia entre suas emoções, rotina e bem-estar no dia a dia.'
        },

        {
            id: 5,
            icone: emocoes,
            titulo: 'Emoções positivas',
            texto:
                'Cultivar sentimentos que fortalecem sua saúde mental e sua qualidade de vida.'
        }
    ];


    // =========================================================
    // ABRIR / FECHAR PILAR
    // =========================================================

    const toggleExpandir = (id) => {

        setPilarAberto((atual) => {

            if (atual === id) {
                return null;
            }

            return id;

        });

    };


    // =========================================================
    // CLICOU FORA DAS CAIXAS
    // =========================================================

    useEffect(() => {

        const handleClickFora = (event) => {

            if (
                pilaresRef.current &&
                !pilaresRef.current.contains(event.target)
            ) {

                setPilarAberto(null);

            }

        };


        document.addEventListener('mousedown', handleClickFora);


        return () => {

            document.removeEventListener(
                'mousedown',
                handleClickFora
            );

        };

    }, []);


    return (

        <main className="container">


            {/* =====================================================
                BEM-VINDO
            ====================================================== */}

            <section className="caixa-bem-vindo">

                <div className="texto">

                    <h1>
                        Bem-Vindo(a).
                    </h1>

                    <p>
                        Se ao você compartilhar sua <br />
                        história você abre espaço <br />
                        para ser escutado.
                    </p>

                </div>


                <div className="img-2">

                    <img
                        src={acolhimento}
                        alt="Ilustração de acolhimento"
                    />

                </div>

            </section>



            {/* =====================================================
                CUIDADO
            ====================================================== */}

            <section className="caixa-cuidado">

                <div className="texto">

                    <h1>
                        Você Merece <br />
                        Cuidado.
                    </h1>

                    <p>
                        Psicoterapia para adultos <br />
                        com acolhimento e ética
                    </p>

                </div>


                <div className="img-1">

                    <img
                        src={cuidado}
                        alt="Ilustração sobre cuidado emocional"
                    />

                </div>

            </section>



            {/* =====================================================
                AUTOCONHECIMENTO
            ====================================================== */}

            <section className="caixa-autoconhecimento">

                <div className="autoconhecimento">

                    <div className="titulo-autoconhecimento">

                        <img
                            src={autoconhecimento}
                            alt="Ícone de autoconhecimento"
                        />

                        <h1>
                            Autoconhecimento
                        </h1>

                    </div>


                    <p>
                        O autoconhecimento é a capacidade de compreender
                        quem somos, nossas emoções, pensamentos e
                        comportamentos, permitindo maior equilíbrio e
                        crescimento pessoal.
                    </p>

                </div>

            </section>



            {/* =====================================================
                OS 5 PILARES
            ====================================================== */}

            <section className="caixa-pilares">

                <h1 className="os-cinco-pilares">
                    Os 5 Pilares da Psicologia
                </h1>


                <div className="pilares-wrapper">


                    {/* =================================================
                        CÍRCULO
                    ================================================== */}

                    <div className="circulo">

                        <ul className="letras-perma">

                            <li className="p">
                                T
                            </li>

                            <li className="e">
                                A
                            </li>

                            <li className="r">
                                R
                            </li>

                            <li className="m">
                                E
                            </li>

                            <li className="a">
                                E
                            </li>

                        </ul>

                    </div>



                    {/* =================================================
                        CAIXAS
                    ================================================== */}

                    <div
                        ref={pilaresRef}
                        className="pilares-cards"
                    >

                        {pilares.map((pilar, index) => {

                            const aberto =
                                pilarAberto === pilar.id;


                            return (

                                <div
                                    key={pilar.id}
                                    className={`
                                        pilar
                                        pilar-${index + 1}
                                        ${aberto ? 'pilar-expandido' : ''}
                                    `}
                                    onClick={() =>
                                        toggleExpandir(pilar.id)
                                    }
                                >


                                    {/* CABEÇALHO */}

                                    <div className="pilar-cabecalho">

                                        <img
                                            src={pilar.icone}
                                            alt={`Ícone de ${pilar.titulo}`}
                                        />

                                        <span>
                                            {pilar.titulo}
                                        </span>

                                    </div>



                                    {/* CONTEÚDO */}

                                    <div
                                        className={`
                                            pilar-conteudo
                                            ${aberto ? 'conteudo-aberto' : ''}
                                        `}
                                    >

                                        <p className="pilar-texto">
                                            {pilar.texto}
                                        </p>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </section>

        </main>

    );

};


export default Home;