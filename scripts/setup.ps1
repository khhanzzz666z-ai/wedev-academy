# ============================================
# WebDev Academy - Backend Setup (Fixed)
# ============================================

Write-Host ""
Write-Host "===== WebDev Academy - Backend Setup =====" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Checking Chocolatey..." -ForegroundColor Yellow
$choco = Get-Command choco -ErrorAction SilentlyContinue
if ($choco) {
    Write-Host "OK - Chocolatey installed" -ForegroundColor Green
} else {
    Write-Host "ERROR - Install Chocolatey first" -ForegroundColor Red
    Write-Host "Visit: https://chocolatey.org/install" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "[2/3] Checking PHP..." -ForegroundColor Yellow
$php = Get-Command php -ErrorAction SilentlyContinue
if ($php) {
    Write-Host "OK - PHP installed" -ForegroundColor Green
    & php -v | Select-Object -First 1
} else {
    Write-Host "Installing PHP..." -ForegroundColor Yellow
    $currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object System.Security.Principal.WindowsPrincipal($currentUser)
    $isAdmin = $principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
    
    if (-not $isAdmin) {
        Write-Host "ERROR - Need Administrator privilege" -ForegroundColor Red
        exit 1
    }
    
    & choco install php -y
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    $php = Get-Command php -ErrorAction SilentlyContinue
    if ($php) {
        Write-Host "OK - PHP installed" -ForegroundColor Green
    } else {
        Write-Host "ERROR - PHP install failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "[3/3] MySQL Setup" -ForegroundColor Yellow
Write-Host "Run this to setup database:" -ForegroundColor Gray
Write-Host "  mysql -u root -p < .\php-api\setup.sql" -ForegroundColor White

Write-Host ""
Write-Host "===== Setup Complete =====" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. powershell -ExecutionPolicy Bypass -File run_php_server.ps1" -ForegroundColor White
Write-Host "2. powershell -ExecutionPolicy Bypass -File test_login_api.ps1" -ForegroundColor White
Write-Host ""
