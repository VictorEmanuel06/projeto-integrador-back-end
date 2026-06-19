import "./CadastroAdm.css";
import ValidacaodeCadastroAdm from "../../services/ValidacaodeCadastroAdm";
import { useState } from "react";
 
const CadastroAdm = () => {
  const [valores, setValores] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const handleInput = (event) => {
    setValores((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
 
    // 1. Executa a validação passando os dados atuais
    const validationErrors = ValidacaodeCadastroAdm(valores);
    setErrors(validationErrors);
 
    // 2. Debug para você ver exatamente o que está acontecendo no console (F12)
    console.log("Valores digitados:", valores);
    console.log("Erros encontrados:", validationErrors);
 
    // 3. Verifica se TODOS os campos retornaram sem nenhuma mensagem de erro (string vazia)
    const semErros = Object.values(validationErrors).every((erro) => erro === "");
 
    if (semErros) {
      alert("Cadastro realizado com sucesso!");
      console.log("Enviando para o servidor:", valores);
     
      // Aqui você coloca o seu axios.post(...)
    }
  };
 
  return (
    <div className="card-cadAdm">
      <h1 className="title-cadAdm">Cadastro</h1>
 
      <p className="subtitle-cadAdm">
        Cadastre-se para acessar o site.
      </p>
 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            name="name"
            value={valores.name} // <-- ADICIONADO: Controla o input
            onChange={handleInput}
          />
          {errors.name && <span className="erro">{errors.name}</span>}
        </div>
 
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={valores.email} // <-- ADICIONADO: Controla o input
            onChange={handleInput}
          />
          {errors.email && <span className="erro">{errors.email}</span>}
        </div>
 
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={valores.password} // <-- ADICIONADO: Controla o input
            onChange={handleInput}
          />
          {errors.password && (
            <span className="erro">{errors.password}</span>
          )}
        </div>
 
        <div className="info-cadAdm">
          Seus dados são protegidos por protocolos de segurança.
          Não compartilhamos informações pessoais com terceiros.
        </div>
 
        <button type="submit" className="btn">
          Cadastrar conta →
        </button>
 
        <div className="login-adm">
          Já possui uma conta?
          <a href="/loginadm"> Clique para fazer login</a>
        </div>
      </form>
    </div>
  );
};
 
export default CadastroAdm;
 