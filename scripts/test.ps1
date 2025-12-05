# ============================================
# WebDev Academy - Test Login API (Fixed)
# ============================================

Write-Host ""
Write-Host "===== Testing Backend API =====" -ForegroundColor Cyan
Write-Host ""

$SERVER_URL = "http://localhost:8000"
$LOGIN_ENDPOINT = "$SERVER_URL/api/login.php"
$REGISTER_ENDPOINT = "$SERVER_URL/api/register.php"

Write-Host "Server: $SERVER_URL" -ForegroundColor White
Write-Host ""

# Test 1: Server Connection
Write-Host "[TEST 1] Server Connection..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$SERVER_URL/api/login.php" -Method Options -ErrorAction SilentlyContinue -TimeoutSec 3
    Write-Host "OK - Server is running" -ForegroundColor Green
} catch {
    Write-Host "ERROR - Server not accessible" -ForegroundColor Red
    Write-Host "Make sure PHP server is running:" -ForegroundColor Yellow
    Write-Host "  powershell -ExecutionPolicy Bypass -File server.ps1" -ForegroundColor White
    exit 1
}

Write-Host ""

# Test 2: Register
Write-Host "[TEST 2] Register New User..." -ForegroundColor Cyan
$randomId = Get-Random
$registerPayload = @{
    email = "test_$randomId@example.com"
    password = "Test123!"
    fullName = "Test User $randomId"
} | ConvertTo-Json

Write-Host "Email: test_$randomId@example.com" -ForegroundColor Gray

try {
    $registerResponse = Invoke-RestMethod -Uri $REGISTER_ENDPOINT -Method Post -Body $registerPayload -ContentType 'application/json' -ErrorAction Stop
    if ($registerResponse.success) {
        Write-Host "OK - Registration successful" -ForegroundColor Green
        Write-Host "  User ID: $($registerResponse.data.userId)" -ForegroundColor Gray
        Write-Host "  Token: $($registerResponse.data.token.Substring(0, 20))..." -ForegroundColor Gray
    } else {
        Write-Host "ERROR - $($registerResponse.message)" -ForegroundColor Red
    }
} catch {
    Write-Host "ERROR - Request failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: Login
Write-Host "[TEST 3] Login..." -ForegroundColor Cyan
$loginPayload = @{
    email = "john@example.com"
    password = "yourpassword"
} | ConvertTo-Json

Write-Host "Email: john@example.com" -ForegroundColor Gray

try {
    $loginResponse = Invoke-RestMethod -Uri $LOGIN_ENDPOINT -Method Post -Body $loginPayload -ContentType 'application/json' -ErrorAction Stop
    if ($loginResponse.success) {
        Write-Host "OK - Login successful" -ForegroundColor Green
        Write-Host "  User ID: $($loginResponse.data.userId)" -ForegroundColor Gray
        Write-Host "  Email: $($loginResponse.data.email)" -ForegroundColor Gray
        Write-Host "  Token: $($loginResponse.data.token.Substring(0, 20))..." -ForegroundColor Gray
    } else {
        Write-Host "ERROR - $($loginResponse.message)" -ForegroundColor Red
    }
} catch {
    Write-Host "ERROR - Request failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "===== Tests Complete =====" -ForegroundColor Green
Write-Host ""
