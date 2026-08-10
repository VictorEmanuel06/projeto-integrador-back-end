import ProtectedRoute from "./ProtectedRoute";

// Mantido como um atalho para não precisar trocar
// <ProtectedAdminRoute> por <ProtectedRoute apenasAdmin> em todo lugar
// que já usa esse componente no main.jsx.
const ProtectedAdminRoute = ({ children }) => {
  return <ProtectedRoute apenasAdmin={true}>{children}</ProtectedRoute>;
};

export default ProtectedAdminRoute;