# WebDev Academy - Backend + MongoDB Setup

## 📋 Quick Start

### Prerequisites

- Node.js v16+
- npm atau yarn
- MongoDB (local atau Atlas cloud)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup MongoDB
# Pilih salah satu:
# - MongoDB Atlas (cloud): Recommended, easiest
# - Local MongoDB installation
# See MONGODB_SETUP.md untuk detail

# 3. Update .env file dengan MONGODB_URI Anda
# Copy example:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/webdev_academy
# JWT_SECRET=your_secret_here
# PORT=5000

# 4. Start server
npm run server-dev

# 5. Start frontend (di terminal baru)
npm run dev
```

---

## 🗄️ MongoDB Setup

Ada 3 cara setup MongoDB:

### 1️⃣ MongoDB Atlas (Cloud) - RECOMMENDED ✅

**Gratis, mudah, tanpa install**

1. Buka https://www.mongodb.com/cloud/atlas
2. Sign up & create free cluster (M0)
3. Setup network access
4. Create database user
5. Copy connection string
6. Update `.env` dengan URI

**Benefits:**

- ✓ Gratis selamanya (M0 tier)
- ✓ Tidak perlu install lokal
- ✓ Accessible dari mana saja
- ✓ Auto backup

Lihat detail: [MONGODB_SETUP.md](MONGODB_SETUP.md)

### 2️⃣ MongoDB Local (Windows/Mac/Linux)

**Untuk development offline**

Lihat setup instructions di [MONGODB_SETUP.md](MONGODB_SETUP.md)

### 3️⃣ Docker

**Jika sudah install Docker**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## 🚀 API Endpoints

### Auth Endpoints

```
POST   /api/auth/register          - Register user
POST   /api/auth/verify-email      - Verify email dengan code
POST   /api/auth/login             - Login dengan email/password
POST   /api/auth/oauth-login       - Login dengan Google/GitHub
GET    /api/auth/profile           - Get user profile (need JWT)
```

### Course Endpoints

```
GET    /api/courses                - Get all courses
GET    /api/courses/:id            - Get course by ID
POST   /api/courses/init           - Initialize sample courses
POST   /api/courses/mark-complete  - Mark lesson as completed
GET    /api/courses/:id/progress   - Get course progress
```

### Enrollment Endpoints

```
POST   /api/enrollments/enroll     - Enroll user di course
GET    /api/enrollments/user/:id   - Get user enrollments
GET    /api/enrollments/:id        - Get enrollment details
```

---

## 🧪 Testing API

### Method 1: Postman

1. Import file: `postman_collection.json`
2. Set base URL: `http://localhost:5000`
3. Test semua endpoints

### Method 2: curl

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John","email":"john@example.com","password":"123456","confirmPassword":"123456"}'

# Get all courses
curl http://localhost:5000/api/courses

