# ============================================
# WebDev Academy - Run PHP Server (Fixed)
# ============================================

Write-Host ""
Write-Host "===== PHP Server Startup =====" -ForegroundColor Cyan
Write-Host ""

$php = Get-Command php -ErrorAction SilentlyContinue
if (-not $php) {
    Write-Host "ERROR - PHP not found" -ForegroundColor Red
    Write-Host "Run setup.ps1 first" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path ".\php-api")) {
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
    cd .\php-api
    & php -S localhost:8000
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
} finally {
    Write-Host ""
    Write-Host "Server stopped" -ForegroundColor Yellow
}
