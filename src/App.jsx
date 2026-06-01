import Footer from '../src/components/footer/Footer';
import Menu from '../src/components/menu/Menu';

// importando outlet
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App;
