# 🚀 DEVELOPER GUIDE & FILE REFERENCE

📁 FOLDER ORGANIZATION
──────────────────────

/src
├── 📂 components/
│ ├── 📂 auth/
│ │ ├── AuthComponent.jsx ✅ Login/Register UI
│ │ └── OAuthEmailComponent.jsx ✅ OAuth with Real Account Validation
│ ├── 📂 dashboard/
│ │ └── UserDashboard.jsx ✅ User Stats & Progress
│ └── 📂 learning/
│ ├── EnhancedVideoPlayer.jsx ⭐ MAIN VIDEO PLAYER
│ └── VideoPlayer.jsx ⚠️ DEPRECATED
│
├── 📂 pages/ 📍 (untuk future: page components)
├── 📂 utils/ 📍 (untuk future: helper functions)
│
├── App.jsx ✅ Main Router
├── CourseLearningPage.jsx ✅ Learning Page with Video
├── UserDashboard.jsx ✅ User Dashboard
├── AuthComponent.jsx ✅ Auth Page
├── database.js ✅ Course Data & Mock DB
├── main.jsx ✅ Vite Entry Point
└── index.css ✅ Global Styles

/server
├── server.js ✅ Express Backend
├── 📂 config/
│ └── sequelize.js ✅ Database Config
└── 📂 models/ 📍 (untuk future: Sequelize models)

📋 FILE USAGE GUIDE
───────────────────

✅ ACTIVE & MAINTAINED FILES:

1. src/EnhancedVideoPlayer.jsx
   Purpose: Main video learning component
   Used By: CourseLearningPage.jsx
   Features:

   - 5-step learning structure (Intro → Foundation → Techniques → Advanced → Summary)
   - Play/pause controls
   - Step navigation buttons
   - Code examples viewer
   - Progress tracking
   - Fullscreen support
   - Responsive design

   Props:

   - lesson (object): Lesson data with id, title, duration, module
   - dark (boolean): Dark mode toggle
   - courseId (string): Course identifier

   Key Functions:

   - getLearningStructure(lessonId): Returns lesson-specific learning steps
   - handleStepClick(stepIndex): Navigate to specific step

   Lessons Implemented:

   - lesson-1-1: HTML Basics (5 steps)
   - lesson-1-2: CSS Styling (5 steps)
   - More lessons can be added to getLearningStructure()

---

2. src/CourseLearningPage.jsx
   Purpose: Main course learning interface
   Used By: App.jsx (route: /course-learn/:courseId)
   Features:

   - Integrates EnhancedVideoPlayer
   - Module-based lesson sidebar
   - Lesson progress tracking
   - Module grouping (getLessonsByModule)
   - Lesson completion marking
   - Navigation buttons (back, next, home)

   State:

   - course: Current course data
   - currentLesson: Active lesson
   - selectedLessonId: Selected lesson ID
   - progress: Course completion percentage

   Key Functions:

   - getLessonsByModule(lessons): Groups lessons by module property
   - handleSelectLesson(lessonId): Switch to different lesson
   - handleMarkComplete(): Mark lesson as completed
   - handleNextLesson(): Auto-advance to next lesson

---

3. src/database.js
   Purpose: Mock database with course and lesson data
   Usage: Imported by CourseLearningPage, UserDashboard, App

   Data Structure:

   - Users: Array of user objects with email, password
   - Courses: 4 main courses with lesson arrays
   - UserCourses: User enrollment tracking

   Each Lesson has:

   - id: Unique identifier (e.g., "lesson-1-1")
   - title: Display title
   - module: Module emoji + name (e.g., "🏗️ Struktur Web")
   - duration: Minutes per lesson
   - content: Description text
   - completed: Boolean flag

   Key Functions:

   - getCourseById(id): Get course with all lessons
   - getCourseByCourse(courseId, lessonId): Get specific lesson
   - markLessonAsCompleted(courseId, lessonId): Update completion
   - getCourseProgress(courseId): Calculate % complete
   - enrollUserInCourse(userId, courseId): Add enrollment
   - getUserCourses(userId): Get all user's courses

   Courses:

   1. Frontend Mastery (5 lessons)
   2. Backend & API (5 lessons)
   3. Fullstack Project (6 lessons)
   4. DevOps Essentials (4 lessons)

---

4. src/App.jsx
   Purpose: Main router and layout component
   Features:

   - Route definitions
   - Responsive header with navigation
   - Dark mode support
   - User authentication state

   Routes:

   - /: Home page (course list)
   - /courses: All courses
   - /course/:id: Course detail page
   - /course-learn/:courseId: Learning interface
   - /dashboard: User dashboard
   - /auth: Login/Register
   - /admin: Admin login

   Props passed to children:

   - dark: Dark mode state
   - onNavigate: Navigation function
   - currentUser: User object

---

5. src/components/auth/AuthComponent.jsx
   Purpose: Login and registration form
   Features:

   - Email validation (checks if registered)
   - Specific error messages
   - OAuth integration
   - Helper text and guidance
   - Form validation

   Validation:

   - Login email: Must exist in database
   - Register email: Can be new
   - Password: Required fields

   OAuth:

   - Google OAuth support
   - GitHub OAuth support
   - Email validation via OAuthEmailComponent

---

