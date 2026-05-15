import './Menu.css';
import logo_page from '../assets/logo_page.png'
import { useState } from 'react';

function Menu () {
  const [active, setActive] = useState(false);

  return (
      <nav className='menu'>
              <img src= {logo_page} className='logo-menu' alt='Logo' />

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

                  <li style={{animation: active ? `navLinkFade 0.5s ease forwards 0.3s` : "",}}>
                      <a href='/'>Home</a>
                  </li>

                  <li style={{animation: active ? `navLinkFade 0.5s ease forwards 0.4s` : "",}}>
                    <a href='/'>Sobre Mim </a>
                  </li>

                  <li style={{animation: active ? `navLinkFade 0.5s ease forwards 0.5s` : "",}}>
                    <a href='/'>Serviços</a>
                  </li> 

                  <li style={{animation: active ? `navLinkFade 0.5s ease forwards 0.6s` : "",}}>
                    <a href='/'>Contatos</a>
                  </li>

              </ul>
      </nav> 
  )
}

export default Menu;