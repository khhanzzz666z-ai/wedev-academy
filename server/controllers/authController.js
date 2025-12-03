import User from "../models/User.js";
import VerificationCode from "../models/VerificationCode.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate verification code
export const generateVerificationCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Send verification email (simulate)
export const sendVerificationEmail = async (email, fullName) => {
  const code = generateVerificationCode();

  try {
    // Save verification code to DB
    await VerificationCode.create({
      email,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // In production, send via email service (SendGrid, AWS SES, etc)
    console.log(`Verification code for ${fullName} (${email}): ${code}`);

    return { success: true, code, message: "Verification code sent" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Register user
export const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords don't match" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      emailVerified: false,
      provider: "email",
    });

    // Send verification code
    const verificationResult = await sendVerificationEmail(email, fullName);

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify email.",
      data: {
        userId: user._id,
        email: user.email,
        code: verificationResult.code, // For demo purposes only
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Email and code required" });
    }

    // Find verification code
    const verCode = await VerificationCode.findOne({
      email: email.toLowerCase(),
      code,
    });

    if (!verCode) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }

    // Update user
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { emailVerified: true, verificationCode: null },
      { new: true }
    );

    // Delete verification code
    await VerificationCode.deleteOne({ _id: verCode._id });

    res.json({
      success: true,
      message: "Email verified successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check email verified
    if (!user.emailVerified && user.provider === "email") {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Compare password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// OAuth Login/Register
export const oauthLogin = async (req, res) => {
  try {
    const { email, fullName, provider } = req.body;

    if (!email || !fullName || !provider) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email, fullName, and provider required",
        });
    }

    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        fullName,
        provider,
        emailVerified: true,
        trialStatus: "active",
        trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: `Login with ${provider} successful`,
      token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("enrolledCourses");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
