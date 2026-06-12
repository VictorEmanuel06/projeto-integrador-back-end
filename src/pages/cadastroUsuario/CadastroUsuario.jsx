import { NavLink, useNavigate } from "react-router-dom";
import "./CadastroUsuario.css"
import axios from "axios";

const CadastroUsuario = () => {
    const [valores, setValores] = useState({
        name: "",
        email: "",
        password: ""
    });

const navegacao = useNavigate();

const [errors, setErrors] = useState({})


const handleInput = async (event) => {
    setValores(prev => ({...prev, [event.target.name]: event.target.value}))
}

const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(ValidacaodeCadastro(valores));

    if(errors.name === "" && errors.email === "" && errors.password === ""){
        axios.post('http://localhost;7006/cadastrousuario', valores)
        .then(res => {
            console.log(res);
            navegacao("/loginusuario");
        })
        .catch(err => console.log(err));
    }
}






  return (
    <form action="" onSubmit={handleSubmit}>
        <div className="caixa-usuario">

        <h1 className="title-usuario">Cadastro</h1>

        <p className="subtitle-usuario">
            Cadastre-se para acessar o site.
        </p>

        <div className="form-usuario">
            <label>Nome Completo</label>
            <input type="text" placeholder="Digite seu nome completo" name="name"
                onChange={handleInput} 
            />
        </div>

        <div className="form-usuario">
            <label>E-mail</label>
            <input type="mail" name="email"
                onChange={handleInput} 
            />
        </div>

        <div className="form-usuario">
            <label>Senha</label>
            <input type="password" name="password"
                onChange={handleInput}
            />
        </div>

        <div className="form-usuario">
            <label>Confirmar senha</label>
            <input type="password"></input>
        </div>

        <div className="info-usuario">
            Seus dados são protegidos por protocolos de segurança.
            Não compartilhamos informações pessoais com terceiros.
        </div>

        <button className="btn-usuario">
            Cadastrar conta →
        </button>
            
            <NavLink to="/loginusuario" className="voltar_login" >Já possui uma conta? Clique para fazer login</NavLink>

    </div>
    </form>
  )
}

export default CadastroUsuario;