import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
 
const AuthContext = createContext();
 
export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
 
  useEffect(() => {
    axios
      .get("http://localhost:7006/verificar-login", { withCredentials: true })
      .then((res) => setUsuarioLogado(res.data.logado))
      .catch(() => setUsuarioLogado(false));
  }, []);
 
  return (
    <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  return useContext(AuthContext);
}