# Health check
curl http://localhost:5000/api/health
```

### Method 3: Frontend Integration

Update React components untuk call API endpoints

---

## 📝 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  password: String (hashed),
  emailVerified: Boolean,
  verificationCode: String,
  provider: String ("email", "google", "github"),
  enrolledCourses: [ObjectId],
  trialStatus: String ("active", "expired"),
  trialEndDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Courses Collection

```javascript
{
  _id: ObjectId,
  id: String (unique),
  title: String,
  level: String,
  hours: Number,
  desc: String,
  image: String,
  instructor: String,
  rating: Number,
  students: Number,
  lessons: [{
    id: String,
    title: String,
    content: String,
    duration: Number,
    videoUrl: String,
    completed: Boolean
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### VerificationCodes Collection

```javascript
{
  _id: ObjectId,
  email: String,
  code: String,
  expiresAt: Date
}
```

---

## 🔑 Environment Variables

Buat file `.env` dengan:

```dotenv
# MongoDB Connection
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/webdev_academy

# JWT Secret (generate random string)
JWT_SECRET=your_random_secret_key_here_minimum_32_chars

# Server
PORT=5000
NODE_ENV=development

# Frontend API URL
REACT_APP_API_URL=http://localhost:5000
```

---

## 🛠️ Available Scripts

```bash
# Frontend development
npm run dev              # Start Vite dev server

# Frontend production
npm run build           # Build for production
npm run preview         # Preview production build

# Backend development
npm run server          # Start with nodemon (auto-reload)
npm run server-dev      # Start Node.js directly

# All at once (needs two terminals)
# Terminal 1: npm run dev
# Terminal 2: npm run server
```

---

## 📂 Project Structure

```
webdev-academy/
├── src/                          # React frontend
│   ├── App.jsx
│   ├── AuthComponent.jsx
│   ├── CourseLearningPage.jsx
│   ├── EmailVerificationComponent.jsx
│   ├── OAuthEmailComponent.jsx
│   └── ...
├── server/                       # Node.js backend
│   ├── server.js                 # Main server file
│   ├── models/                   # MongoDB schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   └── VerificationCode.js
│   ├── controllers/              # Business logic
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── enrollmentController.js
│   ├── routes/                   # API routes
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── enrollments.js
│   └── middleware/               # Express middleware
│       └── auth.js
├── .env                          # Environment variables
├── package.json                  # Dependencies
├── MONGODB_SETUP.md             # MongoDB setup guide
├── postman_collection.json       # Postman API collection
└── README.md                     # This file
```

---

## 🚨 Troubleshooting

### MongoDB Connection Error

```
Error: querySrv ENOTFOUND _mongodb._tcp.xxx.mongodb.net
```

**Solution:**

1. Check MONGODB_URI di `.env` file
2. Verify username & password benar
3. Jika local: pastikan MongoDB service running

### Server not starting

```
Error: listen EADDRINUSE :::5000
```

**Solution:** Port 5000 sudah digunakan

```bash
# Kill process
lsof -i :5000                 # Mac/Linux
netstat -ano | findstr :5000  # Windows
kill -9 <PID>
```

### JWT Token Issues

Token expire dalam 7 hari
User harus login ulang atau implement refresh token

---

## 🔐 Security Notes

⚠️ **For Development Only:**

- JWT_SECRET should be strong & random
- Disable CORS restrictions hanya untuk dev
- Password hashing dengan bcryptjs

**For Production:**

- Use environment-specific .env files
- Enable HTTPS
- Restrict CORS ke domain spesifik
- Add rate limiting
- Add input validation & sanitization
- Use secrets management (AWS Secrets Manager, etc)

---

## 📚 Frontend Integration

### Contoh: Call API dari React

```javascript
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Register
const registerUser = async (fullName, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      fullName,
      email,
      password,
      confirmPassword: password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get courses
const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/courses`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Enroll course (with JWT)
const enrollCourse = async (userId, courseId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/enrollments/enroll`,
      { userId, courseId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
```

---

## 🌐 Deployment

### Deploy Backend (Node.js + MongoDB)

**Options:**

1. **Railway** - Recommended untuk Vercel users
2. **Render** - Free tier tersedia
3. **Heroku** - Classic, tapi paid now
4. **Replit** - Simple hosting
5. **AWS EC2** - Full control

**Steps:**

1. Push ke GitHub
2. Connect repo ke hosting platform
3. Set environment variables
4. Deploy!

---

## 📞 Support

Lihat:

- [MONGODB_SETUP.md](MONGODB_SETUP.md) - Detailed MongoDB setup
- [postman_collection.json](postman_collection.json) - API examples
- GitHub Issues - Report bugs

---

## ✅ Checklist

- [ ] Install Node.js & npm
- [ ] Clone repository
- [ ] Setup MongoDB (Atlas recommended)
- [ ] Create `.env` file dengan MONGODB_URI
- [ ] Run `npm install`
- [ ] Run `npm run server` (backend)
- [ ] Run `npm run dev` (frontend)
- [ ] Test API dengan Postman
- [ ] Integrate API ke React components
- [ ] Test semua features
- [ ] Deploy ke production

---

**Happy coding! 🚀**

Questions? Check MONGODB_SETUP.md atau open GitHub issue
