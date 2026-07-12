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

// Listar todos os agendamentos
export const listarAgendamentos = (req, res) => {

    const sql = `
        SELECT
            a.id_agendamento AS id,
            COALESCE(c.nomecompleto, 'Horário Bloqueado') AS nomeCliente,
            DATE_FORMAT(a.data_consulta, '%d/%m/%Y') AS dataConsulta,
            TIME_FORMAT(a.horario_consulta, '%H:%i') AS horarioConsulta,
            a.status_agendamento AS status
        FROM agendamento a
        LEFT JOIN cadastro_cliente c
            ON a.id_cliente = c.id_cliente
        ORDER BY a.data_consulta, a.horario_consulta
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        return res.status(200).json(result);

    });

};