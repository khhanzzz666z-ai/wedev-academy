# 🐘 PHP API Backend Setup

## Sistem Login dan Register dengan PHP & MySQL

### 📋 Persyaratan

- PHP 7.4+ (dengan mysqli extension)
- MySQL 5.7+ atau MariaDB
- Web server (Apache dengan mod_rewrite atau PHP built-in server)

---

## 🚀 Setup Cepat

### 1. Setup Database MySQL

```bash
# Buka MySQL client
mysql -u root -p

# Jalankan script setup (pilih salah satu):
mysql -u root -p < php-api/setup.sql
# ATAU copy-paste isi setup.sql ke MySQL client
```

Atau gunakan phpMyAdmin:

1. Buka http://localhost/phpmyadmin
2. Buat database baru: `webdev_academy`
3. Import file `php-api/setup.sql`

### 2. Konfigurasi Database

Edit file `php-api/config/database.php`:

```php
define('DB_HOST', 'localhost');    // Alamat MySQL server
define('DB_USER', 'root');         // Username MySQL
define('DB_PASSWORD', '');         // Password MySQL (kosong untuk default)
define('DB_NAME', 'webdev_academy'); // Nama database
define('DB_PORT', 3306);           // Port MySQL
```

### 3. Run PHP Server

**Opsi A: Menggunakan PHP Built-in Server**

```bash
cd php-api
php -S localhost:8000
```

**Opsi B: Menggunakan Apache**

- Copy folder `php-api` ke folder htdocs
- Akses via http://localhost/php-api

---

## 📚 API Endpoints

### 1. Register User

**Endpoint:** `POST /api/register.php`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

**Error Response (400/500):**

```json
{
  "success": false,
  "message": "Email sudah terdaftar"
}
```

**Validasi:**

- Email: Valid format dan belum terdaftar
- Password: Minimal 6 karakter
- Full Name: Minimal 3 karakter

---

### 2. Login User

**Endpoint:** `POST /api/login.php`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Email tidak terdaftar" // atau "Password salah"
}
```

---

### 3. Verify Token

**Endpoint:** `GET /api/verify-token.php`

**Headers:**

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Token valid",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "message": "Token tidak valid atau sudah kadaluarsa"
}
```

---

## 🔗 Integrasikan dengan React Frontend

### 1. Update API Base URL

Edit file `src/api.js` atau tempat Anda membuat API calls:

```javascript
const API_BASE_URL = "http://localhost:8000"; // PHP API

export async function registerUser(email, password, fullName) {
  const response = await fetch(`${API_BASE_URL}/api/register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, fullName }),
  });
  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function verifyToken(token) {
  const response = await fetch(`${API_BASE_URL}/api/verify-token.php`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
```

### 2. Update React Components

**AuthComponent.jsx:**

```javascript
import { loginUser, registerUser } from "./api";

const handleLogin = async (email, password) => {
  try {
    const result = await loginUser(email, password);
    if (result.success) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data));
      // Redirect ke dashboard
    } else {
      setError(result.message);
    }
  } catch (error) {
    setError("Error: " + error.message);
  }
};

const handleRegister = async (email, password, fullName) => {
  try {
    const result = await registerUser(email, password, fullName);
    if (result.success) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data));
      // Redirect ke dashboard
    } else {
      setError(result.message);
    }
  } catch (error) {
    setError("Error: " + error.message);
  }
};
```

---

## 🗂️ Struktur File

```
php-api/
├── config/
│   ├── database.php      # MySQL connection
│   └── helpers.php       # Helper functions
├── api/
│   ├── register.php      # Register endpoint
│   ├── login.php         # Login endpoint
│   └── verify-token.php  # Token verification
├── setup.sql             # Database schema & sample data
└── README.md             # This file
```

---

## 🔐 Security Best Practices

✅ **Sudah Implemented:**

- Password hashing dengan bcrypt (cost 12)
- Email validation
- CORS headers
- JWT token generation
- Input sanitization dengan htmlspecialchars
- SQL injection prevention dengan real_escape_string

⚠️ **TODO untuk Production:**

- Change secret key di helpers.php
- Implement rate limiting
- Add HTTPS only cookies
- Implement refresh tokens
- Add user account verification
- Implement password reset flow
- Add 2FA/MFA
- Use prepared statements (mysqli_stmt)
- Implement proper logging
- Add request validation middleware

---

## 🧪 Testing API

### Gunakan cURL:

**Register:**

```bash
curl -X POST http://localhost:8000/api/register.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","fullName":"Test User"}'
```

**Login:**

```bash
curl -X POST http://localhost:8000/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Verify Token:**

```bash
curl -X GET http://localhost:8000/api/verify-token.php \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Gunakan Postman:

1. Import collection dari endpoints di atas
2. Buat POST request ke http://localhost:8000/api/register.php
3. Buat POST request ke http://localhost:8000/api/login.php
4. Copy token dari response
5. Buat GET request ke http://localhost:8000/api/verify-token.php dengan token di header

---

## 📝 Database Schema

### Users Table

```
id (Primary Key)
email (Unique)
password (hashed)
full_name
phone (optional)
avatar_url (optional)
bio (optional)
is_active (default: TRUE)
email_verified (default: FALSE)
created_at (timestamp)
updated_at (timestamp)
```

### Courses Table

```
id (Primary Key)
title
description
instructor
category
level (Beginner/Intermediate/Advanced)
duration_hours
price
thumbnail_url
is_published
rating
total_students
created_at
updated_at
```

### Lessons Table

```
id (Primary Key)
course_id (Foreign Key)
title
module
description
content
video_url
duration_minutes
order_number
is_published
created_at
updated_at
```

### Enrollments Table

```
id (Primary Key)
user_id (Foreign Key)
course_id (Foreign Key)
enrolled_at
completed_at
progress_percentage
status (Active/Completed/Inactive)
```

---

## 🐛 Troubleshooting

### "Connection failed"

- Check MySQL server is running
- Check database credentials di config/database.php
- Make sure database 'webdev_academy' exists

### "CORS error"

- Frontend URL harus sesuai di config/helpers.php
- Method harus OPTIONS, GET, POST, PUT, DELETE
- Headers harus lengkap

### "Token not valid"

- Check token tidak expired (7 hari)
- Check Authorization header format: `Bearer TOKEN`
- Check secret key sama di verify token

### Email sudah terdaftar

- Gunakan email yang belum pernah didaftar
- Atau reset database dengan re-running setup.sql

---

## 📞 Support & Next Steps

**Langkah selanjutnya:**

1. ✅ Setup PHP API dan MySQL
2. ✅ Integrasikan dengan React frontend
3. 🔲 Tambah endpoints: Get user profile, Update profile, Change password
4. 🔲 Tambah course endpoints: Get courses, Get lessons, Enroll course
5. 🔲 Tambah progress tracking endpoints
6. 🔲 Implementasi email verification
7. 🔲 Implementasi password reset
8. 🔲 Tambah admin endpoints
9. 🔲 Deploy ke production

---

**Version:** 1.0.0
**Last Updated:** December 4, 2025
**Status:** Ready for Development
