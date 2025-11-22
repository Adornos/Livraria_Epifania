/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `bd_livraria_epifania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bd_livraria_epifania`;

CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `categoria` (`id`, `categoria`) VALUES
	(1, 'Recomendados'),
	(2, 'Ficção Científica'),
	(3, 'Fantasia'),
	(4, 'Romance Clássico');

CREATE TABLE IF NOT EXISTS `compras` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `cpf_leitor` varchar(15) NOT NULL DEFAULT '',
  `data` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Id`),
  KEY `idx_usuario_cpf` (`id_usuario`,`cpf_leitor`),
  KEY `fk_compras_leitor_cpf` (`cpf_leitor`),
  CONSTRAINT `fk_compras_leitor_id` FOREIGN KEY (`id_usuario`) REFERENCES `leitor` (`id_leitor`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `editora` (
  `id_editora` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_editora`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `editora` (`id_editora`, `nome`, `email`, `telefone`) VALUES
	(0, 'Desconhecida', NULL, NULL),
	(1, 'Editora Aurora', 'contato@aurora.com', '(11) 2345-6789'),
	(2, 'Editora Solaris', 'contato@solaris.com.br', '(21) 99876-5432'),
	(3, 'Editora Horizonte', 'horizonte@editora.com', '(31) 3333-4444');

