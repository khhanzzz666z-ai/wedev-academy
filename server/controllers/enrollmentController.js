import Enrollment from "../models/enrollment.js";
import User from "../models/user.js";
import Course from "../models/course.js";

// Enroll user in course
export const enrollUserInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ success: false, message: "Already enrolled in this course" });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      completedLessons: [],
      progress: 0,
    });

    // Add course to user's enrolled courses
    // No direct relation for enrolledCourses in Sequelize models; skip or implement relation later
    // Optionally, we could create a join table. For now, keep enrollment as the source of truth.

    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user enrollments
export const getUserEnrollments = async (req, res) => {
  try {
    const userId = req.userId;

    const enrollments = await Enrollment.findAll({ where: { userId } });
    // Attach course data
    const result = await Promise.all(
      enrollments.map(async (e) => {
        const course = await Course.findByPk(e.courseId);
        return { ...e.dataValues, course };
      })
    );

    res.json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark lesson as completed in enrollment
export const markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const userId = req.userId;

    const enrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });
    if (!enrollment) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    const completed = enrollment.completedLessons || [];
    if (!completed.includes(lessonId)) completed.push(lessonId);
    await enrollment.update({ completedLessons: completed });

    if (!enrollment) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    // Also mark in course
    // Also mark in course JSON
    const course = await Course.findByPk(courseId);
    if (course) {
      const lessons = course.lessons || [];
      const idx = lessons.findIndex((l) => l.id === lessonId);
      if (idx !== -1) {
        lessons[idx].completed = true;
        await course.update({ lessons });
      }
    }

    res.json({
      success: true,
      message: "Lesson marked as completed",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get enrollment progress
export const getEnrollmentProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const enrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });

    if (!enrollment) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    const course = await Course.findByPk(courseId);
    const totalLessons =
      (course && course.lessons && course.lessons.length) || 0;
    const completedLessons = enrollment.completedLessons.length;
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
