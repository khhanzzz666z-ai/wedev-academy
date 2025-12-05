const express = require("express");
const router = express.Router();
const { summarize, ask } = require("../controllers/aiController");
const { authenticate } = require("../middleware/authMiddleware");

// Keep AI endpoints protected - require auth
router.post("/summarize", authenticate, summarize);
router.post("/ask", authenticate, ask);

module.exports = router;
