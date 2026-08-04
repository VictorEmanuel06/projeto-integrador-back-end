import db from "../../db.js";
import bcrypt from "bcrypt";

// Cadastro de Usuário Comum
export const cadastrarUsuario = async (req, res) => {
    try {
        const sql = `INSERT INTO cadastro_cliente (nomecompleto, email, senha) VALUES(?)`;
        const hash = await bcrypt.hash(req.body.password, 10);
        const valores = [
            req.body.name.trim(),
            req.body.email.toLowerCase().trim(),
            hash
        ];

        db.query(sql, [valores], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Erro ao cadastrar" });
            }
            return res.json({ success: true, message: "Usuário cadastrado com sucesso" });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno" });
    }
};

// Cadastro de Administrador
export const cadastrarAdm = async (req, res) => {
    try {
        const sql = `INSERT INTO cadastro_adm (nomecompletoadm, emailadm, senhaadm) VALUES(?)`;
        const name = req.body.name.trim();
        const email = req.body.email.toLowerCase().trim();
        const hash = await bcrypt.hash(req.body.password, 10);

        db.query(sql, [[name, email, hash]], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Erro ao cadastrar" });
            }
            return res.json({ success: true, message: "Administrador cadastrado com sucesso" });
        });
    } catch (err) {
        return res.status(500).json({ error: "Erro interno" });
    }
};

// Login de Usuário Comum
export const loginUsuario = (req, res) => {
    const sql = "SELECT * FROM cadastro_cliente WHERE email = ?";
    const emailFormatado = req.body.email?.toLowerCase().trim();
    const { password } = req.body;

    db.query(sql, [emailFormatado], async (err, data) => {
        if (err) return res.status(500).json({ error: "Erro no login" });
        if (data.length === 0) return res.status(401).json({ error: "Email ou senha inválidos" });

        const usuario = data[0];
        const senhaCorreta = await bcrypt.compare(password, usuario.senha);
        if (!senhaCorreta) return res.status(401).json({ error: "Email ou senha inválidos" });

        req.session.usuario = {
            id: usuario.id_cliente,
            nomecompleto: usuario.nomecompleto,
            regra: 'user'
        };

        req.session.save((err) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar sessão" });
            
            // Retorno padronizado para o React
            return res.json({
                success: true,
                message: "Login realizado com sucesso",
                id: usuario.id_cliente,
                nomecompleto: usuario.nomecompleto,
                tipo: 'usuario'
            });
        });
    });
};

// Login de Administrador
export const loginAdm = (req, res) => {
    const sql = "SELECT * FROM cadastro_adm WHERE emailadm = ?";
    const emailFormatado = req.body.email?.toLowerCase().trim();
    const { password } = req.body;

    db.query(sql, [emailFormatado], async (err, data) => {
        if (err) return res.status(500).json({ error: "Erro no login" });
        if (data.length === 0) return res.status(401).json({ error: "Email ou senha inválidos" });

        const adm = data[0];
        const match = await bcrypt.compare(password, adm.senhaadm);
        if (!match) return res.status(401).json({ error: "Email ou senha inválidos" });

        req.session.usuario = {
            id: adm.id_adm,
            nomecompleto: adm.nomecompletoadm,
            regra: 'adm'
        };

        req.session.save((err) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar sessão" });
            
            // Retorno padronizado para o React
            return res.json({
                success: true,
                message: "Login realizado com sucesso",
                id: adm.id_adm,
                nomecompleto: adm.nomecompletoadm,
                tipo: 'adm'
            });
        });
    });
};

// Validação de Estado da Sessão (Raiz)
export const verificarSessaoRaiz = (req, res) => {
    if (req.session && req.session.usuario) {
        return res.json({
            valid: true,
            id: req.session.usuario.id,
            nomecompleto: req.session.usuario.nomecompleto,
            tipo: req.session.usuario.regra === 'adm' ? 'adm' : 'usuario'
        });
    }
    return res.json({ valid: false });
};

// Encerrar Sessão (Logout)
export const logout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) return res.status(500).json({ error: "Erro ao encerrar sessão" });
            res.clearCookie("connect.sid"); // Limpa o cookie de sessão do navegador
            return res.json({ success: true, message: "Sessão encerrada com sucesso" });
        });
    } else {
        return res.json({ success: true, message: "Nenhuma sessão ativa" });
    }
};