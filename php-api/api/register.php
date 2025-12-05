<?php
// php-api/api/register.php
// Endpoint untuk user registration

require_once '../config/database.php';
require_once '../config/helpers.php';

setJsonHeader();

// Hanya accept POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}

// Get JSON data dari request
$data = json_decode(file_get_contents('php://input'), true);

// Validasi input
if (!isset($data['email']) || !isset($data['password']) || !isset($data['fullName'])) {
    sendResponse(false, 'Email, password, dan fullName tidak boleh kosong', null, 400);
}

$email = sanitizeInput($data['email']);
$password = sanitizeInput($data['password']);
$fullName = sanitizeInput($data['fullName']);

// Validasi format email
if (!isValidEmail($email)) {
    sendResponse(false, 'Format email tidak valid', null, 400);
}

// Validasi password
if (!isValidPassword($password)) {
    sendResponse(false, 'Password minimal 6 karakter', null, 400);
}

// Validasi nama
if (strlen($fullName) < 3) {
    sendResponse(false, 'Nama minimal 3 karakter', null, 400);
}

// Check apakah email sudah terdaftar
if (emailExists($email)) {
    sendResponse(false, 'Email sudah terdaftar', null, 400);
}

// Create user
$userId = createUser($email, $password, $fullName);

if ($userId) {
    // Generate token
    $token = generateToken($userId, $email);
    
    // Log activity
    logActivity($userId, 'REGISTER', 'User berhasil melakukan registrasi');
    
    // Return response dengan token
    sendResponse(true, 'Registrasi berhasil', [
        'userId' => $userId,
        'email' => $email,
        'fullName' => $fullName,
        'token' => $token
    ], 201);
} else {
    sendResponse(false, 'Gagal membuat akun: ' . $conn->error, null, 500);
}

?>
