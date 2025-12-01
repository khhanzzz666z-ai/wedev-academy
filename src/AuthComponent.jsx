import React, { useState } from "react";
import { motion } from "framer-motion";

const FloatingElement = ({ delay, duration, x, y, size, color, shape = "circle" }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      animate={{
        y: [y, y - 100, y],
        x: [x, x + 30, x],
        opacity: [0.1, 0.4, 0.1],
        rotate: [0, 360],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
      }}
    >
      {shape === "circle" && (
        <div
          className={`w-full h-full rounded-full blur-2xl ${color}`}
          style={{
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          }}
        />
      )}
      {shape === "square" && (
        <div
          className={`w-full h-full blur-xl ${color}`}
          style={{
            background: `linear-gradient(45deg, ${color}40, ${color}20)`,
            borderRadius: "20px",
          }}
        />
      )}
    </motion.div>
  );
};

export default function AuthComponent({ dark, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState("login"); // login or register
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const validatePassword = (password) => password.length >= 6;

  // OAuth Handlers
  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser = {
        id: Date.now(),
        fullName: "Google User " + Math.floor(Math.random() * 1000),
        email: "user@gmail.com",
        provider: "google",
      };
      localStorage.setItem("webdev_currentUser", JSON.stringify(googleUser));
      setSuccess("Login dengan Google berhasil!");
      setTimeout(() => {
        onLoginSuccess(googleUser);
        onClose();
      }, 1000);
      setLoading(false);
    }, 1500);
  };

  const handleGitHubLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const githubUser = {
        id: Date.now(),
        fullName: "GitHub User " + Math.floor(Math.random() * 1000),
        email: "user@github.com",
        provider: "github",
      };
      localStorage.setItem("webdev_currentUser", JSON.stringify(githubUser));
      setSuccess("Login dengan GitHub berhasil!");
      setTimeout(() => {
        onLoginSuccess(githubUser);
        onClose();
      }, 1000);
      setLoading(false);
    }, 1500);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!loginForm.email || !loginForm.password) {
      setError("Email dan password harus diisi");
      return;
    }

    if (!validateEmail(loginForm.email)) {
      setError("Format email tidak valid");
      return;
    }

    if (!validatePassword(loginForm.password)) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check if email exists in localStorage (from previous registration)
      const users = JSON.parse(localStorage.getItem("webdev_users") || "[]");
      const user = users.find((u) => u.email === loginForm.email);

      if (!user) {
        setError("Email atau password salah");
        setLoading(false);
        return;
      }

      if (user.password !== loginForm.password) {
        setError("Email atau password salah");
        setLoading(false);
        return;
      }

      // Login successful
      localStorage.setItem("webdev_currentUser", JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      }));

      setSuccess("Login berhasil! Selamat datang " + user.fullName);
      setLoginForm({ email: "", password: "" });
      
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 1500);

      setLoading(false);
    }, 1000);
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!registerForm.fullName || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setError("Semua field harus diisi");
      return;
    }

    if (!validateEmail(registerForm.email)) {
      setError("Format email tidak valid");
      return;
    }

    if (!validatePassword(registerForm.password)) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("webdev_users") || "[]");
      
      // Check if email already exists
      if (users.some((u) => u.email === registerForm.email)) {
        setError("Email sudah terdaftar");
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        fullName: registerForm.fullName,
        email: registerForm.email,
        password: registerForm.password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("webdev_users", JSON.stringify(users));

      setSuccess("Registrasi berhasil! Silakan login dengan akun Anda");
      setRegisterForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setMode("login");
        setSuccess("");
      }, 1500);

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative">
      {/* Animated Background Elements */}
      <div className="hidden md:block absolute -left-20 top-0 w-96 h-96 pointer-events-none overflow-hidden">
        <FloatingElement delay={0} duration={8} x={0} y={0} size={120} color="#7c3aed" shape="circle" />
        <FloatingElement delay={1} duration={10} x={50} y={100} size={80} color="#ec4899" shape="circle" />
        <FloatingElement delay={2} duration={12} x={100} y={-50} size={100} color="#06b6d4" shape="square" />
        <FloatingElement delay={0.5} duration={9} x={-30} y={150} size={60} color="#f59e0b" shape="circle" />
        <FloatingElement delay={1.5} duration={11} x={80} y={50} size={90} color="#10b981" shape="square" />
        <FloatingElement delay={2.5} duration={13} x={-50} y={200} size={70} color="#8b5cf6" shape="circle" />
      </div>

      {/* Illustration Container */}
      <div className="hidden md:flex items-center justify-center relative">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-4 shadow-2xl relative z-10 ${dark ? 'bg-gradient-to-br from-white/6 to-white/3' : 'bg-gradient-to-br from-slate-50 to-white'}`}
        >
          {/* Glass morphism effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <svg viewBox="0 0 600 360" className="w-64 h-auto relative z-20">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Main rounded rect with gradient */}
            <rect
              x="20"
              y="20"
              rx="18"
              width="560"
              height="240"
              fill="url(#grad1)"
              filter="url(#glow)"
              opacity="0.8"
            />
            
            {/* Animated elements inside the box */}
            <g>
              {/* Animated dot 1 */}
              <motion.circle
                cx="100"
                cy="100"
                r="8"
                fill="#7c3aed"
                animate={{
                  cy: [100, 120, 100],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Animated dot 2 */}
              <motion.circle
                cx="300"
                cy="80"
                r="6"
                fill="#ec4899"
                animate={{
                  cy: [80, 60, 80],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Animated dot 3 */}
              <motion.circle
                cx="500"
                cy="110"
                r="7"
                fill="#06b6d4"
                animate={{
                  cy: [110, 130, 110],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              />
              
              {/* Animated lines */}
              <motion.line
                x1="80"
                y1="160"
                x2="520"
                y2="160"
                stroke="#7c3aed"
                strokeWidth="2"
                opacity="0.4"
                animate={{
                  strokeDasharray: [0, 400],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.line
                x1="80"
                y1="190"
                x2="400"
                y2="190"
                stroke="#ec4899"
                strokeWidth="2"
                opacity="0.4"
                animate={{
                  strokeDasharray: [0, 300],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 0.3 }}
              />
            </g>
          </svg>
        </motion.div>

        {/* Extra floating orbs */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-xl relative z-20"
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {mode === "login"
              ? "Login ke akun WebDev Academy Anda"
              : "Daftar dan mulai belajar sekarang"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm"
          >
            {success}
          </motion.div>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="nama@example.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-white/15 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-white/15 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            {/* OAuth Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-2 rounded-lg border border-white/20 hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.91 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={handleGitHubLogin}
                disabled={loading}
                className="w-full py-2 rounded-lg border border-white/20 hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            <div className="text-center text-sm text-slate-400">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                  setSuccess("");
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Daftar di sini
              </button>
            </div>
          </form>
        )}

        {/* Register Form */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Nama Lengkap</label>
              <input
                type="text"
                placeholder="John Doe"
                value={registerForm.fullName}
                onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-white/15 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="nama@example.com"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-white/15 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-white/15 focus:outline-none transition"
              />
              <p className="text-xs text-slate-500 mt-1">Minimal 6 karakter</p>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Konfirmasi Password</label>
              <input
                type="password"
                placeholder="••••••"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-white/15 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>

            <div className="text-center text-sm text-slate-400">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-xs text-slate-500 text-center">
          Dengan melanjutkan, Anda setuju dengan Terms dan Privacy Policy kami.
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-sm text-slate-400 hover:text-slate-300 underline"
          >
            Kembali ke Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
