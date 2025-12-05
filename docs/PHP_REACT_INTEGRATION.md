# 🔗 Integrasi PHP API dengan React Frontend

## 📋 Persiapan

Sebelum mengintegrasikan, pastikan sudah:

1. ✅ Setup MySQL database (run `php-api/setup.sql`)
2. ✅ Konfigurasi database di `php-api/config/database.php`
3. ✅ PHP API sudah running di `http://localhost:8000`
4. ✅ React frontend sudah running di `http://localhost:5173`

---

## 🚀 Setup Langkah-Langkah

### 1. Ganti AuthComponent ke versi PHP

**Option A: Replace AuthComponent yang ada**

```bash
# Backup file lama
cp src/AuthComponent.jsx src/AuthComponent_OLD.jsx

# Ganti dengan versi baru
cp src/AuthComponent_PHP.jsx src/AuthComponent.jsx
```

**Option B: Atau update AuthComponent secara manual**

Tambahkan import API di atas:

```jsx
import {
  loginUser,
  registerUser,
  saveUserSession,
  validateAuthForm,
} from "./api";
```

Ganti login/register handler untuk menggunakan PHP API:

```jsx
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const result = await loginUser(loginForm.email, loginForm.password);

  if (result.success) {
    saveUserSession(result.data);
    onNavigate("dashboard");
  } else {
    setError(result.message);
  }
};
```

### 2. Update Database Connection (Opsional)

Jika ingin mengubah host/port database, edit `php-api/config/database.php`:

```php
define('DB_HOST', 'localhost');      // Host database
define('DB_USER', 'root');           // Username
define('DB_PASSWORD', '');           // Password
define('DB_NAME', 'webdev_academy'); // Database name
define('DB_PORT', 3306);             // Port
```

### 3. Update API Base URL (Jika diperlukan)

Edit `src/api.js`, ubah `API_BASE_URL`:

```javascript
const API_BASE_URL = "http://localhost:8000"; // Sesuaikan URL
```

### 4. Jalankan Both Servers

**Terminal 1 - PHP Server:**

```bash
cd php-api
php -S localhost:8000
```

**Terminal 2 - React Server:**

```bash
npm run dev
```

---

## 🔄 Data Flow

### Flow Login dengan PHP API

```
1. User mengisi form email & password
   ↓
2. Submit form → handleLogin()
   ↓
3. Validasi input di React
   ↓
4. Kirim POST request ke http://localhost:8000/api/login.php
   ↓
5. PHP:
   - Cek email di database
   - Verify password (bcrypt)
   - Generate JWT token
   - Return user data + token
   ↓
6. React menerima response:
   - Jika success: Save token ke localStorage
   - Redirect ke dashboard
   - Jika error: Show error message
```

### Flow Register dengan PHP API

```
1. User isi form: nama, email, password, confirm password
   ↓
2. Submit → handleRegister()
   ↓
3. Validasi:
   - Email format valid
   - Password minimal 6 karakter
   - Nama minimal 3 karakter
   - Password cocok dengan konfirmasi
   ↓
4. Kirim POST request ke http://localhost:8000/api/register.php
   ↓
5. PHP:
   - Check email sudah terdaftar?
   - Hash password dengan bcrypt
   - Create user di database
   - Generate JWT token
   - Return user data + token
   ↓
6. React:
   - Save token & user ke localStorage
   - Redirect ke dashboard
```

---

## 💾 Data Storage

### Session Storage (localStorage)

Setelah login, data disimpan di localStorage:

```javascript
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

### Cara Access Data di Component

```jsx
import { getUserSession, isUserLoggedIn } from "./api";

