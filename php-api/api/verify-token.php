<?php
// php-api/api/verify-token.php
// Endpoint untuk verify JWT token

require_once '../config/database.php';
require_once '../config/helpers.php';

setJsonHeader();

// Get token dari Authorization header
$token = getAuthToken();

if (!$token) {
    sendResponse(false, 'Token tidak ditemukan', null, 401);
}

// Verify token
$payload = verifyToken($token);

if (!$payload) {
    sendResponse(false, 'Token tidak valid atau sudah kadaluarsa', null, 401);
}

// Get user data
$user = getUserById($payload['userId']);

if (!$user) {
    sendResponse(false, 'User tidak ditemukan', null, 404);
}

// Return response dengan user data
sendResponse(true, 'Token valid', [
    'userId' => (int)$user['id'],
    'email' => $user['email'],
    'fullName' => $user['full_name']
], 200);

?>
