import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import enrollmentRoutes from "./routes/enrollments.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
let mongoConnected = false;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    mongoConnected = true;
    console.log("✓ MongoDB connected");
  })
  .catch((err) => {
    mongoConnected = false;
    console.log("⚠ MongoDB not available, using local data");
    console.log("  To connect MongoDB:");
    console.log("  1. Install MongoDB locally OR");
    console.log("  2. Use MongoDB Atlas cloud (get free tier at mongodb.com)");
    console.log("  3. Update MONGODB_URI in .env file");
  });

// Add MongoDB status to app
app.locals.mongoConnected = mongoConnected;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server running",
    mongodb: mongoConnected ? "connected" : "not connected",
    timestamp: new Date(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API endpoint: http://localhost:${PORT}/api`);
});