CREATE TABLE IF NOT EXISTS `estado` (
  `id_estado` tinyint(32) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `sigla` char(2) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `estado` (`id_estado`, `nome`, `sigla`) VALUES
	(1, 'Acre', 'AC'),
	(2, 'Alagoas', 'AL'),
	(3, 'Amapá', 'AP'),
	(4, 'Amazonas', 'AM'),
	(5, 'Bahia', 'BA'),
	(6, 'Ceará', 'CE'),
	(7, 'Distrito Federal', 'DF'),
	(8, 'Espírito Santo', 'ES'),
	(9, 'Goiás', 'GO'),
	(10, 'Maranhão', 'MA'),
	(11, 'Mato Grosso', 'MT'),
	(12, 'Mato Grosso do Sul', 'MS'),
	(13, 'Minas Gerais', 'MG'),
	(14, 'Pará', 'PA'),
	(15, 'Paraíba', 'PB'),
	(16, 'Paraná', 'PR'),
	(17, 'Pernambuco', 'PE'),
	(18, 'Piauí', 'PI'),
	(19, 'Rio de Janeiro', 'RJ'),
	(20, 'Rio Grande do Norte', 'RN'),
	(21, 'Rio Grande do Sul', 'RS'),
	(22, 'Rondônia', 'RO'),
	(23, 'Roraima', 'RR'),
	(24, 'Santa Catarina', 'SC'),
	(25, 'São Paulo', 'SP'),
	(26, 'Sergipe', 'SE'),
	(27, 'Tocantins', 'TO');

CREATE TABLE IF NOT EXISTS `estoque_livro` (
  `id_livro` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `estoque` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_livro`,`id_tipo`),
  KEY `fk_estoque_tipo` (`id_tipo`),
  CONSTRAINT `fk_estoque_livro` FOREIGN KEY (`id_livro`) REFERENCES `livro` (`id_livro`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_estoque_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_livro` (`id_tipo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `estoque_livro` (`id_livro`, `id_tipo`, `estoque`) VALUES
	(10, 1, 69),
	(10, 2, 96),
	(11, 1, 49),
	(11, 2, 90),
	(12, 1, 49),
	(12, 2, 58),
	(13, 1, 50),
	(13, 2, 80),
	(14, 1, 60),
	(14, 2, 100),
	(15, 1, 70),
	(15, 2, 120),
	(16, 1, 50),
	(16, 2, 90),
	(17, 1, 100),
	(17, 2, 150),
	(18, 1, 80),
	(18, 2, 120),
	(19, 1, 90),
	(19, 2, 140),
	(20, 1, 70),
	(20, 2, 100);

CREATE TABLE IF NOT EXISTS `itens_compra` (
  `id_compra` int(11) DEFAULT NULL,
  `id_livro` int(11) DEFAULT NULL,
  `id_tipo` int(11) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `valor_unitario` int(11) DEFAULT NULL,
  KEY `id_tipo` (`id_tipo`),
  KEY `itens_compra_ibfk_1` (`id_compra`),
  KEY `itens_compra_ibfk_2` (`id_livro`),
  CONSTRAINT `itens_compra_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compras` (`Id`),
  CONSTRAINT `itens_compra_ibfk_2` FOREIGN KEY (`id_livro`) REFERENCES `livro` (`id_livro`),
  CONSTRAINT `itens_compra_ibfk_3` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_livro` (`id_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE IF NOT EXISTS `leitor` (
  `id_leitor` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(20) NOT NULL,
  `data` varchar(50) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cpf` varchar(15) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `bairro` varchar(60) DEFAULT NULL,
  `rua` varchar(60) DEFAULT NULL,
  `numero_casa` varchar(10) DEFAULT NULL,
  `complemento` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id_leitor`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `estado` (`estado`),
  CONSTRAINT `fk_estado` FOREIGN KEY (`estado`) REFERENCES `estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `leitor` (`id_leitor`, `nome`, `email`, `senha`, `data`, `telefone`, `cpf`, `estado`, `cidade`, `bairro`, `rua`, `numero_casa`, `complemento`) VALUES
	(1, 'Carlos Eduardo', 'carlos.e@exemplo.com', '123', '1995-05-12', '(11) 98765-4321', '46645512245', 1, NULL, NULL, NULL, NULL, NULL),
	(2, 'Ana Beatriz', 'ana.b@exemplo.com', '123', '2000-09-25', '(21) 91234-5678', NULL, 2, NULL, NULL, NULL, NULL, NULL),
	(3, 'João Pedro', 'joao.p@exemplo.com', '123', '1988-02-18', '(31) 99888-7766', NULL, 3, NULL, NULL, NULL, NULL, NULL),
	(4, 'Guilhermw', 'asd@hmial.com', '123', NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
	(5, 'Marcia', 'no@o.com', '1234', NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL),
	(6, '1', '1', '1', NULL, NULL, NULL, 25, 'Gui', 'Bairro legal', 'Legal23', '12', '123'),
	(7, '2', '2', '2', NULL, NULL, '98765432130', 19, NULL, NULL, NULL, NULL, NULL);

CREATE TABLE IF NOT EXISTS `livro` (
  `id_livro` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(20) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `data` varchar(50) DEFAULT NULL,
  `autor` varchar(100) DEFAULT NULL,
  `sinopse` text DEFAULT NULL,
  `image` varchar(255) DEFAULT '0',
  `editora` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_livro`),
  UNIQUE KEY `isbn` (`isbn`),
  KEY `editora` (`editora`),
  CONSTRAINT `livro_ibfk_1` FOREIGN KEY (`editora`) REFERENCES `editora` (`id_editora`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `livro` (`id_livro`, `isbn`, `titulo`, `data`, `autor`, `sinopse`, `image`, `editora`) VALUES
	(10, '9788576573135', 'Duna', '1965-08-01', 'Frank Herbert', 'Em um futuro distante, a disputa pelo controle do planeta desértico Arrakis, única fonte da especiaria melange, coloca famílias nobres em guerra. A jornada de Paul Atreides é uma das mais épicas da ficção científica.', 'https://m.media-amazon.com/images/I/81zN7udGRUL._SL1500_.jpg', 1),
	(11, '9788576572008', 'Neuromancer', '1984-07-01', 'William Gibson', 'O hacker Case é contratado para a missão mais perigosa de sua vida em um mundo dominado por megacorporações e inteligências artificiais. Romance que inaugurou o movimento cyberpunk.', 'https://covers.openlibrary.org/b/id/10521267-L.jpg', 1),
	(12, '9788576571902', 'Fundação', '1951-06-01', 'Isaac Asimov', 'Hari Seldon desenvolve a psico-história, ciência que prevê o futuro de impérios galácticos. Ao perceber a queda iminente do Império, ele cria a Fundação para preservar o conhecimento humano.', 'https://covers.openlibrary.org/b/id/12659839-L.jpg', 1),
	(13, '9788533613379', 'O Senhor dos Anéis: A Sociedade do Anel', '1954-07-29', 'J.R.R. Tolkien', 'Frodo Bolseiro recebe a tarefa de destruir o Um Anel e parte em uma jornada épica pela Terra-média acompanhado por seus amigos e aliados.', 'https://covers.openlibrary.org/b/id/8231856-L.jpg', 3),
	(14, '9788532530783', 'Harry Potter e a Pedra Filosofal', '1997-06-26', 'J.K. Rowling', 'Harry Potter descobre ser um bruxo e entra em Hogwarts, onde começa sua aventura contra as forças das trevas lideradas por Voldemort.', 'https://covers.openlibrary.org/b/id/7884861-L.jpg', 3),
	(15, '9788578270698', 'As Crônicas de Nárnia', '1950-10-16', 'C.S. Lewis', 'Quatro irmãos descobrem um guarda-roupa mágico que os leva a Nárnia, um mundo encantado governado pelo leão Aslam.', 'https://covers.openlibrary.org/b/id/8226191-L.jpg', 3),
	(16, '9788599296882', 'O Nome do Vento', '2007-03-27', 'Patrick Rothfuss', 'A história de Kvothe, um mago lendário que conta sua vida a um cronista — desde sua infância trágica até se tornar um herói e assassino de reis.', 'https://covers.openlibrary.org/b/id/8312055-L.jpg', 3),
	(17, '9788520932070', 'Orgulho e Preconceito', '1813-01-28', 'Jane Austen', 'Elizabeth Bennet enfrenta os desafios da sociedade inglesa do século XIX e o orgulhoso Mr. Darcy, em um romance sobre amor e classe social.', 'https://covers.openlibrary.org/b/id/8225631-L.jpg', 2),
	(18, '9788577992942', 'Jane Eyre', '1847-10-16', 'Charlotte Brontë', 'Uma jovem órfã supera dificuldades e luta por sua independência e dignidade, enquanto vive um romance com o misterioso Sr. Rochester.', 'https://covers.openlibrary.org/b/id/10521458-L.jpg', 2),
	(19, '9788572326544', 'O Morro dos Ventos Uivantes', '1847-12-01', 'Emily Brontë', 'A trágica e intensa história de amor entre Heathcliff e Catherine, ambientada nos ventos frios das charnecas inglesas.', 'https://covers.openlibrary.org/b/id/8235040-L.jpg', 2),
	(20, '9788520932414', 'Anna Kariênina', '1878-01-01', 'Liev Tolstói', 'Um dos maiores romances da literatura russa, narra a paixão proibida de Anna e Vronski, explorando temas de moral, sociedade e felicidade.', 'https://covers.openlibrary.org/b/id/12659623-L.jpg', 2);

CREATE TABLE IF NOT EXISTS `livro_categoria` (
  `id_livro` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  PRIMARY KEY (`id_livro`,`id_categoria`),
  KEY `fk_categoria` (`id_categoria`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_livro` FOREIGN KEY (`id_livro`) REFERENCES `livro` (`id_livro`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `livro_categoria` (`id_livro`, `id_categoria`) VALUES
	(10, 2),
	(11, 2),
	(12, 2),
	(13, 3),
	(14, 3),
	(15, 3),
	(16, 3),
	(17, 4),
	(18, 4),
	(19, 4),
	(20, 4);

CREATE TABLE IF NOT EXISTS `preco_livro` (
  `id_livro` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_livro`,`id_tipo`),
  KEY `fk_preco_tipo` (`id_tipo`),
  CONSTRAINT `fk_preco_livro` FOREIGN KEY (`id_livro`) REFERENCES `livro` (`id_livro`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_preco_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_livro` (`id_tipo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `preco_livro` (`id_livro`, `id_tipo`, `preco`) VALUES
	(10, 1, 150.00),
	(10, 2, 100.00),
	(11, 1, 140.00),
	(11, 2, 95.00),
	(12, 1, 130.00),
	(12, 2, 85.00),
	(13, 1, 160.00),
	(13, 2, 110.00),
	(14, 1, 140.00),
	(14, 2, 95.00),
	(15, 1, 120.00),
	(15, 2, 80.00),
	(16, 1, 145.00),
	(16, 2, 100.00),
	(17, 1, 90.00),
	(17, 2, 60.00),
	(18, 1, 95.00),
	(18, 2, 65.00),
	(19, 1, 100.00),
	(19, 2, 70.00),
	(20, 1, 105.00),
	(20, 2, 72.00);

CREATE TABLE IF NOT EXISTS `tipo_livro` (
  `id_tipo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tipo_livro` (`id_tipo`, `tipo`) VALUES
	(1, 'Capa dura'),
	(2, 'Brochura');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
