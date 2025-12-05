# 🛠️ Developer Reference - File Usage Guide

## 📁 Complete File Map

### ✅ ACTIVE COMPONENTS (Production Ready)

```
src/
├── main.jsx
│   ├── Purpose: React app entry point
│   ├── Used by: Vite bundler
│   ├── Status: ✅ CRITICAL
│   └── Contains: createRoot & App mount
│
├── App.jsx (480 lines)
│   ├── Purpose: Main router & application shell
│   ├── Routes:
│   │   ├── / → HomePage (landing page)
│   │   ├── /auth → AuthComponent (login/register)
│   │   ├── /courses → CoursesPage (browse courses)
│   │   ├── /course/:id → CourseDetailPage
│   │   ├── /course/:id/learn → CourseLearningPage
│   │   ├── /dashboard → UserDashboard (progress)
│   │   ├── /admin → AdminLoginPage
│   │   └── /modules → ModulesPage
│   ├── Features:
│   │   ├── Responsive header with mobile nav
│   │   ├── Dark/Light mode toggle
│   │   ├── Navigation with avatar
│   │   ├── Mobile hamburger menu
│   │   └── Footer with links
│   ├── Status: ✅ PRODUCTION READY
│   └── Dependencies: React Router v6, Framer Motion
│
├── database.js (1200+ lines)
│   ├── Purpose: Mock data & database simulation
│   ├── Exports:
│   │   ├── courses[] - 4 kursus
│   │   ├── getCourseById(id)
│   │   ├── markLessonAsCompleted(courseId, lessonId)
│   │   ├── getCourseProgress(courseId)
│   │   ├── authenticateUser(email, password)
│   │   ├── registerUser(email, password, name)
│   │   └── More functions...
│   ├── Data:
│   │   ├── 4 courses (Frontend, Backend, Fullstack, DevOps)
│   │   ├── 19 lessons total
│   │   ├── Module organization
│   │   └── Progress tracking
│   ├── Status: ✅ LIVE DATA
│   └── Next: Migrate to backend API
│
├── index.css
│   ├── Purpose: Global Tailwind CSS setup
│   ├── Includes: Tailwind directives & custom CSS
│   ├── Status: ✅ ACTIVE
│   └── Used by: All components
│
└── components/
    └── EnhancedVideoPlayer.jsx (600+ lines) ⭐ NEW
        ├── Purpose: Advanced video player with learning structure
        ├── Props:
        │   ├── lesson - lesson object
        │   ├── dark - theme boolean
        │   └── onComplete - callback function
        ├── Features:
        │   ├── Segmented video learning (4-10 segments per lesson)
        │   ├── Play/pause controls
        │   ├── Skip forward/backward
        │   ├── Progress tracking per segment
        │   ├── Code examples per segment
        │   ├── Key points sidebar
        │   ├── Mark as complete
        │   ├── Volume control
        │   ├── Fullscreen mode
        │   └── Segment navigator
        ├── Status: ✅ NEW & READY
        └── Used by: CourseLearningPage
```

---

### 🔐 AUTHENTICATION COMPONENTS

```
src/AuthComponent.jsx (350+ lines)
├── Purpose: Login & Registration form
├── Features:
│   ├── Login/Register toggle
│   ├── Email validation (registered emails only)
│   ├── Password field
│   ├── Form validation
│   ├── OAuth buttons (Google, GitHub)
│   ├── Helper text & guidance
│   ├── Error messages (specific)
│   ├── Home navigation button
│   └── Responsive design
├── Status: ✅ PRODUCTION
└── API: localStorage (temp) → Backend (next)

src/OAuthEmailComponent.jsx (200+ lines)
├── Purpose: OAuth login handler
├── Features:
│   ├── Real email validation (9 domains)
│   ├── Name format validation (2+ words, 2+ chars)
│   ├── Account creation with validation
│   ├── Helper text
│   └── Error messages
├── Validation Rules:
│   ├── Email: gmail, yahoo, outlook, hotmail, icloud, mail, protonmail, tutanota, yandex
│   ├── Name: 2+ words, each 2+ chars, no leading numbers
│   └── No fake accounts allowed
├── Status: ✅ ACTIVE
└── Used by: AuthComponent

src/EmailVerificationComponent.jsx
├── Purpose: Email verification workflow
├── Status: ✅ AVAILABLE
└── Used by: Registration flow
```

