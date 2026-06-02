import "../home/Home.css";
import cuidado from '../../assets/img_cuidado.png';
import acolhimento from '../../assets/img_acolhimento.png';
import autoconhecimento from '../../assets/img_autoconhecimento.png';
import terapia from '../../assets/icon_terapia.png';
import icon_auto from '../../assets/img_autoconhecimento.png';
import relacionamento from '../../assets/icon_relacionamentos.png';
import equilibrio from '../../assets/icon_equilibrio.png';
import emocoes from '../../assets/icon_emocoes.png';


const Home = () => {
  return (
<>
    <main className='container'>
            {/* <!-- CUIDADO --> */}

            <section className='caixa-cuidado'>
                <div className='texto'>
                    <h1>Você Merece <br />Cuidado.</h1>
                    <p>Psicoterapia para adultos <br />
                    com acolhimento e etica </p>
                </div>

                <div className='img-1'>
                    <img src={cuidado} alt='Ilustração sobre cuidado emocional' />
                </div>
            </section>

            {/* <!-- Bem Vindo --> */}
        
        <section className='caixa-bem-vindo'>
            <div className='texto'>
                    <h1>Bem-Vindo(a).</h1>
                    <p>
                    Se ao você compartilhar sua <br />
                    história você abre espaço <br />
                    para ser escutado.
                    </p>
            </div>

                <div className='img-2'>
                    <img src={acolhimento} alt='Ilustração de acolhimento' />
                </div>
        </section>

        {/* <!-- AUTOCONHECIMENTO  --> */}

        <section className='caixa-autoconhecimento'>
            <div className='autoconhecimento'>

                <div className='titulo-autoconhecimento'>
                    <img src={autoconhecimento} alt='Ícone de autoconhecimento' />
                    <h1>Autoconhecimento</h1>
                </div>
                
                <p>
                    O autoconhecimento é a capacidade de compreender a quem somos, nossas emoções, pensamentos e comportamentos, permintindo maior equilíbrio e crescimento pessoal.
                </p>

            </div>
        </section>

        {/* <!-- PILARES --> */}

        <section className='caixa-pilares'>
            <h1>Os 5 Pilares da Psicologia</h1>
        
            <div className='pilares-wrapper'>
                {/* <!-- Círculo --> */}
                <div className='circulo'>
                    <ul className='letras'>
                        <li className='p'>T</li>
                        <li className='e'>A</li>
                        <li className='r'>R</li>
                        <li className='m'>E</li>
                        <li className='a'>E</li>
                    </ul>
                </div>
        
                {/* <!-- Cards --> */}
                <div className='pilar pilar-1'>
                    <img src={terapia}/>
                    <span>Terapia</span>
                </div>
        
                <div className='pilar pilar-2'>
                    <img src={icon_auto}/>
                    <span>Autoconhecimento</span>
                </div>
        
                <div className='pilar pilar-3'>
                    <img src={relacionamento}/>
                    <span>Relacionamentos</span>
                </div>
        
                <div className='pilar pilar-4'>
                    <img src={equilibrio}/>
                    <span>Equilíbrio</span>
                </div>
        
                <div className='pilar pilar-5'>
                    <img src={emocoes}/>
                    <span>Emoções positivas</span>
                </div>
            </div>
        </section>
    </main>
  </>
  )
}

export default Home;