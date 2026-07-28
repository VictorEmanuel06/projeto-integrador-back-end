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