---

### 📚 LEARNING COMPONENTS

```
src/CourseLearningPage.jsx (380+ lines)
├── Purpose: Lesson player & progress tracking
├── Features:
│   ├── Video player integration (EnhancedVideoPlayer)
│   ├── Lesson sidebar with module grouping
│   ├── Progress bar
│   ├── Lesson navigation
│   ├── Mark as complete
│   ├── Next lesson button
│   ├── Module display
│   ├── Sticky sidebar on desktop
│   └── Responsive mobile layout
├── Functions:
│   ├── getLessonsByModule(lessons) - Group by module
│   ├── handleSelectLesson(id) - Switch lesson
│   ├── handleMarkComplete() - Mark progress
│   └── handleNextLesson() - Auto-advance
├── Status: ✅ PRODUCTION
└── Data: From database.js

src/UserDashboard.jsx (320+ lines)
├── Purpose: User learning progress & stats
├── Shows:
│   ├── User profile & stats
│   ├── Enrolled courses
│   ├── Progress bars
│   ├── Trial period countdown
│   ├── Recent activity
│   ├── Achievements
│   └── Home navigation
├── Features:
│   ├── Course enrollment
│   ├── Progress tracking
│   ├── Stats dashboard
│   ├── Responsive grid
│   └── Dark/Light mode
├── Status: ✅ PRODUCTION
└── Uses: database.js functions
```

---

### ⚙️ BACKEND FILES

```
server/server.js
├── Purpose: Express.js backend server
├── Port: 5000 (development)
├── Endpoints:
│   ├── GET /api/health - Health check
│   ├── POST /api/auth/login - Login user
│   ├── POST /api/auth/register - Register user
│   ├── GET /api/courses - Get all courses
│   ├── GET /api/courses/:id - Get course detail
│   ├── POST /api/enrollments - Enroll course
│   └── More...
├── Features:
│   ├── CORS enabled
│   ├── JSON parsing
│   ├── Error handling
│   ├── MySQL connection (Sequelize)
│   └── Auto database sync
├── Status: ✅ RUNNING
└── Database: MySQL (webdev_academy)

server/db/database.js
├── Purpose: Sequelize ORM setup
├── Models:
│   ├── User model
│   ├── Course model
│   ├── Enrollment model
│   ├── VerificationCode model
│   └── Relationships
├── Functions:
│   ├── sequelize.authenticate()
│   ├── sequelize.sync()
│   └── Model definitions
├── Status: ✅ SYNCED
└── Database: MySQL auto-created
```

---

### ⚙️ CONFIG FILES

```
package.json
├── Name: webdev-academy
├── Version: 0.0.1
├── Scripts:
│   ├── npm run dev - Start Vite dev server
│   ├── npm run server-dev - Start backend
│   ├── npm run build - Build for production
│   └── npm run preview - Preview build
├── Key Dependencies:
│   ├── react 18.3.1
│   ├── vite 5.0.8
│   ├── tailwindcss 3.4.1
│   ├── framer-motion 10.16.4
│   ├── express 5.2.1
│   └── sequelize 6.32.1
├── Status: ✅ CURRENT
└── Last Updated: Dec 2024

vite.config.js
├── Purpose: Vite bundler configuration
├── Config:
│   ├── React plugin
│   ├── Port 5173
│   └── HMR enabled
├── Status: ✅ WORKING
└── Used by: npm run dev

tailwind.config.js
├── Purpose: Tailwind CSS customization
├── Features:
│   ├── Color palette
│   ├── Font configuration
│   ├── Breakpoints (sm: 640px, lg: 1024px)
│   └── Custom utilities
├── Status: ✅ ACTIVE
└── Used by: index.css

.env
├── Purpose: Environment variables
├── Variables:
│   ├── DB_HOST
│   ├── DB_USER
│   ├── DB_PASSWORD
│   ├── DB_NAME
│   └── PORT
├── Status: ✅ CONFIGURED
└── Used by: server.js
```

