-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28/07/2026 às 16:51
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rnr_psicologo`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamento`
--

CREATE TABLE `agendamento` (
  `id_agendamento` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_adm` int(11) DEFAULT NULL,
  `data_consulta` date NOT NULL,
  `horario_consulta` time NOT NULL,
  `status_agendamento` enum('AGENDADO','CONFIRMADO','CANCELADO') DEFAULT 'AGENDADO',
  `data_cadastroagendamento` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_alteracaoagendamento` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `agendamento`
--

INSERT INTO `agendamento` (`id_agendamento`, `id_cliente`, `id_adm`, `data_consulta`, `horario_consulta`, `status_agendamento`, `data_cadastroagendamento`, `data_alteracaoagendamento`) VALUES
(7, 6, NULL, '2026-07-07', '13:00:00', 'CANCELADO', '2026-07-07 12:12:43', '2026-07-28 14:39:14'),
(8, NULL, 5, '2026-07-07', '14:00:00', 'CONFIRMADO', '2026-07-07 12:13:18', '2026-07-28 14:38:29'),
(9, 6, NULL, '2026-07-27', '19:30:00', 'CANCELADO', '2026-07-27 13:48:29', '2026-07-27 13:49:35'),
(10, 6, NULL, '2026-07-27', '20:00:00', 'CONFIRMADO', '2026-07-27 14:20:18', '2026-07-28 14:38:49'),
(11, 6, NULL, '2026-07-28', '09:30:00', 'AGENDADO', '2026-07-28 13:49:52', '2026-07-28 13:49:52');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastro_adm`
--

CREATE TABLE `cadastro_adm` (
  `id_adm` int(11) NOT NULL,
  `nomecompletoadm` varchar(255) NOT NULL,
  `emailadm` varchar(255) NOT NULL,
  `senhaadm` varchar(100) NOT NULL,
  `data_cadastroadm` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_alteracaoadm` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `cadastro_adm`
--

INSERT INTO `cadastro_adm` (`id_adm`, `nomecompletoadm`, `emailadm`, `senhaadm`, `data_cadastroadm`, `data_alteracaoadm`) VALUES
(5, 'Victor', 'victoradm@gmail.com', '$2b$10$O3P/WWrmZ5jdM5NXnFS9h.H7TEydYwUYrOCy.i5kS2dPaAwILDSHu', '2026-07-07 11:55:30', '2026-07-07 11:55:30');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastro_cliente`
--

CREATE TABLE `cadastro_cliente` (
  `id_cliente` int(11) NOT NULL,
  `nomecompleto` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_alteracao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `cadastro_cliente`
--

INSERT INTO `cadastro_cliente` (`id_cliente`, `nomecompleto`, `email`, `senha`, `data_cadastro`, `data_alteracao`) VALUES
(6, 'Chaga Machado', 'chaguinha@gmail.com', '$2b$10$Ezt6NOS56oyUWIyOok32LeIAKqU21FqO2su3JI5IsazgdtsM0se/m', '2026-07-02 12:50:53', '2026-07-02 12:50:53'),
(7, 'Grazi', 'grazi@gmail.com', '$2b$10$7CI7Rwk8.NRo67YzTeQrWeA8fgtZzcsqhS6TT3j5Yqq.sBHkbPDsq', '2026-07-06 11:37:28', '2026-07-06 11:37:28');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`id_agendamento`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_adm` (`id_adm`);

--
-- Índices de tabela `cadastro_adm`
--
ALTER TABLE `cadastro_adm`
  ADD PRIMARY KEY (`id_adm`),
  ADD UNIQUE KEY `emailadm` (`emailadm`);

--
-- Índices de tabela `cadastro_cliente`
--
ALTER TABLE `cadastro_cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamento`
--
ALTER TABLE `agendamento`
  MODIFY `id_agendamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `cadastro_adm`
--
ALTER TABLE `cadastro_adm`
  MODIFY `id_adm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `cadastro_cliente`
--
ALTER TABLE `cadastro_cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cadastro_cliente` (`id_cliente`),
  ADD CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`id_adm`) REFERENCES `cadastro_adm` (`id_adm`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
