const express = require("express");
const router = express.Router();
const { listCourses, getCourse } = require("../controllers/coursesController");

router.get("/", listCourses);
router.get("/:id", getCourse);

module.exports = router;