function MyComponent() {
  const session = getUserSession();
  const loggedIn = isUserLoggedIn();

  if (!loggedIn) {
    return <div>Silakan login terlebih dahulu</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.fullName}!</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
```

---

## 🛡️ Security Best Practices

### Token Management

```jsx
// Get token untuk API calls
const session = getUserSession();
const token = session.token;

// Kirim token di header
const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

### Auto-logout jika token expired

```jsx
// Di api.js, ketika mendapat 401 response:
if (response.status === 401) {
  clearUserSession(); // Clear localStorage
  window.location.href = "/auth"; // Redirect ke login
}
```

### Hash Password

PHP sudah handle hashing dengan bcrypt:

```php
// Di server
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

// Verify
password_verify($inputPassword, $hash);
```

---

## 🧪 Testing Integration

### Test Manual Login

1. Buka http://localhost:5173/auth
2. Klik tab "Login"
3. Masukkan email & password dari sample data:
   - Email: john@example.com
   - Password: Sesuai yang di-hash (perlu di-reset)
4. Klik "Login"
5. Jika berhasil, akan redirect ke dashboard

### Test Manual Register

1. Buka http://localhost:5173/auth
2. Klik tab "Daftar"
3. Isi form:
   - Nama: Test User
   - Email: test@example.com
   - Password: password123
   - Konfirmasi: password123
4. Klik "Daftar"
5. Jika berhasil, akan redirect ke dashboard

### Debug dengan Browser DevTools

```javascript
// Di console:

// 1. Check localStorage
localStorage.getItem("token");
localStorage.getItem("user");

// 2. Clear session
localStorage.removeItem("token");
localStorage.removeItem("user");

// 3. Manual API call (test login)
fetch("http://localhost:8000/api/login.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "john@example.com",
    password: "password123",
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

---

## 📁 File Structure

```
webdev-academy/
├── php-api/                 ← PHP Backend
│   ├── config/
│   │   ├── database.php     ← MySQL config
│   │   └── helpers.php      ← JWT & helpers
│   ├── api/
│   │   ├── login.php        ← Login endpoint
│   │   ├── register.php     ← Register endpoint
│   │   └── verify-token.php ← Token verify
│   ├── setup.sql            ← Database schema
│   └── README.md            ← PHP API docs
│
├── src/                     ← React Frontend
│   ├── api.js               ← API client untuk PHP
│   ├── AuthComponent_PHP.jsx ← New auth component
│   ├── UserDashboard.jsx    ← Dashboard
│   ├── CourseLearningPage.jsx ← Learning page
│   └── ...
│
└── package.json
```

---

## 🔧 Troubleshooting

### CORS Error: "Access to XMLHttpRequest blocked"

**Penyebab:** Frontend (5173) vs PHP server (8000) domain berbeda

**Solusi:**

1. Edit `php-api/config/helpers.php`
2. Update header `Access-Control-Allow-Origin`:

```php
header('Access-Control-Allow-Origin: http://localhost:5173');
```

### "Database connection failed"

**Penyebab:** MySQL tidak running atau credential salah

**Solusi:**

1. Pastikan MySQL running: `mysql -u root -p`
2. Check kredensial di `php-api/config/database.php`
3. Jalankan `php-api/setup.sql` untuk setup database

### "Token not valid"

**Penyebab:** Token sudah expired (7 hari) atau signature tidak match

**Solusi:**

1. Clear localStorage & login ulang
2. Check secret key sama di helpers.php

### Email sudah terdaftar

**Penyebab:** Email sudah ada di database

**Solusi:**

1. Gunakan email baru
2. Atau delete data user dari database:

```sql
DELETE FROM users WHERE email = 'test@example.com';
```

---

## 📊 Database Reset

Jika ingin reset semua data:

```bash
# Via command line:
mysql -u root -p webdev_academy < php-api/setup.sql

# Atau via phpMyAdmin:
1. Drop database webdev_academy
2. Import php-api/setup.sql
```

---

## 🎯 Next Steps

### Setelah Login Working:

1. **Update UserDashboard.jsx**

   - Fetch user data dari API
   - Tampilkan enrolled courses dari database
   - Track progress dari lesson_progress table

2. **Create Course API endpoints:**

   - GET /api/courses - List all courses
   - GET /api/courses/:id - Get specific course
   - GET /api/courses/:courseId/lessons - Get lessons
   - POST /api/enrollments - Enroll user to course

3. **Create Progress Tracking:**

   - POST /api/lessons/:lessonId/complete - Mark lesson complete
   - GET /api/users/:userId/progress - Get user progress
   - PUT /api/progress/:progressId - Update watch time

4. **Add Advanced Features:**
   - Email verification
   - Password reset
   - User profile update
   - Admin dashboard

---

## 📞 Support

**File References:**

- `php-api/README.md` - PHP API documentation
- `src/api.js` - React API client functions
- `src/AuthComponent_PHP.jsx` - New auth component
- `php-api/config/helpers.php` - Helper functions

**API Endpoints:**

- Login: `POST /api/login.php`
- Register: `POST /api/register.php`
- Verify: `GET /api/verify-token.php`

**Status:** Ready for Integration & Testing ✅
