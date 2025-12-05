<?php
// php-api/test_connection.php
// Skrip sederhana untuk menguji koneksi ke database menggunakan konfigurasi

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/config/database.php';

$result = [
    'success' => false,
    'message' => '',
    'details' => []
];

try {
    if (!isset($conn) || !$conn) {
        throw new Exception('Connection variable $conn is not set.');
    }

    if ($conn->connect_error) {
        throw new Exception('Connect error: ' . $conn->connect_error);
    }

    // Ambil versi server dan user yang terhubung
    $serverInfo = $conn->server_info;
    $res = $conn->query("SELECT USER() as user");
    $userRow = $res && $res->num_rows ? $res->fetch_assoc() : null;

    $result['success'] = true;
    $result['message'] = 'Connection successful';
    $result['details'] = [
        'db_host' => DB_HOST,
        'db_name' => DB_NAME,
        'db_user' => DB_USER,
        'server_version' => $serverInfo,
        'connected_as' => $userRow ? $userRow['user'] : null
    ];

    // Close connection
    closeConnection();

} catch (Exception $e) {
    $result['success'] = false;
    $result['message'] = $e->getMessage();
}

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

?>
