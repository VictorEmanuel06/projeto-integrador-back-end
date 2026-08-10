// components/protectedrouter/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, apenasAdmin = false }) => {
  const [status, setStatus] = useState('carregando');
  const [ehAdmin, setEhAdmin] = useState(false);

  useEffect(() => {
    const verificarSessao = async () => {
      try {
        const res = await fetch('http://localhost:7006/', {
          credentials: 'include'
        });
        const dados = await res.json();

        if (dados.valid) {
          localStorage.setItem("usuario", JSON.stringify({
            id: dados.id,
            nomecompleto: dados.nomecompleto,
            tipo: dados.tipo
          }));
          setEhAdmin(dados.tipo === 'adm');
          setStatus('valido');
        } else {
          localStorage.removeItem("usuario");
          setStatus('invalido');
        }
      } catch (err) {
        localStorage.removeItem("usuario");
        setStatus('invalido');
      }
    };

    verificarSessao();
  }, []);

  if (status === 'carregando') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Verificando sessão...</div>;
  }

  if (status === 'invalido') {
    return <Navigate to={apenasAdmin ? "/loginadm" : "/loginusuario"} replace />;
  }

  if (apenasAdmin && !ehAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;