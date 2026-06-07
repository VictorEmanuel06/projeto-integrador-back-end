import "./AlterarSenhaUsuario.css";

const AlterarSenhaUsuario = () => {
    return (
        <div>

       
            <main>

                <div className="card">

                    <h1 className="card_h1">Alterar senha</h1>

                    <p className="descricao">
                        Atualize suas credenciais de acesso com segurança.
                    </p>


                    <form>

                        <label>Senha atual</label>
                        <input type="password" />

                        <label>Nova senha</label>
                        <input type="password" />

                        <label>Confirmar nova senha</label>
                        <input type="password" />


                        <div className="alerta">
                            Certifique-se de que sua senha contenha letras,
                            números e símbolos. Nunca compartilhamos seus
                            dados de acesso e sua privacidade é nossa prioridade absoluta.
                        </div>

                        
                            <button className="salvar">
                                SALVAR NOVA SENHA
                            </button>
                        

                        <a href="#" className="cancelar">
                            Cancelar
                        </a>

                    </form>

                </div>

            </main>

      

        </div>
    )
}

export default AlterarSenhaUsuario;