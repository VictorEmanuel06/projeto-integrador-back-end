// Middleware para proteger rotas privadas
export const verificarLogin = (req, res, next) => {
    console.log("Sessão recebida no middleware:", req.session);

    if (req.session && req.session.usuario) {
        return next();
    }

    return res.status(401).json({
        error: "Usuário não autenticado"
    });
};
