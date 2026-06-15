import { useRouteError } from "react-router-dom";
import './ErrorPage.css';
const ErrorPage = () => {

    const error = useRouteError();

    console.error(error);

  return (
    <div>
        <h1 className="error_page">Página não encontrada!</h1><br/>
        <p className="p_error_page">Temos um problema</p>
    </div>
  )
}

export default ErrorPage;