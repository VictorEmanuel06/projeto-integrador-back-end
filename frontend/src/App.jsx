import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import "./App.css";
import { AuthProvider } from './context/AuthContext';

// Importando o Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importando outlet
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Menu />
        <main className="conteudo">
          <Outlet />
        </main>
        <Footer />
        
        {/* Notificações visuais globais */}
        <ToastContainer 
            position="top-right"
            autoClose={3500}
            hideProgressBar={true}
            closeOnClick
            pauseOnHover
            draggable
          />
      </div>
    </AuthProvider>
  );
}

export default App;