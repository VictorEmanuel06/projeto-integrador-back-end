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
  const { id_cliente } = req.params;

  db.beginTransaction(async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensagem: 'Erro ao iniciar transação' });
    }

    try {
      await new Promise((resolve, reject) => {
        db.query(
          'DELETE FROM agendamento WHERE id_cliente = ?',
          [id_cliente],
          (err, result) => (err ? reject(err) : resolve(result))
        );
      });

      const resultadoCliente = await new Promise((resolve, reject) => {
        db.query(
          'DELETE FROM cadastro_cliente WHERE id_cliente = ?',
          [id_cliente],
          (err, result) => (err ? reject(err) : resolve(result))
        );
      });

      if (resultadoCliente.affectedRows === 0) {
        return db.rollback(() => {
          res.status(404).json({ mensagem: 'Cliente não encontrado' });
        });
      }

      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ mensagem: 'Erro ao confirmar exclusão' });
          });
        }
        res.status(200).json({ mensagem: 'Cliente e seus agendamentos foram excluídos com sucesso' });
      });
    } catch (error) {
      db.rollback(() => {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno ao excluir cliente' });
      });
    }
  });
};