import express from "express";
import {
  register,
  verifyEmail,
  login,
  oauthLogin,
  getProfile,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/oauth-login", oauthLogin);
router.get("/profile", authMiddleware, getProfile);

export default router;
