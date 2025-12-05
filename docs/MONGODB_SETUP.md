# MongoDB Setup Guide untuk WebDev Academy

## Pilihan Setup MongoDB

### Option 1: MongoDB Atlas (Cloud) - RECOMMENDED ✓

**Paling mudah, gratis, tanpa install lokal**

#### Langkah-langkah:

1. Buka https://www.mongodb.com/cloud/atlas
2. Sign up dengan email / Google
3. Create free cluster (M0 tier - forever free)
4. Setup Network Access:
   - Allow access from anywhere (0.0.0.0/0) untuk dev
5. Create database user dengan password
6. Copy connection string:
   ```
   mongodb+srv://username:QRhecxTWSNlkljY.xxxxx.mongodb.net/webdev_academy?retryWrites=true&w=majority
   ```
7. Update `.env` file dengan MONGODB_URI

#### `.env` File Example:

```dotenv
MONGODB_URI=mongodb+srv://admin:QRhecxTWSNlkljY.mongodb.net/webdev_academy?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
PORT=5000
```

---

### Option 2: MongoDB Local (Installed)

**Untuk development lokal**

#### Setup di Windows:

1. Download MongoDB Community Server:
   https://www.mongodb.com/try/download/community

2. Run installer:

   - Pilih "Install MongoDB as a Service"
   - Gunakan default path: `C:\Program Files\MongoDB\Server`

3. MongoDB akan otomatis start sebagai service

4. Update `.env`:

   ```dotenv
   MONGODB_URI=mongodb://localhost:27017/webdev_academy
   ```

5. Verify MongoDB running:
   ```bash
   mongosh
   ```

#### Setup di macOS:

```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Update .env
MONGODB_URI=mongodb://localhost:27017/webdev_academy
```

#### Setup di Linux:

```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# Update .env
MONGODB_URI=mongodb://localhost:27017/webdev_academy
```

---

### Option 3: Docker (Development Container)

**Jika sudah install Docker**

```bash
# Run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Update .env
MONGODB_URI=mongodb://localhost:27017/webdev_academy
```

Stop container:

```bash
docker stop mongodb
```

---

## Verify MongoDB Connection

```bash
# Check server health
curl http://localhost:5000/api/health

# Response harusnya:
# {"status":"Server running","mongodb":"connected","timestamp":"..."}
```

---

## MongoDB Database Schema

### User Collection

```javascript
{
  fullName: String,
  email: String,
  password: String (hashed),
  emailVerified: Boolean,
  provider: String ("email", "google", "github"),
  enrolledCourses: [ObjectId], // Course references
  trialStatus: String ("active", "expired"),
  trialEndDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Collection

```javascript
{
  id: String (unique),
  title: String,
  level: String,
  hours: Number,
  desc: String,
  image: String,
  instructor: String,
  rating: Number,
  students: Number,
  lessons: [
    {
      id: String,
      title: String,
      content: String,
      duration: Number,
      videoUrl: String,
      completed: Boolean
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment Collection

```javascript
{
  userId: ObjectId (User reference),
  courseId: ObjectId (Course reference),
  enrolledAt: Date,
  completedAt: Date (nullable),
  progress: Number (0-100),
  lessons_completed: Number
}
```

### VerificationCode Collection

```javascript
{
  email: String,
  code: String,
  expiresAt: Date
}
```

---

## API Endpoints (with MongoDB)

### Authentication

- `POST /api/auth/register` - Register dengan email
- `POST /api/auth/verify-email` - Verify email dengan code
- `POST /api/auth/login` - Login dengan email/password
- `POST /api/auth/oauth-login` - Login dengan Google/GitHub
- `GET /api/auth/profile` - Get user profile (require JWT token)

### Courses

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/init` - Initialize sample courses
- `POST /api/courses/mark-complete` - Mark lesson as completed
- `GET /api/courses/:id/progress` - Get course progress

### Enrollment

- `POST /api/enrollments/enroll` - Enroll user di course
- `GET /api/enrollments/user/:userId` - Get user enrollments
- `GET /api/enrollments/:enrollmentId` - Get enrollment details

---

## Frontend Integration

### Update Frontend API Calls

Dari localStorage ke API calls:

```javascript
// Before (localStorage)
const users = JSON.parse(localStorage.getItem("webdev_users"));

// After (API)
const response = await axios.get("/api/auth/profile", {
  headers: { Authorization: `Bearer ${token}` },
});
const user = response.data.data;
```

### Example Frontend Integration

```javascript
// Register
const registerUser = async (fullName, email, password) => {
  try {
    const response = await axios.post("/api/auth/register", {
      fullName,
      email,
      password,
      confirmPassword: password,
    });
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
  }
};

// Login
const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    const { token, data: user } = response.data;
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
  } catch (error) {
    console.error("Login error:", error);
  }
};

// Get all courses
const getCourses = async () => {
  try {
    const response = await axios.get("/api/courses");
    return response.data.data;
  } catch (error) {
    console.error("Get courses error:", error);
  }
};

// Enroll in course
const enrollCourse = async (userId, courseId) => {
  try {
    const response = await axios.post("/api/enrollments/enroll", {
      userId,
      courseId,
    });
    return response.data;
  } catch (error) {
    console.error("Enroll error:", error);
  }
};
```

---

## Troubleshooting

### MongoDB tidak connect

```
Error: querySrv ENOTFOUND _mongodb._tcp.xxxx.mongodb.net
```

**Solution:** Check MONGODB_URI di .env, pastikan username/password benar

### Port 5000 sudah digunakan

```bash
# Kill process di port 5000
netstat -ano | findstr :5000  # Windows
kill -9 <PID>                  # Linux/Mac
```

### JWT Token expired

Token lifetime: 7 hari
Refresh token atau login ulang

### CORS Error

Sudah dikonfigurasi di server dengan `app.use(cors())`
Untuk production, restrict ke domain spesifik

---

## Next Steps

1. ✓ Setup MongoDB (pilih salah satu option)
2. ✓ Update `.env` dengan MONGODB_URI
3. ✓ Start server: `npm run server`
4. ✓ Update frontend untuk menggunakan API
5. ✓ Test semua endpoints dengan Postman/Insomnia
6. ✓ Deploy ke production (Railway, Render, Heroku, etc)

---

**Happy coding! 🚀**
