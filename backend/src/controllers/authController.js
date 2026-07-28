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
            return res.json({ message: "Administrador cadastrado com sucesso" });
        });
    } catch (err) {
        return res.status(500).json({ error: "Erro interno" });
    }
};

// Login de Usuário Comum
export const loginUsuario = (req, res) => {
    const sql = "SELECT * FROM cadastro_cliente WHERE email = ?";
    const { email, password } = req.body;

    db.query(sql, [email], async (err, data) => {
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
            return res.json({
                message: "Login realizado com sucesso",
                id: usuario.id_cliente,
                nomecompleto: usuario.nomecompleto
            });
        });
    });
};


// Login de Administrador
export const loginAdm = (req, res) => {
    const sql = "SELECT * FROM cadastro_adm WHERE emailadm = ?";
    const { email, password } = req.body;
 
    db.query(sql, [email], async (err, data) => {
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
            return res.json({
                success: true,
                message: "Login realizado com sucesso",
                name: adm.nomecompletoadm
            });
        });
    });
};

// Validação de Estado da Sessão (Raiz)
export const verificarSessaoRaiz = (req, res) => {
    if (req.session && req.session.usuario) {
        return res.json({
            valid: true,
            name: req.session.usuario.nomecompleto
        });
    }
    return res.json({ valid: false });
};
