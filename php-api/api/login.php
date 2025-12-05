<?php
// php-api/api/login.php
// Endpoint untuk user login

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
if (!isset($data['email']) || !isset($data['password'])) {
    sendResponse(false, 'Email dan password harus diisi', null, 400);
}

$email = sanitizeInput($data['email']);
$password = sanitizeInput($data['password']);

// Validasi format email
if (!isValidEmail($email)) {
    sendResponse(false, 'Format email tidak valid', null, 400);
}

// Get user dari database
$user = getUserByEmail($email);

if (!$user) {
    sendResponse(false, 'Email tidak terdaftar', null, 401);
}

// Verify password
if (!verifyPassword($password, $user['password'])) {
    sendResponse(false, 'Password salah', null, 401);
}

// Generate token
$token = generateToken($user['id'], $user['email']);

// Log activity
logActivity($user['id'], 'LOGIN', 'User melakukan login');

// Return response dengan token
sendResponse(true, 'Login berhasil', [
    'userId' => (int)$user['id'],
    'email' => $user['email'],
    'fullName' => $user['full_name'],
    'token' => $token
], 200);

?>
