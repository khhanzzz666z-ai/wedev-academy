import React, { useState } from "react";
import { motion } from "framer-motion";
import { verifyEmail, sendVerificationEmail } from "./database";

export default function EmailVerificationComponent({
  email,
  fullName,
  onVerificationSuccess,
  onClose,
  dark,
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [verificationCodeDisplay, setVerificationCodeDisplay] = useState("");

  // Auto-send verification code on mount
  React.useEffect(() => {
    const codeDisplay = sendVerificationEmail(email, fullName);
    setVerificationCodeDisplay(codeDisplay);
  }, [email, fullName]);

  const handleVerify = async (e) => {
    e?.preventDefault?.();
    setError("");
    setSuccess("");

    if (!code.trim()) {
      setError("Silakan masukkan kode verifikasi");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = verifyEmail(email, code.toUpperCase());

      if (result.success) {
        setSuccess("Email terverifikasi! Silakan login kembali.");
        setTimeout(() => {
          onVerificationSuccess();
          onClose();
        }, 1500);
      } else {
        setError(result.message);
      }

      setLoading(false);
    }, 1000);
  };

  const handleResendCode = () => {
    const newCode = sendVerificationEmail(email, fullName);
    setVerificationCodeDisplay(newCode);
    setCode("");
    setError("");
    setResendTimer(60);

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-2xl p-8 max-w-md w-full mx-4 ${
          dark ? "bg-slate-900" : "bg-white"
        } shadow-2xl`}
      >
        <h2 className="text-2xl font-bold mb-2">Verifikasi Email</h2>
        <p
          className={`text-sm mb-6 ${
            dark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Kami telah mengirim kode verifikasi ke{" "}
          <span className="font-semibold">{email}</span>
        </p>

        {/* Demo Code Display */}
        <div
          className={`mb-6 p-4 rounded-lg border-2 border-indigo-500/50 ${
            dark ? "bg-indigo-500/10" : "bg-indigo-50"
          }`}
        >
          <p
            className={`text-xs mb-2 ${
              dark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Kode Verifikasi (untuk demo):
          </p>
          <p className="text-lg font-mono font-bold text-indigo-400">
            {verificationCodeDisplay}
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Masukkan Kode Verifikasi
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Contoh: ABC123"
              maxLength="6"
              className={`w-full px-4 py-3 rounded-lg border-2 font-mono text-center text-lg tracking-widest ${
                dark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-200 text-slate-900"
              } focus:outline-none focus:border-indigo-500`}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-green-500/20 text-green-300 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !code}
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memverifikasi..." : "Verifikasi Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p
            className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}
          >
            Tidak menerima kode?
          </p>
          <button
            onClick={handleResendCode}
            disabled={resendTimer > 0}
            className={`text-indigo-400 hover:text-indigo-300 text-sm font-semibold mt-2 ${
              resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {resendTimer > 0
              ? `Kirim ulang dalam ${resendTimer}s`
              : "Kirim Ulang Kode"}
          </button>
        </div>

        <button
          onClick={onClose}
          className={`mt-4 w-full px-4 py-2 rounded-lg border ${
            dark
              ? "border-slate-700 hover:bg-slate-800"
              : "border-slate-200 hover:bg-slate-100"
          }`}
        >
          Tutup
        </button>
      </motion.div>
    </div>
  );
}
