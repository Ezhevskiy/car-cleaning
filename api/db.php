<?php
$host = 'localhost';
$db   = 'car_cleaning'; // ПРОВЕРЬ: создана ли база с таким именем в phpMyAdmin?
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Если всё ок, мы ничего не выводим, чтобы не портить JSON
} catch (PDOException $e) {
    // Если ошибка — выводим её текстом (это поможет отладить)
    die("Ошибка подключения: " . $e->getMessage());
}