import db from "../../db.js";

// Criar novo compromisso
export const criarAgendamento = (req, res) => {

    const {
        data_consulta,
        horario_consulta,
        tipo
    } = req.body;

    let id_cliente = null;
    let id_adm = null;

    if (req.session.usuario.regra === "user") {
        id_cliente = req.session.usuario.id;
    }

    if (req.session.usuario.regra === "adm") {
        id_adm = req.session.usuario.id;
    }

    if (!data_consulta || !horario_consulta) {
        return res.status(400).json({
            error: "Data e horário são obrigatórios."
        });
    }

    const status =
        tipo === "bloqueio"
            ? "BLOQUEADO"
            : "AGENDADO";

    const sql = `
        INSERT INTO agendamento
        (
            id_cliente,
            id_adm,
            data_consulta,
            horario_consulta,
            status_agendamento
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            id_cliente,
            id_adm,
            data_consulta,
            horario_consulta,
            status
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(201).json({
                message: "Agendamento salvo com sucesso."
            });

        }
    );

};







// Listar horários ocupados por data
export const listarAgendamentosPorData = (req, res) => {
    const { data } = req.params;

    const sql = `
        SELECT horario_consulta
        FROM agendamento
        WHERE data_consulta = ?
        AND status_agendamento IN ('AGENDADO', 'BLOQUEADO')
    `;

    db.query(sql, [data], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};
