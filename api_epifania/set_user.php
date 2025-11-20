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
    file_put_contents('teste_json.txt', $json);
    $usuario = json_decode($json, true);

    if (!is_array($usuario)) {
        throw new Exception("JSON inválido ou não enviado.");
    }

    $pdo = new PDO($dsn, $user, $pass, $options);

    $sql = "INSERT INTO leitor 
            (nome, email, senha, data, telefone, cpf, estado, cidade, bairro, rua, numero_casa, complemeto)
            VALUES 
            (:nome, :email, :senha, :data, :telefone, :cpf, :estado, :cidade, :bairro, :rua, :numero_casa, :complemeto)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nome' => $usuario['nome'],
        ':email' => $usuario['email'],
        ':senha' => $usuario['senha'],
        ':data' => $usuario['data'] ?? null,
        ':telefone' => $usuario['telefone'] ?? null,
        ':cpf' => $usuario['cpf'] ?? null,
        ':estado' => $usuario['estado'] ?? null,
        ':cidade' => $usuario['cidade'] ?? null,
        ':bairro' => $usuario['bairro'] ?? null,
        ':rua' => $usuario['rua'] ?? null,
        ':numero_casa' => $usuario['numero_casa'] ?? null,
        ':complemeto' => $usuario['complemeto'] ?? null
    ]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    echo json_encode(['error' => "Erro no banco de dados: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

