import React, { useState } from "react";
 
function ValidacaodeCadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");

}
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (email === "") {
      setErroEmail("Digite um e-mail");
      return;
    }
 
    if (!emailPattern.test(email)) {
      setErroEmail("Digite um e-mail válido");
      return;
    }
 
    setErroEmail("");
    console.log("Formulário válido");
  };

export default ValidacaodeCadastro;