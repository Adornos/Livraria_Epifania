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

    $sql = "
        SELECT
            l.id_livro,
            l.isbn,
            l.titulo,
            l.data,
            l.autor,
            l.sinopse,
            l.image,
            e.nome AS editora,
            GROUP_CONCAT(DISTINCT c.categoria SEPARATOR ', ') AS categorias,
            GROUP_CONCAT(DISTINCT CONCAT(t.tipo, '|', pl.preco, '|', el.estoque) SEPARATOR ';') AS tipos_info
        FROM livro l
        LEFT JOIN editora e ON l.editora = e.id_editora
        LEFT JOIN livro_categoria lc ON l.id_livro = lc.id_livro
        LEFT JOIN categoria c ON lc.id_categoria = c.id
        LEFT JOIN preco_livro pl ON l.id_livro = pl.id_livro
        LEFT JOIN estoque_livro el ON l.id_livro = el.id_livro AND el.id_tipo = pl.id_tipo
        LEFT JOIN tipo_livro t ON pl.id_tipo = t.id_tipo
        GROUP BY l.id_livro, l.isbn, l.titulo, l.data, l.autor, l.sinopse, l.image, e.nome
        ORDER BY l.id_livro;
    "; // DIABO de comando ;-;

    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();

    $livros = [];

    foreach($rows as $row) {
        // Processar tipos
        $tipos = [];
        if ($row['tipos_info']) {
            $tiposArray = explode(';', $row['tipos_info']);
            foreach($tiposArray as $tipoStr){
                list($tipo, $preco, $estoque) = explode('|', $tipoStr);
                $tipos[] = [
                    'tipo' => $tipo,
                    'price' => (float)$preco,
                    'estoque' => (int)$estoque
                ];
            }
        }

        // Montar o livro
        $livros[] = [
            'id_livro' => $row['id_livro'],
            'isbn' => $row['isbn'],
            'titulo' => $row['titulo'],
            'data' => $row['data'],
            'autor' => $row['autor'],
            'sinopse' => $row['sinopse'],
            'image' => $row['image'],
            'editora' => $row['editora'],
            'categorias' => $row['categorias'] ? explode(', ', $row['categorias']) : [],
            'tipos' => $tipos
        ];
    }

    echo json_encode($livros, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

