import "../menu/Menu.css";
import logo_page from '../../assets/logo_page.png';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";


function Menu() {
  const [active, setActive] = useState(false);

  return (
    <nav className='menu'>
      <img src={logo_page} className='logo-menu' alt='Logo' />

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

        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.6s` : ""}}>
          <NavLink to="/loginusuario" className="login-icon">
            <FaUser />
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
        


        {/* <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.7s` : "", }}>
          <NavLink to="/loginusuario">Login Usuário</NavLink>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.8s` : "", }}>
          <NavLink to="/Cadastrousuario">Cadastro Usuário</NavLink>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.9s` : "", }}>
          <NavLink to="/Recuperarsenhausuario">Recuperar senha Usuário</NavLink>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.10s` : "", }}>
          <NavLink to="/Alterarsenhausuario">Alterar Senha Usuário</NavLink>
        </li> */}


        { // Linhas ADM comentadas por ter aparecido no menu, deixei por precaução

        /* <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.11s` : "", }}>
          <NavLink to="/LoginAdm">Login Adm</NavLink>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.12s` : "", }}>
          <NavLink to="/CadastroAdm">Cadastro Adm</NavLink>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.13` : "", }}>
          <NavLink to="/RecuperarSenhaAdm">Recuperar Senha Adm</NavLink>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.14s` : "", }}>
          <NavLink to="/AlterarSenhaadm">Alterar senha Adm</NavLink>
        </li> */}

      </ul>
    </nav>
  )
}

export default Menu;