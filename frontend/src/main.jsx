import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css';

import "./index.css";

import App from "./App.jsx";

import ErrorPage from "./pages/errorpage/ErrorPage.jsx";

import { createBrowserRouter, RouterProvider, Route, Navigate} from "react-router-dom";

// Proteção da rota
import ProtectedRoute from "./components/protectedrouter/ProtectedRoute.jsx";

// Proteção de rota apenas para administradores
import ProtectedAdminRoute from "./components/protectedrouter/ProtectedAdmRoute.jsx";

/* ROTAS */
import Home from "./pages/home/Home.jsx";
import SobreMim from "./pages/sobremim/SobreMim.jsx";
import Servicos from "./pages/servicos/Servicos.jsx";
import Contatos from "./pages/contats/Contatos.jsx";
import Agendamento from "./pages/agendamento/Agendamento.jsx";
import ListadeAgendamento from "./pages/ListaDeAgendamentos/ListadeAgendamento.jsx";

// importando usuario
import LoginUsuario from "./pages/loginUsuario/LoginUsuario.jsx";
import CadastroUsuario from "./pages/cadastroUsuario/CadastroUsuario.jsx";
import RecuperarSenhaUsuario from "./pages/RecuperarSenhaUsuario/RecuperarSenhaUsuario.jsx";
import AlterarSenhaUsuario from "./pages/alterarSenhaUsuario/AlterarSenhaUsuario.jsx";
import VerificarCodigo from "./verificarCodigo/VerificarCodigo.jsx";
import UsuariosCadastrados from "./pages/usuariosCadastrad/usuariosCadastrados.jsx";
import EditarUsuario from "./pages/editarUsuario/EditarUsuario.jsx";
import PainelDoUsuario from "./pages/Paineldousuario/PainelDoUsuario.jsx";


// importando ADM
import LoginAdm from "./pages/loginAdm/LoginAdm.jsx";
import CadastroAdm from "./pages/cadastroAdm/CadastroAdm.jsx";
import RecuperarSenhaAdm from "./pages/recuperarSenhaAdm/RecuperarSenhaAdm.jsx";
import AlterarSenhaAdm from "./pages/alterarSenhaAdm/AlterarSenhaAdm.jsx";

//Calendario para teste
import Calendario from "./components/calendario/Calendario.jsx";


/* ROUTER */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
      path: "/", 
      element: <Home />
      },

      {
        path: "/SobreMim",
        element: <SobreMim />
      },
      {
        path: "/Servicos",
        element: <Servicos />
      },
      {
        path: "/contatos",
        element: <Contatos />
      },
      {
        path: "/agendamento/:id",
        element: <Agendamento />
      },
      {
        path: "/agendamento",
        element: <Agendamento />
      },
      {
        path: "/listadeagendamento",
        element: (
          <ProtectedRoute apenasAdmin={true}>
            <ListadeAgendamento />
          </ProtectedRoute>
        )
      },

      {
        path: "/usuarioscadastrados",
        element: (
          <ProtectedRoute apenasAdmin={true}>
            <UsuariosCadastrados />
          </ProtectedRoute>
        )
      },

      // // Usuario
      {
        path: "/loginusuario",
        element: <LoginUsuario />

      },
      {
        path: "/paineldousuario",
        element: <PainelDoUsuario />
      },
      {
        path: "/cadastrousuario",
        element: <CadastroUsuario />

      },
      {
        path: "/recuperarsenhausuario",
        element: <RecuperarSenhaUsuario />

      },
      {
        path: "/alterarsenhausuario",
        element: <AlterarSenhaUsuario />

      },
      {
        path: "/editarusuario/:id",
        element: (
          <ProtectedRoute apenasAdmin={true}>
            <EditarUsuario />
          </ProtectedRoute>
        )
      },

      // ADM

      {
        path: "/loginadm",
        element: <LoginAdm />

      },
      {
        path: "/cadastroadm",
        element: <CadastroAdm />

      },
      {
        path:"/recuperarsenhaadm",
        element: <RecuperarSenhaAdm />

      },
      {
        path: "/alterarsenhaadm",
        element: <AlterarSenhaAdm />

      },
      {
        path: "/calendario",
        element: <Calendario />
      },

      // verificar codigo

      {
        path: "/verificar-codigo",
        element:<VerificarCodigo />
      },
      

    ]
  }
]);

/*RENDERIZA */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);