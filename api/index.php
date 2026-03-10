<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Проверяем наличие файла перед подключением
if (file_exists('db.php')) {
    include 'db.php';
} else {
    echo json_encode(["error" => "Файл db.php не найден"]);
    exit;
}

// Теперь переменная $pdo точно будет определена, если db.php подключился
if (isset($pdo)) {
    $stmt = $pdo->query("SELECT * FROM services");
    $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($services);
} else {
    echo json_encode(["error" => "Переменная pdo не инициализирована"]);
}