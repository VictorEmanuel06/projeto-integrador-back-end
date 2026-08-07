import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Importa seu AuthContext

const LogOutAdm = () => {
  const [name, setName] = useState('');
  const navegacao = useNavigate();
  const { setUsuarioLogado } = useAuth(); // Atualiza o estado global de autenticação

  axios.defaults.withCredentials = true;

  // Verifica se o admin está autenticado ao carregar a tela
  useEffect(() => {
    axios.get('http://localhost:7006', { withCredentials: true })
      .then(res => {
        if (res.data.valid) {
          setName(res.data.name || "Administrador");
        } else {
          navegacao('/loginadm');
        }
      })
      .catch(err => {
        console.log(err);
        navegacao('/loginadm');
      });
  }, [navegacao]);

  // Função de Logout do ADM
  const handleLogout = () => {
    axios.get('http://localhost:7006/logout', { withCredentials: true })
      .then(() => {
        // 1. Limpa os dados salvos no navegador
        localStorage.removeItem("usuario");

        // 2. Atualiza o contexto global
        setUsuarioLogado(false);

        // 3. Redireciona para o login do Administrador
        navegacao('/loginadm');
      })
      .catch(err => {
        console.log(err);
        
        // Garante a saída mesmo em caso de erro na requisição
        localStorage.removeItem("usuario");
        setUsuarioLogado(false);
        navegacao('/loginadm');
      });
  };

  return (
    <div>
      <h1>Painel do Administrador - Bem-vindo(a) {name}</h1>
      <button onClick={handleLogout}>Sair do Painel</button>
    </div>
  );
};

export default LogOutAdm;