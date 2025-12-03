import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

// Enroll user in course
export const enrollUserInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
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
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });

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

    const enrollments = await Enrollment.find({ userId }).populate("courseId");

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

    const enrollment = await Enrollment.findOneAndUpdate(
      { userId, courseId },
      { $addToSet: { completedLessons: lessonId } },
      { new: true }
    );

    if (!enrollment) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    // Also mark in course
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $set: { "lessons.$[elem].completed": true } },
      { arrayFilters: [{ "elem.id": lessonId }], new: true }
    );

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

    const enrollment = await Enrollment.findOne({ userId, courseId });

    if (!enrollment) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    const course = await Course.findById(courseId);
    const totalLessons = course.lessons.length;
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
