import "./SobreMim.css";
import doutor from '../../assets/doutor.jpg';

const SobreMim = () => {
  return (
    <>
        <section className="Sobre-mim">
        <h1>Sobre Mim</h1>
        <div className="perfil">
            <img src={doutor} alt="Foto de Jack Smith" className="foto" />
            <p>
                Sou psicólogo especializado em ajudar pessoas a lidarem com ansiedade, autoestima e conflitos
                emocionais. Meu objetivo é oferecer um espaço seguro para você se expressar, compreender suas emoções e
                construir novas possibilidades.
            </p>    
        </div>
            <a href="#" class="btn">📅 Agende sua sessão!</a>

    </section>


    <section className="servicos">
        <div className="box">
            <h3>Formação</h3>
            <a href="#">Formação
                Centro Universitário FMU (1997)

                Pós-graduação em psicoterapia psicanalítica pela UNIP (2023)</a>
        </div>
        <div className="box">
            <h3>Especializações</h3>
            <a href="#">Ansiedade, autoestima e relacionamentos

            </a>
        </div>
        <div className="box">
            <h3>Abordagem Terapêutica</h3>
            <a href="#">Psicanálise</a>
        </div>
        <div className="box">
            <h3>Experiência</h3>
            <a href="#">26 Anos</a>
        </div>
    </section>
    </>
  )
}

export default SobreMim;