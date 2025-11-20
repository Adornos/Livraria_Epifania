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
    file_put_contents('log_updates.txt', date('Y-m-d H:i:s') . " - Updated: " . $json . PHP_EOL, FILE_APPEND);
    $usuario = json_decode($json, true);

    if (!is_array($usuario)) {
        throw new Exception("JSON inválido ou não enviado.");
    }

    $pdo = new PDO($dsn, $user, $pass, $options);

   $sql = "UPDATE leitor SET 
                nome = :nome,
                email = :email,
                senha = :senha,
                data = :data,
                telefone = :telefone,
                cpf = :cpf,
                estado = :estado,
                cidade = :cidade,
                bairro = :bairro,
                rua = :rua,
                numero_casa = :numero_casa,
                complemento = :complemento
            WHERE id_leitor = :id_leitor";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id_leitor' => $usuario['id_leitor'],
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
        ':complemento' => $usuario['complemento'] ?? null
    ]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    echo json_encode(['error' => "Erro no banco de dados: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

