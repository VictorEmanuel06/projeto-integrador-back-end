import './Footer.css'
// import logo_page from '';

const footer = () => {

  return (
      <div>
        <footer className="footer">
    <div id="footer_content">

        <div className="footer_block footer_left">
            <img src={logo_page} width="200" />
        </div>

        <div className="footer_block footer-center">
            <ul>
                <li><a href="./home.html">Home</a></li>
                <li><a href="./servicos.html">Serviços</a></li>
            </ul>

            <ul>
                <li><a href="./telacontato.html">Contatos</a></li>
                <li><a href="./sobremim.html">Sobre Mim</a></li>
            </ul>
        </div>

        <div className="footer_block footer_right">
            <h4>Contato</h4>
            <p>
                <i className="fa-brands fa-whatsapp"></i>(11) 99267-8813
            </p>
            <p>
                <i className="fa-solid fa-envelope"></i> neves.romulo@yahoo.com</p>

            <h4>Endereço</h4>
            <p><i className="fa-solid fa-location-dot outline"></i>Rua Salvador Iacona, 27<br/>Vila Santa Catarina</p>
              </div>

            </div>
            </footer>
      </div>
  )
}

export default footer;