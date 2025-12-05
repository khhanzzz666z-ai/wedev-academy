import Course from "../models/course.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark lesson as completed
export const markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const lessons = course.lessons || [];
    const idx = lessons.findIndex((l) => l.id === lessonId);
    if (idx === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }

    lessons[idx].completed = true;
    await course.update({ lessons });

    res.json({
      success: true,
      message: "Lesson marked as completed",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get course progress
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const totalLessons = course.lessons.length;
    const completedLessons = course.lessons.filter((l) => l.completed).length;
    const progress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    res.json({
      success: true,
      data: {
        courseId,
        totalLessons,
        completedLessons,
        progress,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Initialize sample courses (for setup)
export const initializeCourses = async (req, res) => {
  try {
    // Check if courses exist
    const existingCourses = await Course.count();
    if (existingCourses > 0) {
      return res.json({
        success: true,
        message: "Courses already initialized",
      });
    }

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
            content:
              "Build APIs with Express.js - routing, middleware, and more.",
            duration: 65,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-2-3",
            title: "Authentication & Security",
            content: "Implement JWT, OAuth, and secure your APIs.",
            duration: 80,
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
        instructor: "Citra Developer",
        rating: 4.9,
        students: 654,
        lessons: [
          {
            id: "lesson-3-1",
            title: "Project Setup",
            content: "Setup a complete fullstack project structure.",
            duration: 45,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-2",
            title: "Building the API",
            content: "Create RESTful API endpoints for the project.",
            duration: 90,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-3",
            title: "Frontend Integration",
            content: "Connect frontend to backend API with error handling.",
            duration: 75,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-3-4",
            title: "Deployment",
            content: "Deploy your fullstack app to production.",
            duration: 60,
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
        instructor: "Dimas DevOps",
        rating: 4.6,
        students: 432,
        lessons: [
          {
            id: "lesson-4-1",
            title: "Introduction to Docker",
            content: "Containerize applications with Docker.",
            duration: 60,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-4-2",
            title: "CI/CD Pipelines",
            content: "Setup automated testing and deployment pipelines.",
            duration: 75,
            videoUrl: "#",
            completed: false,
          },
          {
            id: "lesson-4-3",
            title: "Kubernetes Basics",
            content: "Orchestrate containers with Kubernetes.",
            duration: 70,
            videoUrl: "#",
            completed: false,
          },
        ],
      },
    ];

    await Promise.all(courses.map((c) => Course.create({ ...c })));

    res.json({
      success: true,
      message: "Courses initialized successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
