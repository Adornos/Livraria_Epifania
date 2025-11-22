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
    $pdo = new PDO($dsn, $user, $pass, $options);

    $sql = " SELECT * FROM tipo_livro ";

    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();

    $tipos = [];

    foreach($rows as $row) {

        // Montar as categorias
        $tipos[] = [
            'id_tipo' => $row['id_tipo'],
            'tipo' => $row['tipo'],
        ];
    }

    echo json_encode($tipos, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

