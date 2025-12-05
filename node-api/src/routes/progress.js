const express = require("express");
const router = express.Router();
const {
  getProgress,
  saveProgress,
} = require("../controllers/progressController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/:lessonId", authenticate, getProgress);
router.post("/:lessonId", authenticate, saveProgress);

module.exports = router;
