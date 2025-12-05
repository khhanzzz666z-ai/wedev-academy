# WebDev Academy - Quick Navigation

Selamat datang di **WebDev Academy** — platform pembelajaran web development yang lengkap!

## 📁 Struktur Folder

```
webdev academy/
├── 📁 src/                    # React Frontend
│   ├── components/            # React components (auth, dashboard, learning)
│   ├── pages/                # Page components
│   ├── utils/                # Utility functions
│   ├── api.js                # API client for backend
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
│
├── 📁 server/                # Node.js Backend (optional, for learning)
│   ├── routes/               # API routes
│   ├── controllers/          # Business logic
│   ├── middleware/           # Authentication, validation
│   └── models/               # Database models (Sequelize)
│
├── 📁 php-api/               # PHP Backend (main - recommended)
│   ├── config/
│   │   ├── database.php      # MySQL configuration
│   │   └── helpers.php       # JWT, bcrypt, validation helpers
│   ├── api/
│   │   ├── login.php         # POST /api/login.php
│   │   ├── register.php      # POST /api/register.php
│   │   └── verify-token.php  # GET /api/verify-token.php
│   ├── migrations/           # Database schema updates
│   ├── setup.sql             # Initial database schema (8 tables)
│   └── test_connection.php   # Test database connection
│
├── 📁 public/                # Static assets
│   └── favicon.ico
│
├── 📁 docs/                  # Documentation
│   ├── SETUP_AUTOMATED.md    # Automated setup guide
│   ├── PHP_REACT_INTEGRATION.md
│   ├── QUICK_START.md
│   ├── README_MAIN.md
│   └── ... (20+ docs)
│
├── 📁 scripts/               # Automation scripts
│   ├── setup.ps1             # Check PHP, Chocolatey, MySQL
│   ├── setup_xampp.ps1       # Setup with XAMPP
│   ├── server_xampp.ps1      # Run PHP server
│   ├── test.ps1              # Test API endpoints
│   └── ... (more scripts)
│
├── 📄 package.json           # Node.js dependencies
├── 📄 vite.config.js         # Vite config
├── 📄 tailwind.config.js     # Tailwind CSS config
├── 📄 index.html             # HTML entry point
└── 📄 .env                   # Environment variables
```

---

## 🚀 Quick Start

### 1️⃣ Setup Backend (PHP + MySQL)

**Option A - Automated Setup (XAMPP):**

```powershell
cd 'C:\Users\admin\Documents\webdev academy'
powershell -ExecutionPolicy Bypass -File scripts\setup_xampp.ps1
```

**Option B - Manual Setup:**

- Ensure XAMPP is installed with PHP + MySQL
- Run: `mysql -u root -p < php-api/setup.sql`

### 2️⃣ Start Services

**Terminal 1 - PHP Server:**

```powershell
powershell -ExecutionPolicy Bypass -File scripts\server_xampp.ps1
# Server runs on http://localhost:8000
```

**Terminal 2 - React Dev Server:**

```powershell
npm run dev
# Frontend runs on http://localhost:5173
```

### 3️⃣ Test Backend

**Terminal 3 - Run API Tests:**

```powershell
powershell -ExecutionPolicy Bypass -File scripts\test.ps1
```

### 4️⃣ Open in Browser

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/
- Auth page: http://localhost:5173/auth

---

## 📚 Documentation

Start here based on your need:

| Document                                                      | Purpose                          |
| ------------------------------------------------------------- | -------------------------------- |
| **[SETUP_AUTOMATED.md](docs/SETUP_AUTOMATED.md)**             | Automated backend setup guide    |
| **[QUICK_START.md](docs/QUICK_START.md)**                     | 5-minute quick reference         |
| **[PHP_REACT_INTEGRATION.md](docs/PHP_REACT_INTEGRATION.md)** | How frontend talks to backend    |
| **[PHP_MYSQL_SUMMARY.md](docs/PHP_MYSQL_SUMMARY.md)**         | Database schema & API details    |
| **[README_MAIN.md](docs/README_MAIN.md)**                     | Full project documentation index |

