import db from "../../db.js";

// LISTAR TODOS OS USUARIOS
export const usuarios = async (req, res) => {
    const sql = `SELECT id_cliente, nomecompleto, email FROM cadastro_cliente`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        return res.json(result);
    });
};


// BUSCAR USUARIO POR ID
export const buscarPorId = async (req, res) => {
  const { id } = req.params;
  const usuarioLogado = req.session.usuario;

  // Cliente comum só pode ver o próprio cadastro. Admin pode ver qualquer um.
  if (usuarioLogado.regra !== 'adm' && String(usuarioLogado.id) !== String(id)) {
    return res.status(403).json({ erro: "Você não tem permissão para acessar este cadastro." });
  }

  const sql = `SELECT id_cliente, nomecompleto, email FROM cadastro_cliente WHERE id_cliente = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar usuário por ID:", err);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }

    if (result.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.status(200).json(result[0]);
  });
};


// ATUALIZAR USUARIO
export const atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  const usuarioLogado = req.session.usuario;

  // Cliente comum só pode editar o próprio cadastro. Admin pode editar qualquer um.
  if (usuarioLogado.regra !== 'adm' && String(usuarioLogado.id) !== String(id)) {
    return res.status(403).json({ erro: "Você não tem permissão para editar este cadastro." });
  }

  const sql = `UPDATE cadastro_cliente SET nomecompleto = ?, email = ? WHERE id_cliente = ?`;

  db.query(sql, [nome, email, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado para atualização." });
    }

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
  });
};


// EXCLUIR USUARIO
export const excluirUsuario = async (req, res) => {
  const { id_cliente } = req.params;

  db.beginTransaction(async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensagem: "Erro ao iniciar transação" });
    }

    try {
      await new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM agendamento WHERE id_cliente = ?",
          [id_cliente],
          (err, result) => (err ? reject(err) : resolve(result))
        );
      });

      const resultadoCliente = await new Promise((resolve, reject) => {
        db.query(
          "DELETE FROM cadastro_cliente WHERE id_cliente = ?",
          [id_cliente],
          (err, result) => (err ? reject(err) : resolve(result))
        );
      });

      if (resultadoCliente.affectedRows === 0) {
        return db.rollback(() => {
          res.status(404).json({ mensagem: "Cliente não encontrado" });
        });
      }

      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ mensagem: "Erro ao confirmar exclusão" });
          });
        }
        res.status(200).json({
          mensagem: "Cliente e seus agendamentos foram excluídos com sucesso",
        });
      });
    } catch (error) {
      db.rollback(() => {
        console.error(error);
        res.status(500).json({ mensagem: "Erro interno ao excluir cliente" });
      });
    }
  });
};