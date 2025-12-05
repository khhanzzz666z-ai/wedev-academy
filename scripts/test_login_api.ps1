# ============================================
# WebDev Academy - Test Login API
# ============================================
# Fungsi: Test endpoint login dengan sample data
# Penggunaan: powershell -ExecutionPolicy Bypass -File test_login_api.ps1
# ============================================

Write-Host "
╔════════════════════════════════════════════════════════════════╗
║         WebDev Academy - Login API Test                       ║
╚════════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

# Konfigurasi
$PHP_SERVER_URL = "http://localhost:8000"
$LOGIN_ENDPOINT = "$PHP_SERVER_URL/api/login.php"
$REGISTER_ENDPOINT = "$PHP_SERVER_URL/api/register.php"

# Test data
$testEmail = "john@example.com"
$testPassword = "yourpassword"
$testFullName = "John Doe"

Write-Host "`n📊 Test Configuration:" -ForegroundColor Yellow
Write-Host "   Server URL: $PHP_SERVER_URL" -ForegroundColor White
Write-Host "   Test Email: $testEmail" -ForegroundColor Gray
Write-Host "   Test Password: $testPassword" -ForegroundColor Gray
Write-Host "`n" -ForegroundColor Gray

# Step 1: Periksa koneksi server
Write-Host "[TEST 1] Checking PHP Server Connection..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$PHP_SERVER_URL/api/login.php" -Method Options -ErrorAction SilentlyContinue -TimeoutSec 3
    Write-Host "✅ Server accessible" -ForegroundColor Green
} catch {
    Write-Host "❌ Server tidak dapat diakses" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n💡 Pastikan:" -ForegroundColor Yellow
    Write-Host "   1. PHP server berjalan: powershell -ExecutionPolicy Bypass -File run_php_server.ps1" -ForegroundColor Gray
    Write-Host "   2. Database terhubung dengan baik" -ForegroundColor Gray
    Write-Host "   3. Port 8000 tidak digunakan oleh aplikasi lain" -ForegroundColor Gray
    exit 1
}

# Step 2: Test Register
Write-Host "`n[TEST 2] Testing Register Endpoint..." -ForegroundColor Cyan
$registerPayload = @{
    email = "testuser_$(Get-Random)@example.com"
    password = "testPassword123"
    fullName = "Test User $(Get-Random)"
} | ConvertTo-Json

Write-Host "   Payload: $registerPayload" -ForegroundColor Gray

try {
    $registerResponse = Invoke-RestMethod -Uri $REGISTER_ENDPOINT -Method Post -Body $registerPayload -ContentType 'application/json' -ErrorAction Stop
    if ($registerResponse.success) {
        Write-Host "✅ Register berhasil" -ForegroundColor Green
        Write-Host "   User ID: $($registerResponse.data.userId)" -ForegroundColor Gray
        Write-Host "   Email: $($registerResponse.data.email)" -ForegroundColor Gray
        Write-Host "   Token: $($registerResponse.data.token.Substring(0, 20))..." -ForegroundColor Gray
        $newEmail = $registerResponse.data.email
        $newToken = $registerResponse.data.token
    } else {
        Write-Host "⚠️  Register gagal: $($registerResponse.message)" -ForegroundColor Yellow
        $newEmail = $testEmail
        $newToken = $null
    }
} catch {
    Write-Host "❌ Register error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Response: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    $newEmail = $testEmail
}

# Step 3: Test Login
Write-Host "`n[TEST 3] Testing Login Endpoint..." -ForegroundColor Cyan
$loginPayload = @{
    email = $testEmail
    password = $testPassword
} | ConvertTo-Json

Write-Host "   Payload: $loginPayload" -ForegroundColor Gray

try {
    $loginResponse = Invoke-RestMethod -Uri $LOGIN_ENDPOINT -Method Post -Body $loginPayload -ContentType 'application/json' -ErrorAction Stop
    
    if ($loginResponse.success) {
        Write-Host "✅ Login berhasil" -ForegroundColor Green
        Write-Host "   User ID: $($loginResponse.data.userId)" -ForegroundColor Gray
        Write-Host "   Email: $($loginResponse.data.email)" -ForegroundColor Gray
        Write-Host "   Full Name: $($loginResponse.data.fullName)" -ForegroundColor Gray
        Write-Host "   Token: $($loginResponse.data.token.Substring(0, 20))..." -ForegroundColor Gray
    } else {
        Write-Host "⚠️  Login gagal: $($loginResponse.message)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Login error: $($_.Exception.Message)" -ForegroundColor Red
    
    # Coba parse error response
    try {
        $errorResponse = $_ | Select-Object -ExpandProperty ErrorDetails.Message | ConvertFrom-Json
        Write-Host "   Server Response: $($errorResponse.message)" -ForegroundColor Yellow
    } catch {
        Write-Host "   Response: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}

# Step 4: Test Verify Token (jika ada token dari login)
if ($newToken) {
    Write-Host "`n[TEST 4] Testing Verify Token Endpoint..." -ForegroundColor Cyan
    
    try {
        $verifyHeaders = @{
            "Authorization" = "Bearer $newToken"
            "Content-Type" = "application/json"
        }
        
        $verifyResponse = Invoke-RestMethod -Uri "$PHP_SERVER_URL/api/verify-token.php" -Method Get -Headers $verifyHeaders -ErrorAction Stop
        
        if ($verifyResponse.success) {
            Write-Host "✅ Token verification berhasil" -ForegroundColor Green
            Write-Host "   User ID: $($verifyResponse.data.id)" -ForegroundColor Gray
            Write-Host "   Email: $($verifyResponse.data.email)" -ForegroundColor Gray
        } else {
            Write-Host "⚠️  Token verification gagal: $($verifyResponse.message)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Verify token error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Summary
Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    Test Summary                               ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n✅ Jika semua test berhasil:" -ForegroundColor Green
Write-Host "   - Backend PHP sudah siap untuk production" -ForegroundColor Gray
Write-Host "   - Database terhubung dengan benar" -ForegroundColor Gray
Write-Host "   - Buka http://localhost:5173/auth untuk test frontend" -ForegroundColor Gray

Write-Host "`n❌ Jika ada yang error:" -ForegroundColor Red
Write-Host "   1. Periksa MySQL connection di ./php-api/config/database.php" -ForegroundColor Gray
Write-Host "   2. Pastikan database webdev_academy sudah dibuat" -ForegroundColor Gray
Write-Host "   3. Jalankan migrasi: mysql -u root -p < ./php-api/setup.sql" -ForegroundColor Gray
Write-Host "   4. Cek log di terminal yang menjalankan PHP server" -ForegroundColor Gray

Write-Host "`n"
