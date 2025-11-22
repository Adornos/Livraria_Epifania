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
    file_put_contents('log_compras_json.txt', $json);
    $dados = json_decode($json, true);
    $dados_usuario = $dados['usuario'];
    $dados_compra = $dados['compra'];

    if (!is_array($dados_usuario) || !is_array($dados_compra)) {
        throw new Exception("JSON inválido ou não enviado.");
    }

    $pdo = new PDO($dsn, $user, $pass, $options);
    $pdo->beginTransaction();

    $sql_compra = "INSERT INTO compras 
            (id_usuario, cpf_leitor)
            VALUES 
            (:id_usuario, :cpf_leitor)";

    $stmt = $pdo->prepare($sql_compra);
    $stmt->execute([
        ':id_usuario' => $dados_usuario['id_usuario'],
        ':cpf_leitor' => $dados_usuario['cpf_leitor'],
    ]);

    $id_compra = $pdo->lastInsertId();

    $sql_itens = "INSERT INTO itens_compra 
        (id_compra, id_livro, id_tipo, quantidade, valor_unitario)
        VALUES 
        (:id_compra, :id_livro, :id_tipo, :quantidade, :valor_unitario)";

    $sql_update_estoque = "UPDATE estoque_livro
        SET estoque = estoque - :quantidade 
        WHERE id_livro = :id_livro AND id_tipo = :id_tipo";

    $stmtItens = $pdo->prepare($sql_itens);
    $stmtEstoque = $pdo->prepare($sql_update_estoque);


    foreach ($dados_compra as $livro) {

        $stmtItens->execute([
            ':id_compra' => $id_compra,
            ':id_livro' => $livro['id_livro'],
            ':id_tipo' => $livro['id_tipo'],
            ':quantidade' => $livro['quantidade'],
            ':valor_unitario' => $livro['price'],
        ]);
        
        $stmtEstoque->execute([
            ':id_livro' => $livro['id_livro'],
            ':id_tipo' => $livro['id_tipo'],
            ':quantidade' => $livro['quantidade'],
        ]);
        
    }

    $pdo->commit();

    echo json_encode(['success' => true]);

} catch (PDOException $e) {

    if ($pdo && $pdo->inTransaction()) $pdo->rollBack();

    echo json_encode(['error' => "Erro no banco de dados: " . $e->getMessage()]);
} catch (Exception $e) {

    if ($pdo && $pdo->inTransaction()) $pdo->rollBack();

    echo json_encode(['error' => $e->getMessage()]);
}

