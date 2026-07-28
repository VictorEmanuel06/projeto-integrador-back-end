import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import "./App.css";
import { AuthProvider } from './context/AuthContext';

// importando outlet
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <AuthProvider >
    <div className='App'>
      <Menu />
      <main className="conteudo">
        <Outlet />
      </main>
      <Footer />
    </div>
    </AuthProvider>
  )
}

export default App;