6. src/components/auth/OAuthEmailComponent.jsx
   Purpose: OAuth user validation
   Features:

   - Real email domain validation
   - Name format validation (2+ words)
   - Real account checking

   Validation Rules:

   - Email domains: gmail, yahoo, outlook, hotmail, icloud, mail, protonmail, tutanota, yandex
   - Name: Minimum 2 words, each 2+ characters, no leading numbers

   Key Functions:

   - validateRealEmail(email): Check if email is from real provider
   - validateRealName(name): Check if name follows rules

---

7. src/components/dashboard/UserDashboard.jsx
   Purpose: Display user learning progress and stats
   Features:

   - Course enrollment stats
   - Learning progress visualization
   - Lesson completion tracking
   - Achievement badges
   - Trial period countdown
   - Home navigation button

   Displays:

   - Total courses enrolled
   - Total lessons completed
   - Achievements unlocked
   - Trial days remaining
   - Enrolled courses with progress bars

---

8. server/server.js
   Purpose: Express.js backend server
   Features:

   - API routes for auth, courses, enrollments
   - MySQL database with Sequelize ORM
   - Auto-sync on startup
   - Runs on port 5000

   API Routes:

   - GET /api/health: Server health check
   - POST /api/auth/login: User login
   - POST /api/auth/register: User registration
   - GET /api/courses: Get all courses
   - GET /api/courses/:id: Get course by ID
   - POST /api/enrollments: Enroll in course
   - GET /api/enrollments/:userId: Get user enrollments

---

9. server/config/sequelize.js
   Purpose: Sequelize ORM configuration
   Features:

   - MySQL connection
   - Model definitions
   - Database auto-sync

   Models:

   - User: id, email, password, fullName, createdAt
   - Course: id, title, description, instructor, hours
   - Enrollment: id, userId, courseId, progress, completedAt
   - VerificationCode: id, email, code, expiresAt

---

10. src/index.css
    Purpose: Global Tailwind CSS styles
    Features:
    - Tailwind CSS configuration
    - Global theme colors
    - Dark mode support via Tailwind classes
    - Responsive utilities

---

⚠️ DEPRECATED FILES:

1. src/VideoPlayer.jsx
   ❌ DO NOT USE - Use EnhancedVideoPlayer instead
   Reason: Outdated video player without learning structure
   Replacement: EnhancedVideoPlayer.jsx

---

📚 IMPLEMENTATION CHECKLIST
───────────────────────────

✅ Frontend Structure:
✓ Responsive layout with Tailwind CSS
✓ Mobile-first design approach
✓ Dark mode support
✓ Component-based architecture
✓ Proper imports and exports

✅ Learning System:
✓ Video player with step-by-step learning
✓ Module-based content organization
✓ Progress tracking
✓ Lesson completion marking
✓ Learning summary display

✅ Authentication:
✓ Email/password login
✓ User registration
✓ Email validation
✓ OAuth integration (Google/GitHub)
✓ Real account validation

✅ Backend:
✓ Express server running
✓ MySQL database with Sequelize
✓ API endpoints
✓ Auto-database sync

✅ Documentation:
✓ Project structure documented
✓ File usage guide created
✓ Learning guide available
✓ Developer reference ready

🔲 Pending Implementation:

- Video hosting (YouTube/Vimeo)
- Quiz/assessment system
- Certificate generation
- Payment processing (Stripe)
- Advanced analytics
- Live coaching sessions

🎯 QUICK START FOR DEVELOPERS
──────────────────────────────

1. Adding New Lesson to Video Player:

   - Edit EnhancedVideoPlayer.jsx
   - Find getLearningStructure function
   - Add new lessonId case with 5 steps
   - Structure: { title, subtitle, content, code, duration, keyPoints }
   - Export and test

2. Adding New Course:

   - Edit database.js
   - Add course object to courses array
   - Create lessons array with lesson objects
   - Each lesson must have: id, title, module, duration, content
   - Import course in CourseLearningPage if needed

3. Styling Changes:

   - Use Tailwind CSS classes
   - Responsive breakpoints: sm, md, lg, xl
   - Dark mode: dark: prefix for dark mode styles
   - Example: bg-white dark:bg-slate-800

4. State Management:

   - Currently using React useState
   - Consider Context API or Redux for larger app
   - Props drilling acceptable for now (small app)

5. Backend API Integration:
   - API endpoints ready in server.js
   - Use fetch or axios in components
   - Current: Using localStorage (mock)
   - Future: Replace with API calls

🔧 COMMON TASKS
───────────────

Add New Video Content:

1. Open EnhancedVideoPlayer.jsx
2. Find getLearningStructure(lessonId)
3. Add new lesson-id case
4. Fill in 5 steps with content and code examples
5. Test by navigating to lesson

Fix Styling Issues:

1. Check class names (Tailwind)
2. Verify responsive breakpoints
3. Test on mobile (DevTools)
4. Use dark: prefix for dark mode

Update Course Progress:

1. Edit database.js
2. Modify markLessonAsCompleted()
3. Or update getCourseProgress()
4. Test in CourseLearningPage

Add New Page:

1. Create component in src/pages/
2. Add route in App.jsx
3. Import component
4. Add routing logic
5. Update navigation

📞 SUPPORT & REFERENCES
───────────────────────

Tailwind CSS: https://tailwindcss.com/docs
Framer Motion: https://www.framer.com/motion/
React: https://react.dev
Vite: https://vitejs.dev
Express: https://expressjs.com
Sequelize: https://sequelize.org
