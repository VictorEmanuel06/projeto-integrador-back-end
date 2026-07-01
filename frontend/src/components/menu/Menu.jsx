import "./Menu.css";
import logo_page from '../../assets/logo_page.png';
import icon_sair from '../../assets/icon_sair.png';
import user from '../../assets/user.png';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";


function Menu() {
  const [active, setActive] = useState(false);

  const usuarioLogado = true;

  return (
    <nav className='menu'>
      <NavLink to="/" className="logo-link">
       <img src={logo_page} className='logo-menu' alt='Logo' />
      </NavLink>

      {/* Menu Hamburguer */}
      <div
        className={`mobile-menu ${active ? "active" : ""}`}
        onClick={() => setActive(!active)}
      >
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>

      {/* LINKS */}

      <ul className={`nav-list ${active ? "active" : ""}`}>

        <li className="item-login" style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.6s` : ""}}>
          <NavLink to="/loginusuario" className="login-icon" >
            {usuarioLogado ? (
              <img src={icon_sair} alt="Sair" className="icon-sair" />
            ) : (
              <FaUser />
            )}
          </NavLink>
        </li>

        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.3s` : "", }}>
          <NavLink to="/">Home</NavLink>
        </li>

        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.4s` : "", }}>
          <NavLink to="/SobreMim">Sobre Mim</NavLink>
        </li>

        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.5s` : "", }}>
          <NavLink to="/Servicos">Serviços</NavLink>
        </li>

        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.6s` : "", }}>
          <NavLink to="/Contatos">Contatos</NavLink>
        </li>

      </ul>
    </nav>
  )
}

export default Menu;