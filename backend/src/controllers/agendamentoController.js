import db from "../../db.js";

// Criar novo compromisso
export const criarAgendamento = (req, res) => {
    // 1. Pega os dados enviados pelo formulário React
    const { data_consulta, horario_consulta } = req.body;
    
    // 2. Pega o ID do cliente logado direto da sessão do middleware
    const id_cliente = req.session.usuario.id; 

    // Validação simples antes de ir para o banco
    if (!data_consulta || !horario_consulta) {
        return res.status(400).json({ error: "Data e horário são obrigatórios." });
    }

    // 3. Nova query SQL SEM a coluna id_adm
    const sql = `
        INSERT INTO agendamento (id_cliente, data_consulta, horario_consulta)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [id_cliente, data_consulta, horario_consulta], (err, result) => {
        if (err) {
            console.error("Erro MySQL ao agendar:", err);
            return res.status(500).json({ error: "Erro interno do servidor ao salvar agendamento." });
        }
        
        return res.status(201).json({ message: "Agendamento realizado com sucesso!" });
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
