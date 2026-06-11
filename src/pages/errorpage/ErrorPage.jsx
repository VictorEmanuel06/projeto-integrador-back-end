import { useRouteError } from "react-router-dom";
import './ErrorPage.css';
const ErrorPage = () => {

    const error = useRouteError();

    console.error(error);

  return (
    <div>
        <h1>Página não encontrada!</h1><br/>
        <p>Temos um problema</p>
    </div>
  )
}

export default ErrorPage;