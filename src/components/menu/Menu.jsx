import "../menu/Menu.css";
import logo_page from '../../assets/logo_page.png';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

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
          <Link to="/loginusuario">Login Usuário</Link>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.8s` : "", }}>
          <Link to="/Cadastrousuario">Cadastro Usuário</Link>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.9s` : "", }}>
          <Link to="/Recuperarsenhausuario">Recuperar senha Usuário</Link>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.10s` : "", }}>
          <Link to="/Alterarsenhausuario">Alterar Senha Usuário</Link>
        </li> */}

        
        { // Linhas ADM comentadas por ter aparecido no menu, deixei por precaução
        
        /* <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.11s` : "", }}>
          <Link to="/LoginAdm">Login Adm</Link>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.12s` : "", }}>
          <Link to="/CadastroAdm">Cadastro Adm</Link>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.13` : "", }}>
          <Link to="/RecuperarSenhaAdm">Recuperar Senha Adm</Link>
        </li>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.14s` : "", }}>
          <Link to="/AlterarSenhaadm">Alterar senha Adm</Link>
        </li> */}

      </ul>
    </nav>
  )
}

export default Menu;