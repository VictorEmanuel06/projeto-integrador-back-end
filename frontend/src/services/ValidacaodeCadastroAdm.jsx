function ValidacaodeCadastroAdm(valores){
  let error = {}
 
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // Permitindo caracteres especiais e exigindo no mínimo 8 caracteres
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
 
  if(valores.name === ""){
      error.name = "O campo não pode estar vazio";
  }
  else{
      error.name = "";
  }
 
  if(valores.email === ""){
      error.email = "O campo não pode estar vazio";
  }
  else if(!email_pattern.test(valores.email)){
      error.email = "Preenchimento incorreto, exemplo: teste@teste.com";
  }
  else{
      error.email = "";
  }
 
  if(valores.password === ""){
      error.password = "O campo não pode estar vazio";
  }
  else if(!password_pattern.test(valores.password)){
      error.password = "A senha deve ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 minúscula e 1 número.";
  }
  else {
      error.password = "";
  }
 
  return error;
}
export default ValidacaodeCadastroAdm;
 