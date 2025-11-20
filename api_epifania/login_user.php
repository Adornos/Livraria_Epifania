<?php
header('Content-Type: application/json');

$host = "localhost";
$db   = "bd_livraria_epifania";
$user = "root";
$pass = "";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

try {
    $json = file_get_contents('php://input');
    file_put_contents('log_requisicoes.txt', date('Y-m-d H:i:s') . " - Recebido: " . $json . PHP_EOL, FILE_APPEND);
    $dados = json_decode($json, true);

    if (!is_array($dados) || !isset($dados['email']) || !isset($dados['senha'])) {
        echo json_encode(['success' => false, 'error' => 'JSON inválido ou campos faltando.']);
        exit;
    }

    $pdo = new PDO($dsn, $user, $pass, $options);

    // Busca o usuário pelo email
    $sql = "SELECT * FROM leitor WHERE email = :email LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':email' => $dados['email']]);
    $usuario = $stmt->fetch();

    if (!$usuario) {
        echo json_encode(['success' => false, 'message' => 'Usuário não encontrado.']);
        exit;
    }

    // Verifica a senha
    if ($dados['senha'] === $usuario['senha']) { //passwordverify não funviona por q? não sei
        // Senha correta
        // unset($usuario['senha']); // remove a senha do retorno
        echo json_encode(['success' => true, 'usuario' => $usuario, 'id_leitor' => $usuario['id_leitor']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Senha incorreta.']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erro no banco de dados: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
