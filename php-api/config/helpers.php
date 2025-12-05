<?php
// php-api/config/helpers.php
// Helper functions untuk API

// Set header JSON dan CORS
function setJsonHeader() {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    // Handle preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

// Response JSON wrapper
function sendResponse($success, $message, $data = null, $statusCode = 200) {
    http_response_code($statusCode);
    
    $response = [
        'success' => $success,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    echo json_encode($response);
    exit;
}

// Validasi email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Validasi password (minimal 6 karakter)
function isValidPassword($password) {
    return strlen($password) >= 6;
}

// Hash password menggunakan bcrypt
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}

// Verify password
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Generate JWT Token (simple version)
function generateToken($userId, $email) {
    $secretKey = 'your-secret-key-change-this-in-production';
    $issuedAt = time();
    $expire = $issuedAt + (7 * 24 * 60 * 60); // Token valid 7 hari
    
    $payload = [
        'iat' => $issuedAt,
        'exp' => $expire,
        'userId' => $userId,
        'email' => $email
    ];
    
    // Simple Base64 encoding (in production, use proper JWT library)
    $header = base64_encode(json_encode(['type' => 'JWT', 'alg' => 'HS256']));
    $payloadEncoded = base64_encode(json_encode($payload));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payloadEncoded", $secretKey, true));
    
    return "$header.$payloadEncoded.$signature";
}

// Verify JWT Token
function verifyToken($token) {
    $secretKey = 'your-secret-key-change-this-in-production';
    
    if (!$token) {
        return null;
    }
    
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }
    
    try {
        $header = json_decode(base64_decode($parts[0]), true);
        $payload = json_decode(base64_decode($parts[1]), true);
        $signature = $parts[2];
        
        // Verify signature
        $expectedSignature = base64_encode(hash_hmac('sha256', "$parts[0].$parts[1]", $secretKey, true));
        if ($signature !== $expectedSignature) {
            return null;
        }
        
        // Check expiration
        if ($payload['exp'] < time()) {
            return null;
        }
        
        return $payload;
    } catch (Exception $e) {
        return null;
    }
}

// Get Authorization header
function getAuthToken() {
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $matches = [];
        if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}

// Sanitize input
function sanitizeInput($input) {
    return trim(htmlspecialchars($input, ENT_QUOTES, 'UTF-8'));
}

// Escape untuk database
function escapeString($string) {
    global $conn;
    return $conn->real_escape_string($string);
}

// Check if email sudah terdaftar
function emailExists($email) {
    global $conn;
    
    $email = escapeString($email);
    $query = "SELECT id FROM users WHERE email = '$email'";
    $result = $conn->query($query);
    
    return $result && $result->num_rows > 0;
}

// Get user by email
function getUserByEmail($email) {
    global $conn;
    
    $email = escapeString($email);
    $query = "SELECT id, email, full_name, password FROM users WHERE email = '$email'";
    $result = $conn->query($query);
    
    if ($result && $result->num_rows > 0) {
        return $result->fetch_assoc();
    }
    
    return null;
}

// Get user by ID
function getUserById($userId) {
    global $conn;
    
    $userId = intval($userId);
    $query = "SELECT id, email, full_name, created_at FROM users WHERE id = $userId";
    $result = $conn->query($query);
    
    if ($result && $result->num_rows > 0) {
        return $result->fetch_assoc();
    }
    
    return null;
}

// Create user
function createUser($email, $password, $fullName) {
    global $conn;
    
    $email = escapeString($email);
    $fullName = escapeString($fullName);
    $passwordHash = hashPassword($password);
    $createdAt = date('Y-m-d H:i:s');
    
    $query = "INSERT INTO users (email, password, full_name, created_at) 
              VALUES ('$email', '$passwordHash', '$fullName', '$createdAt')";
    
    if ($conn->query($query) === TRUE) {
        return $conn->insert_id;
    }
    
    return false;
}

// Log activity (optional)
function logActivity($userId, $action, $details = null) {
    global $conn;
    
    $userId = intval($userId);
    $action = escapeString($action);
    $details = $details ? escapeString($details) : NULL;
    $timestamp = date('Y-m-d H:i:s');
    
    $query = "INSERT INTO activity_logs (user_id, action, details, timestamp) 
              VALUES ($userId, '$action', '$details', '$timestamp')";
    
    $conn->query($query);
}

?>
