# ============================================
# WebDev Academy - Backend Setup Script
# ============================================
# Fungsi: Menginstall PHP via Chocolatey dan setup database
# Penggunaan: powershell -ExecutionPolicy Bypass -File setup_backend.ps1
# ============================================

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "         WebDev Academy - Backend Setup Automation          " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Periksa apakah Chocolatey terinstall
Write-Host "[STEP 1] Checking Chocolatey installation..." -ForegroundColor Yellow
$chocoCheck = Get-Command choco -ErrorAction SilentlyContinue
if ($chocoCheck) {
    Write-Host "✅ Chocolatey sudah terinstall" -ForegroundColor Green
    $chocoVersion = & choco --version
    Write-Host "   Version: $chocoVersion" -ForegroundColor Gray
} else {
    Write-Host "❌ Chocolatey belum terinstall" -ForegroundColor Red
    Write-Host "`nInstall Chocolatey terlebih dahulu:" -ForegroundColor Yellow
    Write-Host "   1. Buka PowerShell sebagai Administrator" -ForegroundColor Gray
    Write-Host "   2. Jalankan:" -ForegroundColor Gray
    Write-Host '      Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force' -ForegroundColor White
    Write-Host '      iwr https://community.chocolatey.org/install.ps1 -UseBasicParsing | iex' -ForegroundColor White
    Write-Host "   3. Jalankan script ini ulang setelah Chocolatey terinstall" -ForegroundColor Gray
    exit 1
}

# Step 2: Periksa apakah PHP sudah terinstall
Write-Host "`n[STEP 2] Checking PHP installation..." -ForegroundColor Yellow
$phpCheck = Get-Command php -ErrorAction SilentlyContinue
if ($phpCheck) {
    Write-Host "✅ PHP sudah terinstall" -ForegroundColor Green
    $phpVersion = & php -v | Select-Object -First 1
    Write-Host "   $phpVersion" -ForegroundColor Gray
} else {
    Write-Host "⏳ Menginstall PHP via Chocolatey..." -ForegroundColor Yellow
    Write-Host "   (Ini akan memakan waktu 2-5 menit)" -ForegroundColor Gray
    
    # Jalankan sebagai Administrator jika diperlukan
    $currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object System.Security.Principal.WindowsPrincipal($currentUser)
    $isAdmin = $principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
    
    if (-not $isAdmin) {
        Write-Host "⚠️  Script memerlukan Administrator privilege untuk install PHP" -ForegroundColor Red
        Write-Host "   Jalankan PowerShell sebagai Administrator dan coba ulang" -ForegroundColor Yellow
        exit 1
    }
    
    & choco install php -y
    
    # Refresh PATH agar php command tersedia
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    $phpCheck = Get-Command php -ErrorAction SilentlyContinue
    if ($phpCheck) {
        Write-Host "✅ PHP berhasil diinstall" -ForegroundColor Green
        $phpVersion = & php -v | Select-Object -First 1
        Write-Host "   $phpVersion" -ForegroundColor Gray
    } else {
        Write-Host "❌ Instalasi PHP gagal" -ForegroundColor Red
        Write-Host "   Coba install manual dari: https://windows.php.net" -ForegroundColor Gray
        exit 1
    }
}

# Step 3: Periksa MySQL Client
Write-Host "`n[STEP 3] Checking MySQL client..." -ForegroundColor Yellow
$mysqlCheck = Get-Command mysql -ErrorAction SilentlyContinue
if ($mysqlCheck) {
    Write-Host "✅ MySQL client sudah terinstall" -ForegroundColor Green
} else {
    Write-Host "⚠️  MySQL client tidak ditemukan" -ForegroundColor Yellow
    Write-Host "   Jika sudah punya MySQL Server, tambahkan path ke bin folder ke PATH" -ForegroundColor Gray
    Write-Host "   Lokasi umum:" -ForegroundColor Gray
    Write-Host "     - XAMPP: C:\xampp\mysql\bin" -ForegroundColor Gray
    Write-Host "     - MySQL Server: C:\Program Files\MySQL\MySQL Server 8.0\bin" -ForegroundColor Gray
}

# Step 4: Jalankan migrasi database (opsional - user akan diingatkan)
Write-Host "`n[STEP 4] Database Setup" -ForegroundColor Yellow
Write-Host "   Untuk membuat database dan tables, jalankan:" -ForegroundColor Gray
Write-Host "   mysql -u root -p < .\php-api\setup.sql" -ForegroundColor White
Write-Host "`n   Atau untuk migrasi schema users:" -ForegroundColor Gray
Write-Host "   mysql -u root -p webdev_academy < .\php-api\migrations\0001_update_users.sql" -ForegroundColor White

# Step 5: Setup complete
Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              ✅ Backend Setup Selesai!                        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`n📋 Langkah Selanjutnya:" -ForegroundColor Cyan
Write-Host "   1. Setup Database (jika belum):" -ForegroundColor Gray
Write-Host "      mysql -u root -p < .\php-api\setup.sql" -ForegroundColor White
Write-Host ""
Write-Host "   2. Jalankan PHP Server:" -ForegroundColor Gray
Write-Host "      powershell -ExecutionPolicy Bypass -File run_php_server.ps1" -ForegroundColor White
Write-Host ""
Write-Host "   3. Test Login API (dari terminal baru):" -ForegroundColor Gray
Write-Host "      powershell -ExecutionPolicy Bypass -File test_login_api.ps1" -ForegroundColor White
Write-Host ""
Write-Host "   4. Buka browser: http://localhost:5173/auth" -ForegroundColor White

Write-Host "`n" -ForegroundColor Gray
