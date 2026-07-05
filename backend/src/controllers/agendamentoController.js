import db from "../../db.js";

// Criar novo compromisso
export const criarAgendamento = (req, res) => {
    const { data_consulta, horario_consulta } = req.body;
    const id_cliente = req.session.usuario.id; 
    const id_adm = null; 

    const sql = `
        INSERT INTO agendamento (id_cliente, id_adm, data_consulta, horario_consulta)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [id_cliente, id_adm, data_consulta, horario_consulta], (err) => {
        if (err) {
            console.error("Erro MySQL:", err);
            return res.status(500).json({ error: "Erro ao agendar" });
        }
        return res.status(201).json({ message: "Agendamento criado com sucesso" });
    });
};

// Listar horários ocupados por data
export const listarAgendamentosPorData = (req, res) => {
    const { data } = req.params;

    const sql = `
        SELECT horario_consulta
        FROM agendamento
        WHERE data_consulta = ?
        AND status_agendamento = 'AGENDADO'
    `;

    db.query(sql, [data], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};
