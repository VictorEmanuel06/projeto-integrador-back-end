import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/* ROTAS */
import Home from "./routes/Home";
import SobreMim from "./routes/SobreMim";
import Servicos from "./routes/Servicos";
import Contatos from "./routes/Contatos";

// importando usuario
import LoginUsuario from "./routes/LoginUsuario.jsx";
import CadastroUsuario from "./routes/CadastroUsuario.jsx";
import RecuperarSenhaUsuario from "./routes/RecuperarSenhaUsuario.jsx";
import AlterarSenhaUsuario from "./routes/AlterarSenhaUsuario.jsx";

// importando ADM
import LoginAdm from "./routes/LoginAdm.jsx";
import CadastroAdm from "./routes/CadastroAdm.jsx";
import RecuperarSenhaAdm from "./routes/RecuperarSenhaAdm.jsx";
import AlterarSenhaAdm from "./routes/AlterarSenhaAdm.jsx";


/* ROUTER */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { index: true, element: <Home /> },

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

      // Usuario
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