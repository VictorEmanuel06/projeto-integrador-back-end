import './Menu.css';
import logo_page from '../assets/logo_page.png'

const Menu = () => {


  return (
    <nav>
        <div className='menu'>
            <img src= {logo_page} className='logo-menu' alt='Logo' />

            <div className='mobile-menu'>
                <div class='line1'></div>
                <div class='line2'></div>
                <div class='line3'></div>
            </div>

            <ul className='nav-list'>
                <li><a href='./home.html'>Home</a></li>
                <li><a href='./sobremim.html'>Sobre Mim </a></li>
                <li><a href='./servicos.html'>Serviços</a></li> 
                <li><a href='./telacontato.html'>Contatos</a></li>
            </ul>
       </div>
    </nav> 
  )
}

export default Menu;