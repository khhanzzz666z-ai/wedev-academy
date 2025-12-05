<?php
// php-api/config/database.php
// Konfigurasi koneksi ke MySQL

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'webdev_academy');
define('DB_PORT', 3306);

// Membuat koneksi ke database
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);
    
    // Check koneksi
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset ke UTF-8
    $conn->set_charset("utf8");
    
    // Success
    // echo "Connected to MySQL successfully";
    
} catch (Exception $e) {
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]));
}

// Close connection function
function closeConnection() {
    global $conn;
    if ($conn) {
        $conn->close();
    }
}
?>
