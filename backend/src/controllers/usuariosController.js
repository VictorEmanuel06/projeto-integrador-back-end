import db from "../../db.js";


export const usuarios = async (req, res) => {
    
        const sql = 
        `SELECT id_cliente, nomecompleto, email
        FROM cadastro_cliente `;

        db.query(sql, (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.json(result);
        });
};

export const excluirUsuario = async (req, res) => {

    const { id } = req.params;

    const sql = `DELETE FROM cadastro_cliente WHERE id_cliente = ?`;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        return res.json({ mensagem: "Usuário excluído com sucesso" });
    });
};
