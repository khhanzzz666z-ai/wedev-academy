const { Course, Lesson } = require("../models");

const listCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: Lesson, as: "lessons" }],
    });
    res.json({ ok: true, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getCourse = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const course = await Course.findByPk(id, {
      include: [{ model: Lesson, as: "lessons" }],
    });
    if (!course) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true, course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { listCourses, getCourse };
