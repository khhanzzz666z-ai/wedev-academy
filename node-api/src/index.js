require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const {
  generalLimiter,
  authLimiter,
  aiLimiter,
} = require("./middleware/rateLimiter");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const progressRoutes = require("./routes/progress");
const dashboardRoutes = require("./routes/dashboard");
const aiRoutes = require("./routes/ai");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" })); // Limit payload size
app.use(generalLimiter); // Apply rate limiting globally

app.get("/", (req, res) =>
  res.json({ ok: true, msg: "Wedev Academy Node API v1.0" })
);
app.use("/api/auth", authLimiter, authRoutes); // Stricter limit for auth
app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/ai", aiLimiter, aiRoutes); // Stricter limit for AI

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection OK");
    await sequelize.sync();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
}

start();
