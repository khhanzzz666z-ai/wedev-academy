# 📚 WebDev Academy - Complete Documentation Index

## 🎯 Start Here

Pilih dokumentasi berdasarkan kebutuhan Anda:

### ⚡ Quick Start (Mulai Langsung)

👉 **[QUICK_START.md](QUICK_START.md)** - Setup dalam 5 menit

- Copy-paste commands
- API endpoints
- Testing dengan cURL

### 📋 Full Setup Guide (Detail)

👉 **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Langkah-langkah lengkap

- Pre-requisites check
- Database setup
- PHP configuration
- React integration
- Testing setiap step

### 🔗 Integration Guide

👉 **[PHP_REACT_INTEGRATION.md](PHP_REACT_INTEGRATION.md)** - Cara menghubungkan PHP & React

- Setup langkah-langkah
- Data flow diagram
- Session management
- Security best practices

### 📝 Complete Summary

👉 **[PHP_MYSQL_SUMMARY.md](PHP_MYSQL_SUMMARY.md)** - Ringkasan lengkap

- Semua yang sudah dibuat
- Architecture overview
- Database schema
- Security features

---

## 📂 Struktur Folder

### Backend (PHP)

```
php-api/
├── config/
│   ├── database.php          🔧 MySQL connection config
│   └── helpers.php           🔐 JWT & security functions
├── api/
│   ├── login.php             ✅ Login endpoint (POST)
│   ├── register.php          ✅ Register endpoint (POST)
│   └── verify-token.php      ✅ Verify token endpoint (GET)
├── setup.sql                 📊 Database schema
├── README.md                 📖 PHP API documentation
└── QUICK_START.md            ⚡ Quick reference
```

**Baca:** `php-api/README.md` untuk detail API

### Frontend (React)

```
src/
├── api.js                    🌐 API client functions
├── AuthComponent_PHP.jsx     🔐 New auth component
├── AuthComponent.jsx         (Replace dengan ^ version)
├── EnhancedVideoPlayer.jsx   🎬 Video learning system
├── CourseLearningPage.jsx    📚 Learning interface
├── UserDashboard.jsx         👤 User dashboard
└── ...
```

**Baca:** `PHP_REACT_INTEGRATION.md` untuk integration

---

## 🚀 Quick Commands

### Setup Database

```bash
mysql -u root -p < php-api/setup.sql
```

### Run PHP Server

```bash
cd php-api
php -S localhost:8000
```

### Run React Server

```bash
npm run dev
```

---

## 📡 API Endpoints

| Endpoint                | Method | Purpose          | Auth      |
| ----------------------- | ------ | ---------------- | --------- |
| `/api/register.php`     | POST   | Create new user  | ❌        |
| `/api/login.php`        | POST   | User login       | ❌        |
| `/api/verify-token.php` | GET    | Verify JWT token | ✅ Bearer |

**Docs:** `php-api/README.md`

---

## 🔐 Authentication Flow

```
User Input (Email + Password)
        ↓
Validation di React
        ↓
API Call ke PHP
        ↓
PHP: Validate & Check Database
        ↓
Generate JWT Token
        ↓
Return Token + User Data
        ↓
Save ke localStorage
        ↓
Redirect ke Dashboard
```

---

## 💾 Database Tables

| Table             | Purpose                     |
| ----------------- | --------------------------- |
| `users`           | User accounts & credentials |
| `courses`         | Course information          |
| `lessons`         | Course lessons              |
| `enrollments`     | User course enrollments     |
| `lesson_progress` | Track lesson completion     |
| `activity_logs`   | User activity audit         |
| `quiz_questions`  | Quiz content                |
| `quiz_answers`    | User quiz answers           |

**Schema:** `php-api/setup.sql`

---

## 🔑 Key Files Explained

### 1. `php-api/config/database.php`

- MySQL connection setup
- Host, user, password, database name
- Error handling

```php
// Edit ini untuk change database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
```

### 2. `php-api/config/helpers.php`

- JWT token generation
- Password hashing (bcrypt)
- Email validation
- Session verification

```php
// Change secret key untuk production
$secretKey = 'your-secret-key-here';
```

### 3. `php-api/api/login.php`

- POST endpoint untuk login
- Verify email & password
- Return JWT token

```bash
curl -X POST http://localhost:8000/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

### 4. `src/api.js`

- React API client
- API functions untuk call PHP endpoints
- localStorage management

```javascript
import { loginUser, registerUser, saveUserSession } from "./api";
```

### 5. `src/AuthComponent_PHP.jsx`

- New auth component untuk PHP backend
- Replace existing AuthComponent.jsx
- Login & register forms
- OAuth integration

---

## ✅ Checklist Setup

### Database

- [ ] MySQL installed
- [ ] Run setup.sql
- [ ] Verify tables created
- [ ] Sample data loaded

### PHP Backend

- [ ] Edit database.php credentials
- [ ] Update secret key di helpers.php
- [ ] Run: `php -S localhost:8000`
- [ ] Test endpoints dengan cURL

### React Frontend

- [ ] Run: `npm run dev`
- [ ] AuthComponent integrated
- [ ] api.js updated with correct URL
- [ ] Test login/register

### Integration

- [ ] Register new user
- [ ] Login dengan user baru
- [ ] Check localStorage
- [ ] Verify session persistent

---

## 🧪 Testing

### Manual Test

1. Go to http://localhost:5173/auth
2. Click "Daftar"
3. Fill form & submit
4. Should redirect to dashboard

### cURL Test

```bash
# Register
curl -X POST http://localhost:8000/api/register.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","fullName":"Test"}'

