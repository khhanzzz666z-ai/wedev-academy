# WebDev Academy - Automated Backend Setup Guide

## Quick Setup - 3 Langkah

### Step 1: Check Setup

Jalankan script untuk periksa PHP, Chocolatey, MySQL:

```powershell
powershell -ExecutionPolicy Bypass -File setup.ps1
```

Jika error "Need Administrator privilege":

- Buka PowerShell **as Administrator**
- Jalankan lagi: `powershell -ExecutionPolicy Bypass -File setup.ps1`

**Output yang diharapkan:**

```
OK - Chocolatey installed
OK - PHP installed
```

### Step 2: Setup Database

Jalankan di PowerShell (regular user):

```powershell
mysql -u root -p < .\php-api\setup.sql
```

Masukkan password MySQL root saat diminta.

**Jika mysql command tidak ditemukan:**

- Pastikan MySQL terinstall (MySQL Server, XAMPP, atau WampServer)
- Tambahkan path MySQL bin ke PATH Windows, atau gunakan path lengkap
- Contoh XAMPP: `C:\xampp\mysql\bin\mysql.exe -u root -p < .\php-api\setup.sql`

### Step 3: Run & Test

**Terminal 1 - Start PHP Server:**

```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```

**Terminal 2 (baru) - Test API:**

```powershell
powershell -ExecutionPolicy Bypass -File test.ps1
```

**Expected output:**

```
[TEST 1] Server Connection...
OK - Server is running

[TEST 2] Register New User...
OK - Registration successful

[TEST 3] Login...
OK - Login successful
```

---

## Manual Setup (jika script tidak bekerja)

### 1. Install PHP

- **Option A - Chocolatey:** Buka PowerShell as Admin, jalankan: `choco install php -y`
- **Option B - XAMPP:** Download dari https://www.apachefriends.org
- **Option C - Manual:** Download dari https://windows.php.net, extract, tambah ke PATH

Verify: `php -v` harus menampilkan versi PHP

### 2. Setup Database

```powershell
# Buat database dan tables
mysql -u root -p < .\php-api\setup.sql

# Atau jalankan di MySQL Workbench:
# - File > Run SQL Script > pilih setup.sql
# - Click Go
```

### 3. Run PHP Server

```powershell
cd .\php-api
php -S localhost:8000
```

### 4. Test API

```powershell
# Dari terminal baru
$payload = @{ email='john@example.com'; password='yourpassword' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:8000/api/login.php' -Method Post -Body $payload -ContentType 'application/json'
```

**Hasil yang diharapkan:**

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "userId": 1,
    "email": "john@example.com",
    "fullName": "John Doe",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

---

## Troubleshooting

### "php: The term 'php' is not recognized"

**Solution:**

1. Install PHP (see Step 1 above)
2. Run `php -v` to verify
3. Restart PowerShell if just installed

### "mysql: The term 'mysql' is not recognized"

**Solution:**

1. Check MySQL is installed
2. Add MySQL bin folder to PATH:
   - Windows Key > Environment Variables > PATH
   - Add: `C:\xampp\mysql\bin` (XAMPP) or `C:\Program Files\MySQL\MySQL Server 8.0\bin`
3. Restart PowerShell

### "Connection refused" atau "ERROR 1045 Access denied"

**Solution:**

1. Check MySQL server is running
2. Verify credentials: user=root, password=your_mysql_password
3. Try connecting: `mysql -u root -p -h localhost`

### "ERROR 2003: Can't connect to MySQL server"

**Solution:**

1. Start MySQL server:
   - XAMPP: Open Control Panel, click "Start" next to MySQL
   - Windows Service: `net start MySQL80` (Windows PowerShell as Admin)
2. Wait 5 seconds, try again

### Registration fails with "Email already exists"

**Solution:**

1. Register dengan email baru: `test_$(Get-Random)@example.com`
2. Atau delete database dan re-import: `mysql -u root -p < .\php-api\setup.sql`

---

## File Locations

```
webdev academy/
├── setup.ps1              # Check setup (PHP, Chocolatey, MySQL)
├── server.ps1             # Start PHP server
├── test.ps1               # Test API endpoints
├── php-api/
│   ├── config/
│   │   ├── database.php   # MySQL config
│   │   └── helpers.php    # Security functions
│   ├── api/
│   │   ├── login.php      # POST /api/login.php
│   │   ├── register.php   # POST /api/register.php
│   │   └── verify-token.php # GET /api/verify-token.php
│   ├── setup.sql          # Database schema
│   └── migrations/
│       └── 0001_update_users.sql
└── src/                   # React frontend
```

---

## Next Steps

1. **Frontend Test:**

   - Keep PHP server running (server.ps1)
   - Open http://localhost:5173 (React dev server)
   - Click Login / Register button
   - Test form submission

2. **Development:**

   - Edit PHP files in `php-api/api/`
   - Edit React files in `src/`
   - Refresh browser to see changes

3. **Production:**
   - Deploy PHP to web server (Apache, Nginx, etc)
   - Deploy React build to static host
   - Update database.php with production credentials
