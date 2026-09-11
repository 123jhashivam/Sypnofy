import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, AlertCircle, Loader2, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { login, verifyOtp, resendOtp } from "../../lib/auth";

// Same quiet, icon-free input style as Signup.jsx — kept local here so
// this file stays copy-pasteable on its own, but if you already have
// Field extracted into a shared components file, import that instead.
function Field({ label, type = "text", placeholder, trailing, value, onChange, error, ...rest }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-[52px] w-full rounded-xl border bg-slate-50 px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:ring-4 ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-50"
              : "border-transparent focus:border-blue-600/40 focus:ring-blue-50"
          } ${trailing ? "pr-12" : ""}`}
          {...rest}
        />
        {trailing}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();

  // "credentials" = step 1 (email + password), "otp" = step 2 (code entry)
  const [step, setStep] = useState("credentials");

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const credentialsValid = form.email.trim() && form.password.length > 0;
  const otpValid = /^\d{6}$/.test(otp);

  // Step 1 — verify email + password, trigger OTP email
  async function handleCredentialsSubmit(e) {
    e.preventDefault();
    if (!credentialsValid || submitting) return;

    setSubmitting(true);
    setServerError("");

    try {
      const data = await login({ email: form.email.trim(), password: form.password });
      setInfoMessage(data.message || "Check your email for the code.");
      setStep("otp");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Step 2 — verify the OTP, complete login
  async function handleOtpSubmit(e) {
    e.preventDefault();
    if (!otpValid || submitting) return;

    setSubmitting(true);
    setServerError("");

    try {
      const data = await verifyOtp({ email: form.email.trim(), otp });
      // Admin/superadmin pages don't exist yet — everyone lands on the
      // regular dashboard for now. Branch here once those pages exist.
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    if (submitting) return;
    setSubmitting(true);
    setServerError("");
    try {
      const data = await resendOtp({ email: form.email.trim(), password: form.password });
      setInfoMessage(data.message || "A new code has been sent.");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {step === "credentials" ? (
          <>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">
              Welcome back
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Sign in to Sypnofy
            </h2>
            <p className="mt-2 text-[15px] text-slate-500">
              We'll email you a one-time code to confirm it's you.
            </p>

            <form className="mt-10 space-y-5" onSubmit={handleCredentialsSubmit}>
              <Field
                label="Email address"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={update("email")}
              />

              <Field
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={update("password")}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              {serverError && (
                <div className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={!credentialsValid || submitting}
                whileHover={credentialsValid && !submitting ? { scale: 1.01 } : {}}
                whileTap={credentialsValid && !submitting ? { scale: 0.98 } : {}}
                className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white shadow-lg transition ${
                  credentialsValid && !submitting
                    ? "bg-slate-900 shadow-slate-900/10 hover:bg-slate-800"
                    : "cursor-not-allowed bg-slate-300 shadow-none"
                }`}
              >
                {submitting && <Loader2 size={18} className="animate-spin" />}
                {submitting ? "Sending code…" : "Continue"}
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={13} className="text-blue-500" />
                Your data is encrypted and never shared.
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Or</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <button
                type="button"
                className="flex h-[52px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 py-3.5 text-[15px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </form>

            <p className="mt-8 text-center text-[15px] text-slate-500">
              Don't have an account?
              <Link to="/signup" className="ml-1.5 font-semibold text-blue-600 hover:text-blue-700">
                Create one
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Mail size={22} />
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">
              Enter your code
            </h2>
            <p className="mt-2 text-[15px] text-slate-500">
              {infoMessage || <>We sent a 6-digit code to <strong>{form.email}</strong>.</>}
            </p>

            <form className="mt-10 space-y-5" onSubmit={handleOtpSubmit}>
              <Field
                label="6-digit code"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                autoComplete="one-time-code"
              />

              {serverError && (
                <div className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={!otpValid || submitting}
                whileHover={otpValid && !submitting ? { scale: 1.01 } : {}}
                whileTap={otpValid && !submitting ? { scale: 0.98 } : {}}
                className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white shadow-lg transition ${
                  otpValid && !submitting
                    ? "bg-slate-900 shadow-slate-900/10 hover:bg-slate-800"
                    : "cursor-not-allowed bg-slate-300 shadow-none"
                }`}
              >
                {submitting && <Loader2 size={18} className="animate-spin" />}
                {submitting ? "Verifying…" : "Verify & sign in"}
              </motion.button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setOtp("");
                    setServerError("");
                  }}
                  className="font-semibold text-slate-500 hover:text-slate-700"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={submitting}
                  className="font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
                >
                  Resend code
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
}
