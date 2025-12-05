const { LessonProgress } = require("../models");

const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const lessonId = parseInt(req.params.lessonId);
    const progress = await LessonProgress.findOne({
      where: { userId, lessonId },
    });
    if (!progress) return res.json({ ok: true, progress: null });
    res.json({ ok: true, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const saveProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const lessonId = parseInt(req.params.lessonId);
    const { currentStep, progress, completedSteps } = req.body;

    let record = await LessonProgress.findOne({ where: { userId, lessonId } });
    if (!record) {
      record = await LessonProgress.create({
        userId,
        lessonId,
        currentStep,
        progress,
        completedSteps,
      });
    } else {
      record.currentStep = currentStep;
      record.progress = progress;
      record.completedSteps = completedSteps;
      await record.save();
    }

    res.json({ ok: true, progress: record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getProgress, saveProgress };
