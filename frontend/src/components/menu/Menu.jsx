import "./Menu.css";

import logo_page from "../../assets/logo_page.png";
import icon_sair from "../../assets/icon_sair.png";
import icon_user from "../../assets/icon_user.png";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function Menu() {
  const [active, setActive] = useState(false);
  const [popoverAberto, setPopoverAberto] = useState(false);

  const { usuarioLogado, setUsuarioLogado } = useAuth();

  const navegacao = useNavigate();

  // =====================================================
  // USUÁRIO LOGADO
  // =====================================================

  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

  const eAdmin = usuarioSalvo?.tipo === "adm";


  // =====================================================
  // FECHAR MENU
  // =====================================================

  const fecharMenu = () => {
    setActive(false);
    setPopoverAberto(false);
  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    axios
      .get("http://localhost:7006/logout", {
        withCredentials: true,
      })
      .then(() => {
        localStorage.removeItem("usuario");

        setUsuarioLogado(false);

        setPopoverAberto(false);

        setActive(false);

        if (eAdmin) {
          navegacao("/loginadm");
        } else {
          navegacao("/loginusuario");
        }
      })
      .catch((err) => {
        console.error("Erro ao fazer logout:", err);

        localStorage.removeItem("usuario");

        setUsuarioLogado(false);

        setPopoverAberto(false);

        setActive(false);

        navegacao("/loginusuario");
      });
  };


  // =====================================================
  // JSX
  // =====================================================

  return (
    <nav className="menu">


      {/* =================================================
          LOGO
      ================================================= */}

      <NavLink
        to="/"
        className="logo-menu-link"
        onClick={fecharMenu}
      >
        <img
          src={logo_page}
          className="logo-menu"
          alt="Logo RNR Psicólogo"
        />
      </NavLink>



      {/* =================================================
          HAMBÚRGUER
      ================================================= */}

      <button
        className={`mobile-menu ${active ? "active" : ""}`}
        onClick={() => setActive(!active)}
        aria-label="Abrir menu"
        aria-expanded={active}
      >
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </button>



      {/* =================================================
          LISTA DO MENU
      ================================================= */}

      <ul
        className={`nav-list ${active ? "active" : ""} ${
          popoverAberto ? "popover-open" : ""
        }`}
      >


        {/* =================================================
            LOGIN / PERFIL

            No mobile fica PRIMEIRO.
        ================================================= */}

        <li className="item-login">


          {usuarioLogado ? (

            <div
              className="user-popover-container"
              onMouseLeave={() => {
                if (window.innerWidth > 768) {
                  setPopoverAberto(false);
                }
              }}
            >


              {/* BOTÃO DO PERFIL */}

              <button
                className="profile-button"
                onClick={() =>
                  setPopoverAberto(!popoverAberto)
                }
                aria-label="Abrir menu da conta"
              >
                <img
                  src={icon_sair}
                  alt="Perfil"
                  className="icon_sair"
                />
              </button>



              {/* =================================================
                  POPOVER
              ================================================= */}

              {popoverAberto && (

                <div className="admin-popover">


                  {eAdmin ? (

                    <>
                      <span className="popover-title">
                        Painel ADM
                      </span>


                      <NavLink
                        to="/usuarioscadastrados"
                        onClick={fecharMenu}
                      >
                        Usuários
                      </NavLink>


                      <NavLink
                        to="/listadeagendamento"
                        onClick={fecharMenu}
                      >
                        Agendamentos
                      </NavLink>
                    </>

                  ) : (

                    <>
                      <span className="popover-title">
                        Minha Conta
                      </span>


                      <NavLink
                        to="/paineldousuario"
                        onClick={fecharMenu}
                      >
                        Meu Painel
                      </NavLink>
                    </>

                  )}



                  {/* DIVISOR */}

                  <div className="popover-divider"></div>



                  {/* SAIR */}

                  <button
                    onClick={handleLogout}
                    className="btn-popover-sair"
                  >
                    Sair da conta
                  </button>


                </div>

              )}

            </div>

          ) : (


            /* =================================================
               USUÁRIO NÃO LOGADO
            ================================================= */

            <NavLink
              to="/loginusuario"
              className="login-icon"
              onClick={fecharMenu}
            >
              <img
                src={icon_user}
                alt="Login"
                className="icon_user"
              />
            </NavLink>

          )}

        </li>



        {/* =================================================
            HOME
        ================================================= */}

        <li>
          <NavLink
            to="/"
            onClick={fecharMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>



        {/* =================================================
            SOBRE MIM
        ================================================= */}

        <li>
          <NavLink
            to="/SobreMim"
            onClick={fecharMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
          >
            Sobre Mim
          </NavLink>
        </li>



        {/* =================================================
            SERVIÇOS
        ================================================= */}

        <li>
          <NavLink
            to="/Servicos"
            onClick={fecharMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
          >
            Serviços
          </NavLink>
        </li>



        {/* =================================================
            CONTATOS
        ================================================= */}

        <li>
          <NavLink
            to="/Contatos"
            onClick={fecharMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link"
                : "nav-link"
            }
          >
            Contatos
          </NavLink>
        </li>


      </ul>

    </nav>
  );
}

export default Menu;