---

## 🔑 Key Features

### Frontend (React + Vite + Tailwind)

- ✅ Video learning player with 5-step structure
- ✅ User authentication (login/register)
- ✅ Course dashboard
- ✅ Responsive design (mobile-first)
- ✅ Dark/Light mode support

### Backend (PHP + MySQL)

- ✅ RESTful API (register, login, verify-token)
- ✅ JWT token authentication
- ✅ Bcrypt password hashing
- ✅ 8 database tables with relationships
- ✅ Input validation & sanitization
- ✅ CORS enabled for localhost:5173

### Database (MySQL)

- ✅ Users table with authentication
- ✅ Courses, Lessons, Enrollments
- ✅ Progress tracking
- ✅ Activity logs
- ✅ Quiz questions & answers

---

## 🔧 Scripts in `/scripts`

| Script             | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `setup.ps1`        | Check PHP, Chocolatey, MySQL availability |
| `setup_xampp.ps1`  | Setup database with XAMPP                 |
| `server_xampp.ps1` | Run PHP development server                |
| `test.ps1`         | Test all API endpoints                    |

**Usage:**

```powershell
powershell -ExecutionPolicy Bypass -File scripts\<script-name>.ps1
```

---

## 📄 API Endpoints

All endpoints require `Content-Type: application/json`

### Register

```
POST http://localhost:8000/api/register.php
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
→ Returns JWT token + user data
```

### Login

```
POST http://localhost:8000/api/login.php
{
  "email": "john@example.com",
  "password": "yourpassword"
}
→ Returns JWT token + user data
```

### Verify Token

```
GET http://localhost:8000/api/verify-token.php
Authorization: Bearer <TOKEN>
→ Returns user data if token valid
```

---

## 🗂️ Important Files

**Frontend Entry:**

- `src/main.jsx` - React app entry
- `src/App.jsx` - Main router
- `src/api.js` - Backend API client

**Backend Entry:**

- `php-api/config/database.php` - MySQL config
- `php-api/config/helpers.php` - Core functions (JWT, bcrypt)
- `php-api/api/login.php` - Login endpoint

**Config:**

- `.env` - Environment variables
- `vite.config.js` - Vite config
- `tailwind.config.js` - Tailwind CSS config
- `package.json` - Node dependencies

---

## 💡 Tips

### To add a new API endpoint:

1. Create file: `php-api/api/your-endpoint.php`
2. Use helpers from `php-api/config/helpers.php`
3. Call from React: `src/api.js`

### To add a new page/component:

1. Create React component in `src/components/`
2. Add route in `src/App.jsx`
3. Import component and add to router

### To modify database:

1. Update `php-api/setup.sql`
2. Recreate database: `mysql -u root -p < php-api/setup.sql`
3. Or create migration in `php-api/migrations/`

---

## 🐛 Troubleshooting

**PHP Server won't start:**

- Check XAMPP is running
- Verify port 8000 is free
- Run `scripts\test.ps1` for diagnostics

**Database connection error:**

- Check MySQL credentials in `php-api/config/database.php`
- Ensure database `webdev_academy` exists
- Run setup script: `scripts\setup_xampp.ps1`

**React frontend not connecting to API:**

- Check PHP server is running on port 8000
- Check browser console for CORS errors
- Verify `src/api.js` has correct API URL

**More issues?** Check detailed docs in `/docs` folder.

---

## 📞 Support

All documentation in `/docs` folder. Key guides:

- Setup issues → [SETUP_AUTOMATED.md](docs/SETUP_AUTOMATED.md)
- API issues → [PHP_MYSQL_SUMMARY.md](docs/PHP_MYSQL_SUMMARY.md)
- Integration → [PHP_REACT_INTEGRATION.md](docs/PHP_REACT_INTEGRATION.md)

---

**Happy learning! 🎓**

Last updated: December 4, 2025