---

## ❌ DEPRECATED / UNUSED FILES

```
src/VideoPlayer.jsx ❌ DEPRECATED
├── Reason: Replaced by EnhancedVideoPlayer
├── Status: Can be deleted
└── Impact: None (no longer used)

Documentation Files (Can Delete):
├── PAGES_DOCUMENTATION.md ❌
├── PAGES_FINAL_SUMMARY.md ❌
├── PAGES_VISUAL_SUMMARY.md ❌
├── BEFORE_AFTER_COMPARISON.md ❌
├── MONGODB_SETUP.md ❌
├── BACKEND_README.md ❌
├── QUICK_DEPLOY.md ❌
└── UPDATES_SUMMARY.md ❌

Auto-Generated (Don't delete):
├── dist/ ⚠️ Build output
├── node_modules/ ⚠️ Dependencies
├── .git/ ⚠️ Version control
└── .netlify/ ⚠️ Deployment
```

---

## 📊 DEPENDENCY USAGE MAP

### React Components Tree
```
<App>
├── Header (responsive nav)
├── Main Routes
│   ├── HomePage
│   ├── CoursesPage
│   ├── CourseDetailPage
│   ├── CourseLearningPage
│   │   └── EnhancedVideoPlayer ⭐
│   ├── UserDashboard
│   ├── AuthComponent
│   │   ├── Standard form
│   │   └── OAuthEmailComponent
│   ├── EmailVerificationComponent
│   └── AdminLoginPage
├── Footer
└── Dark Mode Toggle
```

### Data Flow
```
database.js (Mock Data)
    ↓
CourseLearningPage
    ├── EnhancedVideoPlayer
    ├── UserDashboard
    └── AuthComponent

Eventually:
Backend API (server.js)
    ↓
Database (MySQL)
```

---

## 🚀 USAGE STATISTICS

### Line Count
```
CourseLearningPage.jsx: 381 lines
EnhancedVideoPlayer.jsx: 600+ lines
App.jsx: 480 lines
database.js: 1200+ lines
server/server.js: 200+ lines
```

### Component Count
```
Total Components: 8
Active: 8 ✅
Deprecated: 1 ❌
```

### Routes Count
```
Total Routes: 8
Active: 8 ✅
```

---

## 💡 DEVELOPER NOTES

### Frontend Stack
```
✅ React 18.3 (UI library)
✅ Vite 5 (bundler)
✅ Tailwind CSS (styling)
✅ Framer Motion (animations)
✅ React Router v6 (routing)
```

### Backend Stack
```
✅ Node.js / Express 5 (server)
✅ Sequelize 6 (ORM)
✅ MySQL (database)
✅ CORS enabled
```

### Recommended Cleanup
```
1. Delete src/VideoPlayer.jsx
2. Delete old documentation files
3. Keep components/* folder organized
4. Organize utilities in separate folder (future)
```

### Next Tasks
```
1. Create API integration layer
   └── src/api/courseApi.js
   └── src/api/authApi.js
   └── src/api/userApi.js

2. Create custom hooks
   └── src/hooks/useCourses.js
   └── src/hooks/useAuth.js

3. Add error boundaries

4. Add loading states

5. Setup testing with Jest
```

---

## 📞 File Dependency Quick Reference

```
Need user data?
→ UserDashboard.jsx or database.js

Need to add new course?
→ database.js (add to courses array)

Need to customize video player?
→ EnhancedVideoPlayer.jsx

Need to add new route?
→ App.jsx (add Route)

Need to add new lesson?
→ database.js + EnhancedVideoPlayer.jsx

Need backend setup?
→ server/server.js & server/db/database.js

Need styling?
→ Tailwind CSS classes (index.css + components)
```

Happy coding! 🎉
