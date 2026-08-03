import "./Menu.css";
import logo_page from '../../assets/logo_page.png';
import icon_sair from '../../assets/icon_sair.png';
import icon_user from '../../assets/icon_user.png';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"
import { useAuth } from "../../context/AuthContext";
 
 
function Menu() {
  const [active, setActive] = useState(false);
 
    const { usuarioLogado, setUsuarioLogado } = useAuth(); //verificar se o usuario esta logado
 
  const navegacao = useNavigate();
 
  const handleLogout = () => {
  axios.get('http://localhost:7006/logout', { withCredentials: true })
    .then(res => {
      if (res.data.message) {
        setUsuarioLogado(false); // troca para o ícone de usuário
        navegacao('/loginusuario');
      }
    })
    .catch(err => console.log(err));
}
 
  return (
    <nav className='menu'>
      <NavLink to="/" className="logo-menu"> <img src={logo_page} className='logo-menu' alt='Logo' /> </NavLink>
 
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
 
        <li
  className="item-login"
  style={{
    animation: active ? `navLinkFade 0.5s ease forwards 0.6s` : ""
  }}
>
 <NavLink to="/loginusuario" className="login-icon">
  {usuarioLogado ? (
    <img
      src={icon_sair}
      alt="Sair"
      className="icon_sair"
      onClick={(e) => {
        e.preventDefault(); // evita navegar pro link enquanto faz logout
        handleLogout();
      }}
    />
  ) : (
    <img
      src={icon_user}
      alt="Login-user"
      className="icon_user"
    />
  )}
</NavLink>
</li>
 
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.3s` : "", }}>
          <NavLink to="/" className="menu-link">Home</NavLink>
        </li>
 
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.4s` : "", }}>
          <NavLink to="/SobreMim" className="menu-link">Sobre Mim</NavLink>
        </li>
 
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.5s` : "", }}>
          <NavLink to="/Servicos" className="menu-link">Serviços</NavLink>
        </li>
 
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.6s` : "", }}>
          <NavLink to="/Contatos" className="menu-link  ">Contatos</NavLink>
        </li>
 
      </ul>
    </nav>
  )
}
 
export default Menu;