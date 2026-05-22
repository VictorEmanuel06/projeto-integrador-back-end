import './App.css';
import Footer from '../src/components/footer/Footer';
import Menu from '../src/components/menu/Menu';
import Home from './routes/Home';

function App() {

  return (
    <div>
      <Menu />
      <Home />
      <Footer />
    </div>
  )
}

export default App;
