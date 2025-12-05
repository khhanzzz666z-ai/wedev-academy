# WebDev Academy - Quick Setup Guide

## 🚀 Setup Backend Otomatis (3 Langkah)

### Langkah 1: Install PHP (jika belum ada)

```powershell
# Buka PowerShell sebagai Administrator, jalankan:
powershell -ExecutionPolicy Bypass -File setup_backend.ps1
```

Script ini akan:

- ✅ Periksa Chocolatey (install jika belum ada)
- ✅ Install PHP via Chocolatey
- ✅ Verifikasi versi PHP
- ℹ️ Berikan instruksi setup database

**Catatan:** Jika Anda sudah punya XAMPP atau WampServer, lewati langkah ini.

---

### Langkah 2: Setup Database

**Opsi A - Jika punya mysql client di PATH:**

```powershell
# Buat database dan tables dari setup.sql
mysql -u root -p < .\php-api\setup.sql

# Atau jika ada migrasi schema:
mysql -u root -p webdev_academy < .\php-api\migrations\0001_update_users.sql
```

**Opsi B - Jika tidak punya mysql CLI:**

- Buka MySQL Workbench atau phpMyAdmin
- Import file `php-api/setup.sql`
- Atau buat database `webdev_academy` secara manual

**Opsi C - Gunakan XAMPP:**

- Letakkan folder di `C:\xampp\htdocs\php-api`
- Import `setup.sql` via phpMyAdmin (http://localhost/phpmyadmin)

---

### Langkah 3: Jalankan PHP Server & Test

**Terminal 1 - Jalankan PHP Server:**

```powershell
powershell -ExecutionPolicy Bypass -File run_php_server.ps1
```

Anda akan melihat output:

```
╔════════════════════════════════════════════════════════════════╗
║         WebDev Academy - PHP Server Startup                   ║
╚════════════════════════════════════════════════════════════════╝

📝 Informasi Server:
   URL: http://localhost:8000
   Root: .\php-api
   Port: 8000
```

Server sekarang mendengarkan di `http://localhost:8000`

**Terminal 2 (baru) - Test Login API:**

```powershell
powershell -ExecutionPolicy Bypass -File test_login_api.ps1
```

Script akan test:

1. ✅ Koneksi server
2. ✅ Register endpoint
3. ✅ Login endpoint
4. ✅ Token verification

---

## 📋 API Endpoints

Setelah server berjalan, test endpoint ini:

### Register

```bash
POST http://localhost:8000/api/register.php
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### Login

```bash
POST http://localhost:8000/api/login.php
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "yourpassword"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": 1,
    "email": "john@example.com",
    "fullName": "John Doe",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### Verify Token

```bash
GET http://localhost:8000/api/verify-token.php
Authorization: Bearer <TOKEN>

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john@example.com",
    "full_name": "John Doe"
  }
}
```

---

## 🌐 Frontend Integration

Setelah backend berjalan, test frontend:

1. **Buka browser:** http://localhost:5173
2. **Klik tombol "Login"** atau **"Daftar"**
3. **Isi form** dengan email dan password
4. **Klik tombol Login/Daftar**

Jika semuanya OK:

- ✅ Form akan validate
- ✅ Request dikirim ke `http://localhost:8000/api/login.php`
- ✅ Token disimpan di localStorage
- ✅ Redirect ke dashboard

---

## 🔧 Troubleshooting

### Error: "php: The term 'php' is not recognized"

**Solusi:**

1. Jalankan `setup_backend.ps1` untuk install PHP
2. Atau gunakan path lengkap ke PHP executable
3. Atau gunakan XAMPP/WampServer

### Error: "Connection failed: Connection refused"

**Solusi:**

1. Pastikan MySQL server berjalan
2. Periksa konfigurasi di `php-api/config/database.php`
3. Cek kredensial DB (user, password, hostname)
4. Jalankan `mysql -u root -p` untuk test koneksi

### Error: "Email tidak terdaftar" di login

**Solusi:**

1. Database belum punya user
2. Jalankan script `test_login_api.ps1` untuk register user baru
3. Atau import `setup.sql` yang sudah ada sample data

### Error: CORS atau network error

**Solusi:**

1. Pastikan PHP server berjalan di port 8000
2. Periksa firewall Windows tidak memblokir port 8000
3. Jalankan `test_login_api.ps1` untuk diagnostik lebih detail

---

## 📁 File Structure

```
webdev academy/
├── php-api/                          # Backend PHP
│   ├── config/
│   │   ├── database.php             # Konfigurasi MySQL
│   │   └── helpers.php              # JWT, bcrypt, helpers
│   ├── api/
│   │   ├── login.php                # POST /api/login.php
│   │   ├── register.php             # POST /api/register.php
│   │   └── verify-token.php         # GET /api/verify-token.php
│   ├── migrations/
│   │   └── 0001_update_users.sql    # Schema migration
│   ├── setup.sql                    # Initial database schema
│   └── test_connection.php          # Test DB connection
├── src/                             # Frontend React
│   ├── api.js                       # API client
│   ├── AuthComponent_PHP.jsx        # Login/Register UI
│   └── App.jsx                      # Main app
├── setup_backend.ps1                # Setup script (install PHP)
├── run_php_server.ps1               # Run PHP server
├── test_login_api.ps1               # Test API endpoints
└── SETUP_QUICK.md                   # This file
```

---

## ✅ Verification Checklist

- [ ] PHP CLI tersedia (`php -v` returns version)
- [ ] MySQL server berjalan
- [ ] Database `webdev_academy` dibuat
- [ ] PHP server running on `http://localhost:8000`
- [ ] `test_login_api.ps1` semua test berhasil
- [ ] Frontend accessible di `http://localhost:5173`
- [ ] Tombol Login/Register berfungsi
- [ ] Form validation bekerja
- [ ] Token tersimpan di localStorage
- [ ] Dashboard accessible setelah login

---

## 🎯 Next Steps

Setelah semua test berhasil:

1. **Integrasi React-PHP:**

   - Frontend (`src/AuthComponent_PHP.jsx`) siap
   - Backend API endpoints siap
   - Session management via localStorage + JWT

2. **Development:**

   - Jalankan `npm run dev` untuk React dev server
   - Jalankan `php -S localhost:8000` dari `php-api` folder
   - Edit kode, browser auto-refresh

3. **Production:**
   - Deploy PHP ke web server (Apache, Nginx, etc)
   - Deploy React build ke static host atau same server
   - Update `php-api/config/database.php` dengan prod credentials
   - Jalankan migrasi di production database

---

**Butuh bantuan?** Lihat file dokumentasi lainnya:

- `README_MAIN.md` - Dokumentasi lengkap
- `PHP_REACT_INTEGRATION.md` - Integration guide
- `QUICK_START.md` - 5-minute reference
