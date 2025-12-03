import express from "express";
import {
  enrollUserInCourse,
  getUserEnrollments,
  markLessonComplete,
  getEnrollmentProgress,
} from "../controllers/enrollmentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/enroll", authMiddleware, enrollUserInCourse);
router.get("/", authMiddleware, getUserEnrollments);
router.post("/mark-complete", authMiddleware, markLessonComplete);
router.get("/progress/:courseId", authMiddleware, getEnrollmentProgress);

export default router;
