
-- TABELA AGENDAMENTO
CREATE TABLE agendamento (
    id_agendamento INT NOT NULL AUTO_INCREMENT,

    id_cliente INT NULL,
    id_adm INT NULL,

    data_consulta DATE NOT NULL,
    horario_consulta VARCHAR(10) NOT NULL,

    status_agendamento ENUM(
        'AGENDADO',
        'CONFIRMADO',
        'CANCELADO',
        'BLOQUEADO',
        'REALIZADO'
    ) NOT NULL DEFAULT 'AGENDADO',

    data_cadastroagendamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_alteracaoagendamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id_agendamento),

    CONSTRAINT fk_agendamento_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES cadastro_cliente(id_cliente)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_agendamento_adm
        FOREIGN KEY (id_adm)
        REFERENCES cadastro_adm(id_adm)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

--  SE A TABELA JÁ EXISTE
ALTER TABLE agendamento
MODIFY id_cliente INT NULL;

ALTER TABLE agendamento
MODIFY id_adm INT NULL;


--  CONFIMAR CHAVES ESTRANGEIRAS 

ALTER TABLE agendamento
ADD CONSTRAINT fk_agendamento_cliente
FOREIGN KEY (id_cliente)
REFERENCES cadastro_cliente(id_cliente)
ON DELETE SET NULL
ON UPDATE CASCADE;

ALTER TABLE agendamento
ADD CONSTRAINT fk_agendamento_adm
FOREIGN KEY (id_adm)
REFERENCES cadastro_adm(id_adm)
ON DELETE SET NULL
ON UPDATE CASCADE;