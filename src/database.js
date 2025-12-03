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
            title: "Introduction to HTML",
            content:
              "Learn the basics of HTML, the foundation of web development.",
            duration: 45,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-1-2",
            title: "CSS Styling Fundamentals",
            content: "Master CSS for beautiful and responsive designs.",
            duration: 60,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-1-3",
            title: "JavaScript Basics",
            content: "Learn JavaScript programming essentials.",
            duration: 90,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-1-4",
            title: "React Introduction",
            content: "Get started with React and component-based architecture.",
            duration: 75,
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
            content: "Introduction to Node.js runtime and environment setup.",
            duration: 50,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-2",
            title: "Express.js Framework",
            content: "Build web applications with Express.js.",
            duration: 80,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-3",
            title: "RESTful APIs",
            content: "Design and implement RESTful APIs.",
            duration: 100,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-4",
            title: "Authentication & Security",
            content: "Implement secure authentication systems.",
            duration: 85,
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
            title: "Project Planning",
            content: "Plan and design a complete fullstack application.",
            duration: 60,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-2",
            title: "Database Design",
            content: "Design efficient database schemas.",
            duration: 75,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-3",
            title: "API Development",
            content: "Develop robust backend APIs.",
            duration: 90,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-4",
            title: "Frontend Integration",
            content: "Integrate frontend with backend APIs.",
            duration: 95,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-5",
            title: "Deployment",
            content: "Deploy your fullstack application.",
            duration: 70,
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
            title: "Introduction to DevOps",
            content: "Understand DevOps principles and practices.",
            duration: 40,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-4-2",
            title: "Docker Basics",
            content: "Containerize applications with Docker.",
            duration: 65,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-4-3",
            title: "CI/CD Pipelines",
            content: "Set up continuous integration and deployment.",
            duration: 80,
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
