# ============================================
# WebDev Academy - Run PHP Built-in Server
# ============================================
# Fungsi: Menjalankan PHP server pada port 8000
# Penggunaan: powershell -ExecutionPolicy Bypass -File run_php_server.ps1
# ============================================

Write-Host "
╔════════════════════════════════════════════════════════════════╗
║         WebDev Academy - PHP Server Startup                   ║
╚════════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

# Periksa PHP tersedia
$phpCheck = Get-Command php -ErrorAction SilentlyContinue
if (-not $phpCheck) {
    Write-Host "❌ PHP tidak ditemukan dalam PATH" -ForegroundColor Red
    Write-Host "`nJalankan setup_backend.ps1 terlebih dahulu untuk install PHP" -ForegroundColor Yellow
    exit 1
}

# Periksa folder php-api ada
$phpApiPath = ".\php-api"
if (-not (Test-Path $phpApiPath)) {
    Write-Host "❌ Folder ./php-api tidak ditemukan" -ForegroundColor Red
    Write-Host "   Pastikan Anda menjalankan script dari folder webdev academy root" -ForegroundColor Gray
    exit 1
}

# Periksa database.php config
$dbConfigPath = "$phpApiPath\config\database.php"
if (-not (Test-Path $dbConfigPath)) {
    Write-Host "⚠️  File config database.php tidak ditemukan" -ForegroundColor Yellow
    Write-Host "   Pastikan struktur folder sudah lengkap" -ForegroundColor Gray
}

# Info sebelum jalankan
Write-Host "`n📝 Informasi Server:" -ForegroundColor Yellow
Write-Host "   URL: http://localhost:8000" -ForegroundColor White
Write-Host "   Root: $phpApiPath" -ForegroundColor Gray
Write-Host "   Port: 8000" -ForegroundColor Gray

Write-Host "`n🔧 Periksa database:" -ForegroundColor Yellow
Write-Host "   Host: localhost" -ForegroundColor Gray
Write-Host "   Database: webdev_academy" -ForegroundColor Gray
Write-Host "   User: root" -ForegroundColor Gray

Write-Host "`n💡 Testing endpoints:" -ForegroundColor Yellow
Write-Host "   Login: POST http://localhost:8000/api/login.php" -ForegroundColor White
Write-Host "   Register: POST http://localhost:8000/api/register.php" -ForegroundColor White
Write-Host "   Verify Token: GET http://localhost:8000/api/verify-token.php" -ForegroundColor White

Write-Host "`n🚀 Menjalankan server..." -ForegroundColor Cyan
Write-Host "   Tekan Ctrl+C untuk menghentikan server" -ForegroundColor Gray
Write-Host "`n" -ForegroundColor Gray

# Jalankan PHP server
try {
    cd $phpApiPath
    & php -S localhost:8000
} catch {
    Write-Host "❌ Error menjalankan server: $_" -ForegroundColor Red
    exit 1
} finally {
    Write-Host "`n🛑 Server dihentikan" -ForegroundColor Yellow
}
