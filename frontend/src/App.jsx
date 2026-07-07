import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import "./App.css";

// importando outlet
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <Menu />

      <main className="conteudo">
        <Outlet />
      </main>


      <Footer />
    </div>
  )
}

export default App;
