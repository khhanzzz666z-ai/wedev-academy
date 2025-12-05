const express = require("express");
const rateLimit = require("express-rate-limit");

// General API rate limiter: 100 req/15min per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter: 5 req/15min per IP (stricter for auth endpoints)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many auth attempts from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// AI endpoint limiter: 10 req/hour per user
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => {
    return req.user?.id || req.ip; // use user ID if authenticated, else IP
  },
  message: "Too many AI requests. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, authLimiter, aiLimiter };
