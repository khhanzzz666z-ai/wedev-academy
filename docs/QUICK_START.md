# ⚡ QUICK REFERENCE - PHP Login & Register

## 🚀 Setup Cepat (Copy-Paste)

### 1️⃣ Setup MySQL Database

```bash
# Buka MySQL
mysql -u root -p

# Import database schema
mysql -u root -p < php-api/setup.sql
```

### 2️⃣ Jalankan PHP Server

```bash
cd php-api
php -S localhost:8000
```

### 3️⃣ Jalankan React Server (Terminal Baru)

```bash
npm run dev
```

---

## 📡 API Endpoints

### ✅ Register

```
POST http://localhost:8000/api/register.php

Request:
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}

Response:
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "token": "eyJ0eXAiOi..."
  }
}
```

### ✅ Login

```
POST http://localhost:8000/api/login.php

Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "token": "eyJ0eXAiOi..."
  }
}
```

### ✅ Verify Token

```
GET http://localhost:8000/api/verify-token.php
Header: Authorization: Bearer eyJ0eXAiOi...

Response:
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

---

## 🔑 Menggunakan API dari React

### Import API Functions

```javascript
import {
  loginUser,
  registerUser,
  saveUserSession,
  getUserSession,
} from "./api";
```

### Register User

```javascript
const handleRegister = async (email, password, fullName) => {
  const result = await registerUser(email, password, fullName);

  if (result.success) {
    saveUserSession(result.data);
    // Redirect ke dashboard
  } else {
    console.error(result.message);
  }
};
```

### Login User

```javascript
const handleLogin = async (email, password) => {
  const result = await loginUser(email, password);

  if (result.success) {
    saveUserSession(result.data);
    // Redirect ke dashboard
  } else {
    console.error(result.message);
  }
};
```

### Get User Session

```javascript
const session = getUserSession();

if (session) {
  console.log(session.user.fullName);
  console.log(session.token);
} else {
  console.log("User not logged in");
}
```

---

## 💾 LocalStorage Structure

Setelah login, data disimpan:

```javascript
// localStorage.token
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."

// localStorage.user
{
  "userId": 1,
  "email": "user@example.com",
  "fullName": "John Doe"
}
```

### Access di Browser Console

```javascript
// Get token
localStorage.getItem("token");

// Get user
JSON.parse(localStorage.getItem("user"));

// Clear session (logout)
localStorage.clear();
```

---

## 🧪 Test dengan cURL

### Register

```bash
curl -X POST http://localhost:8000/api/register.php \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Verify Token

```bash
curl -X GET http://localhost:8000/api/verify-token.php \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📋 Database Structure

### Users Table

```sql
SELECT * FROM users;

# Columns:
id, email, password, full_name, phone, avatar_url, bio,
is_active, email_verified, created_at, updated_at
```

### Activity Logs

```sql
SELECT * FROM activity_logs WHERE user_id = 1;

# Akan log setiap login & register
```

---

## 🔒 Security Notes

✅ **Sudah Secure:**

- Password di-hash dengan bcrypt
- Token valid 7 hari
- CORS enabled
- Input validated & sanitized

⚠️ **TODO Production:**

- Change secret key di helpers.php
- Use HTTPS only
- Add rate limiting
- Enable email verification

---

## 🛠️ Troubleshooting

### "Connection failed"

```
✓ Check MySQL running: mysql -u root
✓ Check credentials di php-api/config/database.php
✓ Run: mysql -u root -p < php-api/setup.sql
```

### "CORS Error"

```
✓ Check API URL: http://localhost:8000
✓ Check frontend URL: http://localhost:5173
✓ Verify headers di php-api/config/helpers.php
```

### "Token not valid"

```
✓ Clear localStorage & login ulang
✓ Check token tidak expired (7 hari)
✓ Check Authorization header format: "Bearer TOKEN"
```

### "Email sudah terdaftar"

```
✓ Gunakan email baru
✓ Atau: DELETE FROM users WHERE email='test@example.com';
```

---

## 📂 File Locations

```
php-api/
├── config/database.php       ← MySQL config
├── config/helpers.php        ← JWT & security
├── api/login.php
├── api/register.php
├── api/verify-token.php
├── setup.sql                 ← Database schema
└── README.md

src/
├── api.js                    ← React API client
├── AuthComponent_PHP.jsx     ← New auth component
└── AuthComponent.jsx         ← Replace dengan ^
```

---

## ✅ Checklist Sebelum Go-Live

- [ ] MySQL connected
- [ ] PHP API running
- [ ] React frontend running
- [ ] Register tested
- [ ] Login tested
- [ ] Token saved di localStorage
- [ ] Session persistent (reload page)
- [ ] Logout working
- [ ] Error messages clear
- [ ] CORS no errors

---

## 📞 Support Resources

| Resource          | Link/Location                 |
| ----------------- | ----------------------------- |
| API Docs          | `php-api/README.md`           |
| Integration Guide | `PHP_REACT_INTEGRATION.md`    |
| Setup Steps       | `SETUP_CHECKLIST.md`          |
| Full Summary      | `PHP_MYSQL_SUMMARY.md`        |
| PHP Config        | `php-api/config/database.php` |
| React Client      | `src/api.js`                  |

---

## 🎯 Next Steps

1. Run PHP server: `php -S localhost:8000`
2. Run React server: `npm run dev`
3. Test register: http://localhost:5173/auth
4. Test login: http://localhost:5173/auth
5. Check console: localStorage & network tab
6. Add more endpoints (courses, lessons, etc.)

---

**Version:** 1.0.0
**Status:** Ready to Use ✅
**Created:** December 4, 2025
