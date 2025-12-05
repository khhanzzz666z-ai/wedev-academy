import express from "express";
import { sequelize, syncDb } from "./models/index.js";
import { ensureDatabaseExists } from "./config/sequelize.js";
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

// Initialize database and connect
let mysqlConnected = false;
app.locals.mysqlConnected = false;

(async () => {
  try {
    // Ensure database exists
    await ensureDatabaseExists();

    // Try MySQL (Sequelize) connection and sync models
    await sequelize.authenticate();
    mysqlConnected = true;
    app.locals.mysqlConnected = true;
    console.log("✓ MySQL (Sequelize) connected successfully");

    await syncDb();
    console.log("✓ Sequelize models synced");
  } catch (err) {
    mysqlConnected = false;
    app.locals.mysqlConnected = false;
    console.log("⚠ MySQL connection or sync failed (server will still run)");
    console.log(`  Error: ${err.message}`);
  }
})();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server running",
    db: {
      mysql: app.locals.mysqlConnected ? "connected" : "not connected",
    },
    timestamp: new Date(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API endpoint: http://localhost:${PORT}/api`);
});
