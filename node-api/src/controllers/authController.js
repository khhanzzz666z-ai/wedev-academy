const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {
  validateAuthRegister,
  validateAuthLogin,
} = require("../utils/validation");

const register = async (req, res) => {
  try {
    const errors = validateAuthRegister(req.body);
    if (Object.keys(errors).length > 0)
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors });

    const { fullname, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ fullname, email, password: hash });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    res.json({
      ok: true,
      token,
      user: { id: user.id, email: user.email, fullname: user.fullname },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const errors = validateAuthLogin(req.body);
    if (Object.keys(errors).length > 0)
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors });

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    res.json({
      ok: true,
      token,
      user: { id: user.id, email: user.email, fullname: user.fullname },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const verifyToken = async (req, res) => {
  res.json({ ok: true, user: req.user });
};

module.exports = { register, login, verifyToken };
