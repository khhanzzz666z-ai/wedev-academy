import express from "express";
import {
  getAllCourses,
  getCourseById,
  markLessonComplete,
  getCourseProgress,
  initializeCourses,
} from "../controllers/courseController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/init", initializeCourses);
router.get("/:id", getCourseById);
router.post("/mark-complete", authMiddleware, markLessonComplete);
router.get("/progress/:courseId", authMiddleware, getCourseProgress);

export default router;
