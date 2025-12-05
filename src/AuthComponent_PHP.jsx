import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  loginUser,
  registerUser,
  saveUserSession,
  validateAuthForm,
} from "./api";
import OAuthEmailComponent from "./OAuthEmailComponent";

export default function AuthComponent({ dark, onNavigate, onLoginSuccess }) {
  const [mode, setMode] = useState("login"); // login atau register
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOAuthEmail, setShowOAuthEmail] = useState(false);
  const [oauthProvider, setOauthProvider] = useState(null);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  // Clear messages on mode change
  useEffect(() => {
    setError("");
    setSuccess("");
  }, [mode]);

  // ============================================
  // LOGIN HANDLER
  // ============================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi
    if (!loginForm.email || !loginForm.password) {
      setError("Email dan password harus diisi");
      return;
    }

    const errors = validateAuthForm(
      loginForm.email,
      loginForm.password,
      null,
      false
    );
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(loginForm.email, loginForm.password);

      if (result.success) {
        // Save user session
        saveUserSession(result.data);

        setSuccess("Login berhasil! Sedang redirect...");

        // Reset form
        setLoginForm({ email: "", password: "" });

        // Redirect ke dashboard
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(result.data);
          }
          if (onNavigate) {
            onNavigate("dashboard");
          }
        }, 500);
      } else {
        setError(result.message || "Login gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // REGISTER HANDLER
  // ============================================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi
    if (
      !registerForm.fullName ||
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      setError("Semua field harus diisi");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    const errors = validateAuthForm(
      registerForm.email,
      registerForm.password,
      registerForm.fullName,
      true
    );
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser(
        registerForm.email,
        registerForm.password,
        registerForm.fullName
      );

      if (result.success) {
        // Save user session
        saveUserSession(result.data);

        setSuccess("Registrasi berhasil! Sedang redirect...");

        // Reset form
        setRegisterForm({
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
        });

        // Redirect ke dashboard
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(result.data);
          }
          if (onNavigate) {
            onNavigate("dashboard");
          }
        }, 500);
      } else {
        setError(result.message || "Registrasi gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // INPUT CHANGE HANDLERS
  // ============================================
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 ${
        dark
          ? "bg-gradient-to-br from-slate-900 to-slate-800"
          : "bg-gradient-to-br from-slate-50 to-white"
      }`}
    >
      {/* OAuth Email Verification */}
      {showOAuthEmail && (
        <OAuthEmailComponent
          provider={oauthProvider}
          dark={dark}
          onSuccess={(data) => {
            saveUserSession(data);
            setShowOAuthEmail(false);
            if (onLoginSuccess) {
              onLoginSuccess(data);
            }
            if (onNavigate) {
              onNavigate("dashboard");
            }
          }}
          onClose={() => setShowOAuthEmail(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border ${
          dark
            ? "bg-slate-800/50 border-slate-700"
            : "bg-white/50 border-slate-200"
        } backdrop-blur`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {mode === "login" ? "🔐 Login" : "✨ Daftar"}
          </h1>
          <p
            className={`text-xs sm:text-sm ${
              dark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {mode === "login"
              ? "Masuk ke akun Anda"
              : "Buat akun baru untuk memulai belajar"}
          </p>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs sm:text-sm"
          >
            ❌ {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-xs sm:text-sm"
          >
            ✅ {success}
          </motion.div>
        )}

        {/* Forms */}
        {mode === "login" ? (
          // LOGIN FORM
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="your@email.com"
                className={`w-full px-4 py-2 rounded-lg text-sm border transition ${
                  dark
                    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading}
              />
              <p className="text-xs text-slate-500 mt-1">
                📧 Gunakan email yang sudah terdaftar di sistem
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">
                🔑 Password
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-lg text-sm border transition ${
                  dark
                    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading}
              />
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base"
            >
              {loading ? "Sedang login..." : "Login"}
            </motion.button>
          </form>
        ) : (
          // REGISTER FORM
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">
                👤 Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                value={registerForm.fullName}
                onChange={handleRegisterChange}
                placeholder="John Doe"
                className={`w-full px-4 py-2 rounded-lg text-sm border transition ${
                  dark
                    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                placeholder="your@email.com"
                className={`w-full px-4 py-2 rounded-lg text-sm border transition ${
                  dark
                    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">
                🔑 Password
              </label>
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-lg text-sm border transition ${
                  dark
                    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading}
              />
              <p className="text-xs text-slate-500 mt-1">
                🔒 Minimal 6 karakter
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">
                🔐 Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-lg text-sm border transition ${
                  dark
                    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading}
              />
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base"
            >
              {loading ? "Sedang mendaftar..." : "Daftar"}
            </motion.button>
          </form>
        )}

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p
            className={`text-xs sm:text-sm ${
              dark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-indigo-500 hover:text-indigo-400 font-semibold transition"
            >
              {mode === "login" ? "Daftar sekarang" : "Login"}
            </motion.button>
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div
            className={`flex-1 h-px ${dark ? "bg-slate-700" : "bg-slate-300"}`}
          />
          <span
            className={`text-xs ${dark ? "text-slate-400" : "text-slate-600"}`}
          >
            atau
          </span>
          <div
            className={`flex-1 h-px ${dark ? "bg-slate-700" : "bg-slate-300"}`}
          />
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setOauthProvider("google");
              setShowOAuthEmail(true);
            }}
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
              dark
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-slate-200 hover:bg-slate-300 text-slate-900"
            }`}
          >
            🔵 Lanjutkan dengan Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setOauthProvider("github");
              setShowOAuthEmail(true);
            }}
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
              dark
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-slate-200 hover:bg-slate-300 text-slate-900"
            }`}
          >
            ⚫ Lanjutkan dengan GitHub
          </motion.button>
        </div>

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => onNavigate("home")}
          className="w-full mt-6 py-2.5 rounded-lg font-semibold text-white bg-white/10 hover:bg-white/20 transition text-sm"
        >
          🏠 Kembali ke Home
        </motion.button>
      </motion.div>
    </div>
  );
}
