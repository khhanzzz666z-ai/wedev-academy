const express = require("express");
const router = express.Router();
const { myProgressSummary } = require("../controllers/dashboardController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/me/progress", authenticate, myProgressSummary);

module.exports = router;
