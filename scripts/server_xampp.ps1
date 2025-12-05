# ============================================
# WebDev Academy - Run PHP Server with XAMPP
# ============================================

Write-Host ""
Write-Host "===== PHP Server (XAMPP) =====" -ForegroundColor Cyan
Write-Host ""

$phpPath = "C:\xampp\php\php.exe"
$phpApiFolder = ".\php-api"

if (-not (Test-Path $phpPath)) {
    Write-Host "ERROR - PHP not found at $phpPath" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $phpApiFolder)) {
    Write-Host "ERROR - ./php-api folder not found" -ForegroundColor Red
    exit 1
}

Write-Host "Server URL: http://localhost:8000" -ForegroundColor White
Write-Host "Root folder: ./php-api" -ForegroundColor Gray
Write-Host ""
Write-Host "API Endpoints:" -ForegroundColor Yellow
Write-Host "  POST   http://localhost:8000/api/login.php" -ForegroundColor White
Write-Host "  POST   http://localhost:8000/api/register.php" -ForegroundColor White
Write-Host "  GET    http://localhost:8000/api/verify-token.php" -ForegroundColor White

Write-Host ""
Write-Host "Starting server..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host ""

try {
    & $phpPath -S localhost:8000 -t $phpApiFolder
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
} finally {
    Write-Host ""
    Write-Host "Server stopped" -ForegroundColor Yellow
}
