import './Footer.css'
import logo_page from '../../assets/logo_page.png';
import { NavLink } from "react-router-dom";

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
                <li>
                    <NavLink to= "/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/Servicos">Serviços</NavLink>
                </li>
            </ul>

            <ul>
                <li>
                    <NavLink to="/Contatos">Contatos</NavLink>
                </li>
                <li>
                    <NavLink to="/Sobremim">Sobre Mim</NavLink>
                </li>
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