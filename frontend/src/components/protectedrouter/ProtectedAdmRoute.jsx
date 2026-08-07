import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // 1. Se nem estiver logado, manda para o login do ADM
  if (!usuario) {
    return <Navigate to="/loginadm" replace />;
  }

  // 2. Se estiver logado mas NÃO for um administrador
  // (ajuste 'usuario.tipo === "adm"' conforme a propriedade que vem do seu backend)
  if (usuario.tipo !== "adm") {
    return <Navigate to="/" replace />; // ou para uma página de "Acesso Negado"
  }

  return children;
};

export default ProtectedAdminRoute;