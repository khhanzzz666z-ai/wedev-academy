# ============================================
# WebDev Academy - Setup with XAMPP
# ============================================

Write-Host ""
Write-Host "===== WebDev Academy - XAMPP Setup =====" -ForegroundColor Cyan
Write-Host ""

$xamppPath = "C:\xampp"

# Check XAMPP
Write-Host "[1/3] Checking XAMPP..." -ForegroundColor Yellow
if (Test-Path "$xamppPath\php") {
    Write-Host "OK - XAMPP found" -ForegroundColor Green
} else {
    Write-Host "ERROR - XAMPP not found at $xamppPath" -ForegroundColor Red
    Write-Host "Download from: https://www.apachefriends.org" -ForegroundColor Yellow
    exit 1
}

# Check MySQL
Write-Host ""
Write-Host "[2/3] Checking MySQL..." -ForegroundColor Yellow
$mysqlPath = "$xamppPath\mysql\bin\mysql.exe"
if (Test-Path $mysqlPath) {
    Write-Host "OK - MySQL found" -ForegroundColor Green
    & $mysqlPath -u root -e "SELECT VERSION();" 2>&1 | Select-Object -First 1
} else {
    Write-Host "ERROR - MySQL not found" -ForegroundColor Red
    exit 1
}

# Setup Database
Write-Host ""
Write-Host "[3/3] Setting up database..." -ForegroundColor Yellow

$setupSqlPath = ".\php-api\setup.sql"
if (-not (Test-Path $setupSqlPath)) {
    Write-Host "ERROR - $setupSqlPath not found" -ForegroundColor Red
    exit 1
}

Write-Host "Importing database schema..." -ForegroundColor Gray

# Drop existing database first (optional, but safer)
Write-Host "Dropping existing database (if any)..." -ForegroundColor Gray
$dropDb = "DROP DATABASE IF EXISTS webdev_academy;"
$dropDb | & $mysqlPath -u root 2>&1 | Out-Null

# Import fresh database
Write-Host "Creating fresh database..." -ForegroundColor Gray
$sqlContent = Get-Content $setupSqlPath -Raw
$sqlContent | & $mysqlPath -u root 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "OK - Database setup complete" -ForegroundColor Green
    Write-Host "Database: webdev_academy" -ForegroundColor Gray
    Write-Host "Sample users: john@example.com, jane@example.com" -ForegroundColor Gray
} else {
    Write-Host "ERROR - Database setup failed (exit code: $LASTEXITCODE)" -ForegroundColor Red
    Write-Host "Check MySQL is running in XAMPP Control Panel" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Open XAMPP Control Panel" -ForegroundColor Gray
    Write-Host "2. Click 'Start' next to MySQL" -ForegroundColor Gray
    Write-Host "3. Run script again" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "===== Setup Complete =====" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run PHP server:" -ForegroundColor Gray
Write-Host "   powershell -ExecutionPolicy Bypass -File server_xampp.ps1" -ForegroundColor White
Write-Host ""
Write-Host "2. Test API (from new terminal):" -ForegroundColor Gray
Write-Host "   powershell -ExecutionPolicy Bypass -File test.ps1" -ForegroundColor White
Write-Host ""
