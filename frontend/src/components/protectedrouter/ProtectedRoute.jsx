// components/protectedrouter/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, apenasAdmin = false }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // 1. Não está logado -> Redireciona para o login correto
  if (!usuario) {
    return <Navigate to={apenasAdmin ? "/loginadm" : "/loginusuario"} replace />;
  }

  // 2. É rota de ADMIN, mas o usuário logado NÃO é "adm" -> Bloqueia e manda pra Home
  if (apenasAdmin && usuario.tipo !== "adm") {
    return <Navigate to="/" replace />;
  }

  // 3. Se passou nas validações, exibe a página
  return children;
};

export default ProtectedRoute;