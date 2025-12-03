import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AdminLoginPage({ dark, onClose, onAdminLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = "admin123456"; // Password admin - bisa diubah

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password) {
      setError("Password harus diisi");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        const adminUser = {
          id: "admin-001",
          fullName: "Administrator",
          email: "webdevacademy@gmail.com",
          role: "admin",
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem("webdev_adminUser", JSON.stringify(adminUser));
        setSuccess("Login Admin berhasil!");

        setTimeout(() => {
          onAdminLogin(adminUser);
          onClose();
        }, 1000);
      } else {
        setError("Password admin salah!");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.3))",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(139,92,246,0.3))",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Admin Login Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6"
      >
        <div
          className={`p-8 rounded-2xl backdrop-blur border border-white/10 shadow-2xl ${
            dark ? "bg-white/5" : "bg-white/80"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p
              className={`text-sm mt-2 ${
                dark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Masuk dengan password admin
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Success */}
          {success && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm"
            >
              {success}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  dark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Password Admin
              </label>
              <input
                type="password"
                placeholder="Masukkan password admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none ${
                  dark
                    ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-white/15"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500"
                }`}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login Admin"}
            </button>
          </form>

          {/* Security Note */}
          <div
            className={`mt-6 p-4 rounded-lg ${
              dark
                ? "bg-white/5 border border-white/10"
                : "bg-gray-100 border border-gray-300"
            }`}
          >
            <p
              className={`text-xs ${
                dark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              <strong>🔐 Catatan:</strong> Halaman ini hanya bisa diakses oleh
              administrator. Password bersifat privat.
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={onClose}
            className={`w-full mt-4 py-2 rounded-lg border transition text-sm font-medium ${
              dark
                ? "border-white/20 text-slate-300 hover:bg-white/5"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            Kembali ke Home
          </button>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-8 text-xs ${
            dark ? "text-slate-500" : "text-slate-600"
          }`}
        >
          WebDev Academy © 2024 - Admin Panel
        </div>
      </motion.div>
    </div>
  );
}
