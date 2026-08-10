import "./Menu.css";
import logo_page from '../../assets/logo_page.png';
import icon_sair from '../../assets/icon_sair.png';
import icon_user from '../../assets/icon_user.png';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function Menu() {
  const [active, setActive] = useState(false);
  const [popoverAberto, setPopoverAberto] = useState(false);
  const { usuarioLogado, setUsuarioLogado } = useAuth();
  const navegacao = useNavigate();

  // Verifica dados do usuário logado
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
  const eAdmin = usuarioSalvo?.tipo === "adm";

  const handleLogout = () => {
    axios.get('http://localhost:7006/logout', { withCredentials: true })
      .then(() => {
        localStorage.removeItem("usuario");
        setUsuarioLogado(false);
        setPopoverAberto(false);
        if (eAdmin) {
          navegacao('/loginadm');
        } else {
          navegacao('/loginusuario');
        }
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("usuario");
        setUsuarioLogado(false);
        setPopoverAberto(false);
        navegacao('/loginusuario');
      });
  };

  return (
    <nav className='menu'>
      <NavLink to="/" className="logo-menu"> 
        <img src={logo_page} className='logo-menu' alt='Logo' /> 
      </NavLink>

      {/* Ícone Hamburguer para Mobile */}
      <div
        className={`mobile-menu ${active ? "active" : ""}`}
        onClick={() => setActive(!active)}
      >
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>

      {/* Links de Navegação */}
      <ul className={`nav-list ${active ? "active" : ""}`}>
        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.3s` : "" }}>
          <NavLink to="/" onClick={() => setActive(false)}>Home</NavLink>
        </li>

        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.4s` : "" }}>
          <NavLink to="/SobreMim" onClick={() => setActive(false)}>Sobre Mim</NavLink>
        </li>

        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.5s` : "" }}>
          <NavLink to="/Servicos" onClick={() => setActive(false)}>Serviços</NavLink>
        </li>

        <li style={{ animation: active ? `navLinkFade 0.5s ease forwards 0.6s` : "" }}>
          <NavLink to="/Contatos" onClick={() => setActive(false)}>Contatos</NavLink>
        </li>

        {/* Ícone de Perfil com Menu Popover Flutuante */}
                <li className="item-login">
          {usuarioLogado ? (
            <div 
              className="user-popover-container"
              onMouseLeave={() => setPopoverAberto(false)} // Fecha apenas quando o cursor realmente sair de toda a área
            >
              <img
                src={icon_sair}
                alt="Perfil"
                className="icon_sair"
                onClick={() => setPopoverAberto(!popoverAberto)}
              />

             {popoverAberto && (
                  <div className="admin-popover">
                    {eAdmin ? (
                      <>
                        <span className="popover-title">Painel ADM</span>
                        <NavLink 
                          to="/usuarioscadastrados" 
                          onClick={() => { setPopoverAberto(false); setActive(false); }}
                        >
                          Usuários
                        </NavLink>
                        <NavLink 
                          to="/listadeagendamento" 
                          onClick={() => { setPopoverAberto(false); setActive(false); }}
                        >
                          Agendamentos
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <span className="popover-title">Minha Conta</span>
                        <NavLink 
                          to="/paineldousuario" 
                          onClick={() => { setPopoverAberto(false); setActive(false); }}
                        >
                          Meu Painel
                        </NavLink>
                      </>
                    )}
                    <div className="popover-divider"></div>

                    <button onClick={handleLogout} className="btn-popover-sair">
                      Sair da conta
                    </button>
                  </div>
                )}
            </div>
          ) : (
            <NavLink to="/loginusuario" className="login-icon" onClick={() => setActive(false)}>
              <img src={icon_user} alt="Login" className="icon_user" />
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Menu;