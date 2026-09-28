import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { guestSignup } from "../../lib/guestAuth"; // apna actual relative path check kar lena

function Field({ label, type = "text", placeholder, trailing, value, onChange, error }) {
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
        />
        {trailing}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

function getPasswordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  return Math.min(score, 4);
}

const STRENGTH_META = [
  { label: "Very weak", color: "bg-red-400" },
  { label: "Weak", color: "bg-orange-400" },
  { label: "Fair", color: "bg-amber-400" },
  { label: "Good", color: "bg-lime-500" },
  { label: "Strong", color: "bg-emerald-500" },
];

export default function GuestSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const update = (key) => (e) => {
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
    if (fieldErrors[key]) {
      setFieldErrors((fe) => {
        const next = { ...fe };
        delete next[key];
        return next;
      });
    }
  };

  const passwordsMismatch =
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  const isFormValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword &&
    form.agreedToTerms;

  const strength = getPasswordStrength(form.password);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid || submitting) return;

    setSubmitting(true);
    setServerError("");
    setFieldErrors({});

    try {
      await guestSignup({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        agreedToTerms: form.agreedToTerms,
      });

      navigate("/guest/login", {
  state: {
    justSignedUp: true,
    infoMessage: "Account created! Sign in now to verify your Aadhaar.",
  },
});
    } catch (err) {
      setServerError(err.message);
      setFieldErrors(err.fieldErrors || {});
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
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">
          Create Account
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Book stays, faster
        </h2>
        <p className="mt-2 text-[15px] text-slate-500">
          Verify your identity once — skip it at every hotel after that.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="First name"
              placeholder="Priya"
              value={form.firstName}
              onChange={update("firstName")}
              error={fieldErrors.firstName}
            />
            <Field
              label="Last name"
              placeholder="Sharma"
              value={form.lastName}
              onChange={update("lastName")}
              error={fieldErrors.lastName}
            />
          </div>

          <Field
            label="Email address"
            type="email"
            placeholder="priya@example.com"
            value={form.email}
            onChange={update("email")}
            error={fieldErrors.email}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
            <div className="flex gap-3">
              <span className="flex h-[52px] w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[15px] font-medium text-slate-500">
                +91
              </span>
              <input
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={update("phone")}
                className={`h-[52px] w-full rounded-xl border bg-slate-50 px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:ring-4 ${
                  fieldErrors.phone
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-transparent focus:border-blue-600/40 focus:ring-blue-50"
                }`}
              />
            </div>
            {fieldErrors.phone && <p className="mt-1.5 text-xs font-medium text-red-500">{fieldErrors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Field
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
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
            {form.password && (
              <div className="-mt-1">
                <div className="flex gap-1.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i < strength ? STRENGTH_META[strength].color : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-xs font-medium text-slate-400">
                  {STRENGTH_META[strength].label} · min 8 characters, with a number and a symbol
                </p>
              </div>
            )}
          </div>

          <Field
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            error={passwordsMismatch ? "Passwords don't match." : undefined}
            trailing={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <label className="flex items-start gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.agreedToTerms}
              onChange={update("agreedToTerms")}
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-600"
            />
            <span>
              I agree to the
              <Link to="/terms" className="mx-1 font-semibold text-slate-900 hover:text-blue-600">Terms</Link>
              and
              <Link to="/privacy" className="ml-1 font-semibold text-slate-900 hover:text-blue-600">Privacy Policy</Link>
            </span>
          </label>

          {serverError && (
            <div className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={!isFormValid || submitting}
            whileHover={isFormValid && !submitting ? { scale: 1.01 } : {}}
            whileTap={isFormValid && !submitting ? { scale: 0.98 } : {}}
            className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white shadow-lg transition ${
              isFormValid && !submitting
                ? "bg-slate-900 shadow-slate-900/10 hover:bg-slate-800"
                : "cursor-not-allowed bg-slate-300 shadow-none"
            }`}
          >
            {submitting && <Loader2 size={18} className="animate-spin" />}
            {submitting ? "Creating account…" : "Create Account"}
          </motion.button>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={13} className="text-blue-500" />
            Your data is encrypted and never shared.
          </div>
        </form>

        <p className="mt-8 text-center text-[15px] text-slate-500">
          Already have an account?
          <Link to="/guest/login" className="ml-1.5 font-semibold text-blue-600 hover:text-blue-700">Sign in</Link>
        </p>

        <p className="mt-2 text-center text-xs text-slate-400">
          Are you a hotel?
          <Link to="/signup" className="ml-1.5 font-semibold text-slate-500 hover:text-slate-700">List your property</Link>
        </p>
      </motion.div>
    </section>
  );
}
