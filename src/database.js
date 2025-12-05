// Database for WebDev Academy
// Menggunakan localStorage untuk data persistence

export const initializeDatabase = () => {
  // Initialize users if not exists
  if (!localStorage.getItem("webdev_users")) {
    const defaultUsers = [
      {
        id: "user-001",
        fullName: "John Developer",
        email: "john@example.com",
        password: "password123",
        enrolledCourses: ["frontend", "backend"],
        trialStatus: "active",
        trialEndDate: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        emailVerified: true,
        verificationCode: null,
        provider: "email",
        createdAt: new Date().toISOString(),
      },
      {
        id: "user-002",
        fullName: "Sarah Code",
        email: "sarah@example.com",
        password: "password456",
        enrolledCourses: ["fullstack"],
        trialStatus: "expired",
        trialEndDate: new Date(
          Date.now() - 1 * 24 * 60 * 60 * 1000
        ).toISOString(),
        emailVerified: true,
        verificationCode: null,
        provider: "email",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("webdev_users", JSON.stringify(defaultUsers));
  }

  // Initialize courses if not exists
  if (!localStorage.getItem("webdev_courses")) {
    const courses = [
      {
        id: "frontend",
        title: "Frontend Mastery",
        level: "Beginner → Intermediate",
        hours: 48,
        desc: "HTML, CSS, Modern JS, React",
        image: "🎨",
        instructor: "Ahmad Rasyid",
        rating: 4.8,
        students: 1234,
        lessons: [
          {
            id: "lesson-1-1",
            title: "Pengenalan HTML - Struktur Dasar Web",
            module: "🏗️ Struktur Web",
            content:
              "Pelajari dasar HTML, fondasi dari web development. Membuat struktur halaman yang semantik dan accessibility-friendly.",
            duration: 45,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-1-2",
            title: "CSS Styling Fundamentals - Desain Indah",
            module: "🎨 Styling & Layout",
            content:
              "Kuasai CSS untuk desain yang indah dan responsif. Flexbox, Grid, dan animasi CSS modern.",
            duration: 60,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-1-3",
            title: "JavaScript Basics - Interaktivitas & Logic",
            module: "⚙️ Programming Fundamentals",
            content:
              "Pelajari pemrograman JavaScript. Variables, functions, loops, dan DOM manipulation.",
            duration: 90,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-1",
            title: "Flexbox Layout - Layout Fleksibel Modern",
            module: "🎨 Advanced Layout",
            content:
              "Master Flexbox untuk layout 1D yang powerful. Flex container, items, dan responsive design.",
            duration: 50,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-2",
            title: "CSS Grid - Layout 2D yang Powerful",
            module: "🎨 Advanced Layout",
            content:
              "Pelajari CSS Grid untuk layout 2D yang kompleks. Template, gaps, dan real-world examples.",
            duration: 55,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-1",
            title: "Responsive Design & Mobile-First",
            module: "📱 Modern Web Design",
            content:
              "Buat website yang responsif di semua device. Media queries, breakpoints, dan mobile-first approach.",
            duration: 45,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-react-1",
            title: "React Introduction",
            module: "⚛️ Framework Modern",
            content:
              "Mulai dengan React dan component-based architecture. Hooks, state management, dan lifecycle.",
            duration: 75,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-react-2",
            title: "Advanced React Patterns",
            module: "⚛️ Framework Modern",
            content:
              "Pelajari Custom Hooks, Context API, dan Performance Optimization.",
            duration: 85,
            videoUrl: "#",
            completed: false,
          },
        ],
      },
      {
        id: "backend",
        title: "Backend & API",
        level: "Intermediate",
        hours: 40,
        desc: "Node.js, Express, Authentication, REST",
        image: "⚙️",
        instructor: "Budi Santoso",
        rating: 4.7,
        students: 856,
        lessons: [
          {
            id: "lesson-2-1",
            title: "Node.js Fundamentals",
            module: "🔧 Runtime & Environment",
            content:
              "Pengenalan Node.js runtime dan environment setup. Event loop, streams, dan buffer.",
            duration: 50,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-2",
            title: "Express.js Framework",
            module: "🚀 Web Framework",
            content:
              "Bangun web applications dengan Express.js. Routing, middleware, dan error handling.",
            duration: 80,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-3",
            title: "RESTful APIs",
            module: "🔌 API Development",
            content:
              "Desain dan implementasikan RESTful APIs. HTTP methods, status codes, dan best practices.",
            duration: 100,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-4",
            title: "Authentication & Security",
            module: "🔐 Security",
            content:
              "Implementasikan sistem autentikasi yang aman. JWT, password hashing, dan CORS.",
            duration: 85,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-5",
            title: "Database Integration",
            module: "📊 Database",
            content:
              "Integrasikan database dengan Express. MySQL, MongoDB, dan query optimization.",
            duration: 95,
            videoUrl: "#",
            completed: false,
          },
        ],
      },
      {
        id: "fullstack",
        title: "Fullstack Project",
        level: "Intermediate → Advanced",
        hours: 60,
        desc: "End-to-end product: DB, API, Frontend",
        image: "🚀",
        instructor: "Cindy Wijaya",
        rating: 4.9,
        students: 567,
        lessons: [
          {
            id: "lesson-3-1",
            title: "Project Planning & Architecture",
            module: "📋 Planning",
            content:
              "Rencanakan dan desain aplikasi fullstack lengkap. Database design, API structure, dan UI/UX planning.",
            duration: 60,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-2",
            title: "Database Schema Design",
            module: "📊 Database",
            content:
              "Desain schema database yang efisien. Normalization, relationships, dan indexing.",
            duration: 75,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-3",
            title: "API Development with Express",
            module: "🚀 Backend",
            content:
              "Kembangkan robust backend APIs. CRUD operations, validation, dan error handling.",
            duration: 90,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-4",
            title: "Frontend Integration & State Management",
            module: "⚛️ Frontend",
            content:
              "Integrasikan frontend dengan backend APIs. Redux, Context API, dan data fetching.",
            duration: 95,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-5",
            title: "Testing & Quality Assurance",
            module: "✅ Testing",
            content:
              "Implementasikan unit testing, integration testing, dan E2E testing.",
            duration: 80,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-6",
            title: "Deployment & DevOps",
            module: "🚀 Deployment",
            content:
              "Deploy aplikasi fullstack Anda. Docker, CI/CD pipelines, dan monitoring.",
            duration: 85,
            videoUrl: "#",
            completed: false,
          },
        ],
      },
      {
        id: "devops",
        title: "DevOps Essentials",
        level: "Intermediate",
        hours: 18,
        desc: "CI/CD, Docker, Deployment",
        image: "🐳",
        instructor: "Dedi Kusuma",
        rating: 4.6,
        students: 432,
        lessons: [
          {
            id: "lesson-4-1",
            title: "DevOps Principles & Best Practices",
            module: "🔧 Concepts",
            content:
              "Pahami prinsip DevOps dan best practices. Collaboration, automation, dan continuous improvement.",
            duration: 40,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-4-2",
            title: "Docker Containerization",
            module: "🐳 Containerization",
            content:
              "Kontainerisasi aplikasi dengan Docker. Dockerfile, images, containers, dan registries.",
            duration: 65,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-4-3",
            title: "CI/CD Pipelines",
            module: "🚀 Automation",
            content:
              "Setup continuous integration dan deployment. GitHub Actions, Jenkins, dan GitLab CI.",
            duration: 80,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-4-4",
            title: "Infrastructure & Monitoring",
            module: "📊 Infrastructure",
            content:
              "Manage infrastructure dan monitoring. Kubernetes basics, logging, dan alerting.",
            duration: 70,
            videoUrl: "#",
            completed: false,
          },
        ],
      },
    ];
    localStorage.setItem("webdev_courses", JSON.stringify(courses));
  }

  // Initialize enrollments if not exists
  if (!localStorage.getItem("webdev_enrollments")) {
    const enrollments = [];
    localStorage.setItem("webdev_enrollments", JSON.stringify(enrollments));
  }
};

// User functions
export const getUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem("webdev_users") || "[]");
  return users.find((u) => u.email === email);
};

