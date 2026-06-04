import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css';

import "./index.css";

import App from "./App.jsx";

import { createBrowserRouter, RouterProvider, Route, Navigate} from "react-router-dom";

/* ROTAS */
import Home from "./pages/home/Home.jsx";
import SobreMim from "./pages/sobremim/SobreMim.jsx";
import Servicos from "./pages/servicos/Servicos.jsx";
import Contatos from "./pages/contats/Contatos.jsx";
import Agendamento from "./pages/agendamento/Agendamento.jsx";

// importando usuario
import LoginUsuario from "./pages/loginUsuario/LoginUsuario.jsx";
import CadastroUsuario from "./pages/cadastroUsuario/CadastroUsuario.jsx";
import RecuperarSenhaUsuario from "./pages/RecuperarSenhaUsuario/RecuperarSenhaUsuario.jsx";
import AlterarSenhaUsuario from "./pages/alterarSenhaUsuario/AlterarSenhaUsuario.jsx";

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
        path: "/agendamento",
        element: <Agendamento />
      },

      // // Usuario
      {
        path: "/loginusuario",
        element: <LoginUsuario />

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
      }


    ]
  }
]);

/*RENDERIZA */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);