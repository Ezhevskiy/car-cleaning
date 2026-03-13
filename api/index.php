<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

require_once 'db.php'; 

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents("php://input"), true);

// Очистка буфера, чтобы в JSON не попали лишние пробелы или ошибки
ob_start();

try {
    // 1. Получение всех услуг
    if ($action === 'get_services') {
        $stmt = $pdo->query("SELECT * FROM services");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // 2. Детализация услуги
    else if ($action === 'get_service') {
        $id = $_GET['id'] ?? '';
        $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC) ?: ["error" => "Not found"]);
    }

    // 3. Регистрация
    else if ($action === 'register') {
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password, phone) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['full_name'], $data['email'], $password, $data['phone']]);
        echo json_encode(["status" => "success"]);
    }

    // 4. Логин
    else if ($action === 'login') {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data['password'], $user['password'])) {
            unset($user['password']);
            echo json_encode(["status" => "success", "user" => $user]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Неверный логин или пароль"]);
        }
    }

    // 5. Создание записи
    else if ($action === 'create_booking') {
        $stmt = $pdo->prepare("INSERT INTO bookings (user_id, service_id, car_model, booking_date, booking_time, status) VALUES (?, ?, ?, ?, ?, 'pending')");
        $stmt->execute([
            $data['user_id'], 
            $data['service_id'], 
            $data['car_model'], 
            $data['booking_date'], 
            $data['booking_time']
        ]);
        echo json_encode(["status" => "success"]);
    }

    // 6. Получение записей пользователя
    else if ($action === 'get_user_bookings') {
        if (ob_get_length()) ob_clean(); 
        
        $u_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

        $sql = "SELECT 
                    b.id, 
                    b.car_model, 
                    b.booking_date, 
                    b.booking_time, 
                    b.status,
                    s.title as service_name 
                FROM bookings b 
                LEFT JOIN services s ON b.service_id = s.id 
                WHERE b.user_id = :uid 
                ORDER BY b.id DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(['uid' => $u_id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($result);
    }

} catch (PDOException $e) {
    if (ob_get_length()) ob_clean();
    http_response_code(500);
    echo json_encode([
        "error" => "SQL Error", 
        "details" => $e->getMessage()
    ]);
}

ob_end_flush();
exit;