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

    const usuarioLogado = req.session.usuario;
    const params = [];

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
    `;

    let sqlFinal = sql;

    // Se for cliente comum, só vê os próprios agendamentos.
    // Admin continua vendo todos.

    if (usuarioLogado.regra === "user") {
        sqlFinal += ` WHERE a.id_cliente = ? `;
        params.push(usuarioLogado.id);
    }

    sqlFinal += ` ORDER BY a.data_consulta, a.horario_consulta `;

    db.query(sqlFinal, params, (err, result) => {

        if (err) {
            console.log("Erro ao listar agendamentos:", err);

            return res.status(500).json({
                erro: "Erro ao buscar agendamentos."
            });
        }

        return res.status(200).json(result);
    });
};


export const alterarStatusAgendamento = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const sql = `
        UPDATE agendamento
        SET status_agendamento = ?
        WHERE id_agendamento = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        return res.status(200).json({
            message: "Status atualizado com sucesso."
        });

    });

};


export const buscarAgendamentoPorId = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            id_agendamento,
            data_consulta,
            horario_consulta,
            status_agendamento
        FROM agendamento
        WHERE id_agendamento = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Agendamento não encontrado."
            });
        }

        return res.json(result[0]);

    });

};


export const atualizarAgendamento = (req, res) => {

    const { id } = req.params;
    const { data_consulta, horario_consulta } = req.body;

    const sql = `
        UPDATE agendamento
        SET
            data_consulta = ?,
            horario_consulta = ?,
            status_agendamento = 'AGENDADO'
        WHERE id_agendamento = ?
    `;

    db.query(
        sql,
        [data_consulta, horario_consulta, id],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(200).json({
                message: "Agendamento atualizado com sucesso."
            });

        }
    );

};