export const getUserById = (id) => {
  const users = JSON.parse(localStorage.getItem("webdev_users") || "[]");
  return users.find((u) => u.id === id);
};

export const enrollUserInCourse = (userId, courseId) => {
  const users = JSON.parse(localStorage.getItem("webdev_users") || "[]");
  const user = users.find((u) => u.id === userId);

  if (user && !user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
    localStorage.setItem("webdev_users", JSON.stringify(users));
    return true;
  }
  return false;
};

export const isUserEnrolled = (userId, courseId) => {
  const user = getUserById(userId);
  return user && user.enrolledCourses.includes(courseId);
};

export const isTrialActive = (userId) => {
  const user = getUserById(userId);
  if (!user) return false;

  if (user.trialStatus === "active") {
    const endDate = new Date(user.trialEndDate);
    if (endDate > new Date()) {
      return true;
    } else {
      // Expire trial if date has passed
      user.trialStatus = "expired";
      const users = JSON.parse(localStorage.getItem("webdev_users") || "[]");
      const index = users.findIndex((u) => u.id === userId);
      if (index !== -1) {
        users[index] = user;
        localStorage.setItem("webdev_users", JSON.stringify(users));
      }
      return false;
    }
  }
  return false;
};

export const getTrialDaysRemaining = (userId) => {
  const user = getUserById(userId);
  if (!user || user.trialStatus !== "active") return 0;

  const endDate = new Date(user.trialEndDate);
  const now = new Date();
  const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
  return Math.max(0, daysRemaining);
};

