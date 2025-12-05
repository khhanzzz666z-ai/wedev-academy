const { Course, Lesson, LessonProgress, Enrollment } = require("../models");

// Returns per-course progress summary for the authenticated user
const myProgressSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.findAll({
      where: { userId },
      include: [
        {
          model: Course,
          as: "course",
          include: [{ model: Lesson, as: "lessons" }],
        },
      ],
    });

    const summary = await Promise.all(
      enrollments.map(async (en) => {
        const course = en.course;
        const lessons = course.lessons || [];
        // fetch progress for each lesson
        const progresses = await Promise.all(
          lessons.map(async (lesson) => {
            const p = await LessonProgress.findOne({
              where: { userId, lessonId: lesson.id },
            });
            return {
              lessonId: lesson.id,
              progress: p ? p.progress : 0,
              currentStep: p ? p.currentStep : 0,
            };
          })
        );

        const total = lessons.length;
        const completed = progresses.filter((p) => p.progress >= 100).length;
        const percent =
          total === 0
            ? 0
            : Math.round(
                (progresses.reduce((a, b) => a + b.progress, 0) /
                  (total * 100)) *
                  100
              );

        return {
          courseId: course.id,
          title: course.title,
          totalLessons: total,
          completedLessons: completed,
          percentComplete: percent,
        };
      })
    );

    res.json({ ok: true, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { myProgressSummary };