# Login
curl -X POST http://localhost:8000/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

### Browser DevTools Test

```javascript
// Check token
localStorage.getItem("token");

// Check user
JSON.parse(localStorage.getItem("user"));

// Clear session
localStorage.clear();
```

---

## 🎓 Learning Path

1. **Understand Architecture** → Read `PHP_MYSQL_SUMMARY.md`
2. **Setup Database** → Follow `SETUP_CHECKLIST.md`
3. **Run Backend** → Follow `php-api/README.md`
4. **Integrate Frontend** → Read `PHP_REACT_INTEGRATION.md`
5. **Test Everything** → Use `QUICK_START.md` test examples
6. **Customize** → Modify config & endpoints as needed

---

## 📞 Troubleshooting

### Database Connection Error

```
→ Check MySQL running
→ Verify credentials di database.php
→ Check database exists: SHOW DATABASES;
```

### CORS Error

```
→ Check API URL correct (localhost:8000)
→ Check frontend URL (localhost:5173)
→ Restart PHP server
```

### Token Invalid

```
→ Clear localStorage & login ulang
→ Check secret key sama di helpers.php
→ Check token not expired (7 hari)
```

**More help:** See troubleshooting section di setiap doc

---

## 🎯 Next Features to Add

- [ ] Email verification flow
- [ ] Password reset flow
- [ ] User profile update
- [ ] Change password
- [ ] Courses API endpoints
- [ ] Lesson progress tracking
- [ ] Quiz functionality
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Analytics

---

## 📊 Statistics

| Item                | Count |
| ------------------- | ----- |
| PHP Files           | 7     |
| React Files         | 2     |
| Database Tables     | 8     |
| Documentation Files | 6     |
| API Endpoints       | 3     |
| Helper Functions    | 15+   |

---

## 🔗 Documentation Map

```
📚 DOCUMENTATION
├── ⚡ QUICK_START.md
│   └── Copy-paste setup, quick commands
├── 📋 SETUP_CHECKLIST.md
│   └── Step-by-step detailed guide
├── 🔗 PHP_REACT_INTEGRATION.md
│   └── Integration & architecture
├── 📝 PHP_MYSQL_SUMMARY.md
│   └── Complete overview & summary
├── 🐘 php-api/README.md
│   └── PHP API specific docs
└── 📚 PROJECT_STRUCTURE.md
    └── Overall project structure
```

---

## 💡 Tips & Best Practices

✅ **DO:**

- Use strong passwords in production
- Change secret key in production
- Use HTTPS in production
- Implement rate limiting
- Log all activities
- Backup database regularly

❌ **DON'T:**

- Expose secret key in frontend
- Store passwords in plain text
- Use hardcoded database credentials
- Skip input validation
- Ignore CORS issues
- Use same secret key for all tokens

---

## 🚀 Deployment Checklist

- [ ] Change DB credentials
- [ ] Update secret key
- [ ] Set API_BASE_URL to production server
- [ ] Enable HTTPS
- [ ] Setup .env for sensitive data
- [ ] Run database backups
- [ ] Monitor logs
- [ ] Test all endpoints
- [ ] Security audit
- [ ] Performance testing

---

## 📞 Support & Resources

| Need               | Reference                               |
| ------------------ | --------------------------------------- |
| Quick setup        | QUICK_START.md                          |
| Detailed steps     | SETUP_CHECKLIST.md                      |
| Architecture       | PHP_MYSQL_SUMMARY.md                    |
| Integration issues | PHP_REACT_INTEGRATION.md                |
| API docs           | php-api/README.md                       |
| Troubleshooting    | See troubleshooting section in each doc |

---

## 📝 Version History

| Version | Date       | Changes                             |
| ------- | ---------- | ----------------------------------- |
| 1.0.0   | 2024-12-04 | Initial release with login/register |

---

## ✨ What's Included

✅ Complete PHP backend
✅ MySQL database schema
✅ React API client
✅ Authentication system
✅ JWT tokens
✅ Password hashing
✅ Session management
✅ Comprehensive documentation
✅ Setup checklist
✅ Quick reference guide
✅ Testing examples
✅ Security best practices

---

## 🎉 Ready to Start?

### Pick Your Path:

1. **Impatient?** → Start with `QUICK_START.md` (5 min)
2. **Detail-oriented?** → Follow `SETUP_CHECKLIST.md` (30 min)
3. **Want overview?** → Read `PHP_MYSQL_SUMMARY.md` (20 min)
4. **Need integration help?** → Check `PHP_REACT_INTEGRATION.md` (15 min)

**All resources created:** December 4, 2025
**Status:** Ready to Use ✅

---

_Happy coding! 🚀_