// Course functions
export const getAllCourses = () => {
  return JSON.parse(localStorage.getItem("webdev_courses") || "[]");
};

export const getCourseById = (courseId) => {
  const courses = getAllCourses();
  return courses.find((c) => c.id === courseId);
};

export const getCoursesByUserEnrollment = (userId) => {
  const user = getUserById(userId);
  if (!user) return [];

  const courses = getAllCourses();
  return courses.filter((c) => user.enrolledCourses.includes(c.id));
};

// Lesson functions
export const getLessonByCourseAndLessonId = (courseId, lessonId) => {
  const course = getCourseById(courseId);
  if (!course) return null;

  return course.lessons.find((l) => l.id === lessonId);
};

export const markLessonAsCompleted = (courseId, lessonId) => {
  const courses = getAllCourses();
  const course = courses.find((c) => c.id === courseId);

  if (course) {
    const lesson = course.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      lesson.completed = true;
      localStorage.setItem("webdev_courses", JSON.stringify(courses));
      return true;
    }
  }
  return false;
};

export const getCourseProgress = (courseId) => {
  const course = getCourseById(courseId);
  if (!course) return 0;

  const totalLessons = course.lessons.length;
  const completedLessons = course.lessons.filter((l) => l.completed).length;

  return totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
};

// Email verification functions
export const generateVerificationCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const sendVerificationEmail = (email, fullName) => {
  // Simulate sending verification email
  const code = generateVerificationCode();

  // In real app, you would send via email service
  console.log(`Verification code for ${fullName} (${email}): ${code}`);

  // Store verification code in localStorage temporarily
  const verificationCodes = JSON.parse(
    localStorage.getItem("webdev_verification_codes") || "{}"
  );
  verificationCodes[email] = {
    code: code,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  };
  localStorage.setItem(
    "webdev_verification_codes",
    JSON.stringify(verificationCodes)
  );

  return code;
};

export const verifyEmail = (email, code) => {
  const verificationCodes = JSON.parse(
    localStorage.getItem("webdev_verification_codes") || "{}"
  );

  if (!verificationCodes[email]) {
    return { success: false, message: "No verification code found" };
  }

  const { code: storedCode, expiresAt } = verificationCodes[email];

  if (Date.now() > expiresAt) {
    delete verificationCodes[email];
    localStorage.setItem(
      "webdev_verification_codes",
      JSON.stringify(verificationCodes)
    );
    return { success: false, message: "Verification code expired" };
  }

  if (storedCode !== code) {
    return { success: false, message: "Invalid verification code" };
  }

  // Update user email verified status
  const users = JSON.parse(localStorage.getItem("webdev_users") || "[]");
  const user = users.find((u) => u.email === email);

  if (user) {
    user.emailVerified = true;
    user.verificationCode = null;
    localStorage.setItem("webdev_users", JSON.stringify(users));
  }

  delete verificationCodes[email];
  localStorage.setItem(
    "webdev_verification_codes",
    JSON.stringify(verificationCodes)
  );

  return { success: true, message: "Email verified successfully" };
};

export const isEmailVerified = (email) => {
  const users = JSON.parse(localStorage.getItem("webdev_users") || "[]");
  const user = users.find((u) => u.email === email);
  return user ? user.emailVerified : false;
};

// Initialize database on import
initializeDatabase();
