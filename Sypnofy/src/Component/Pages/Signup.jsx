import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Star,
  Quote,
  Mail,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signup } from "../../lib/auth";

// -----------------------------------------------------------------------
// Clean, icon-free input — label above, filled field below. No boxed
// icons, no heavy borders: a quieter, more editorial form style.
// -----------------------------------------------------------------------
function Field({
  label,
  type = "text",
  placeholder,
  trailing,
  className = "",
  value,
  onChange,
  error,
  hint,
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
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
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

// -----------------------------------------------------------------------
// Select — same shell as Field, native <select> under the hood.
// -----------------------------------------------------------------------
function Select({ label, value, onChange, options, placeholder, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`h-[52px] w-full appearance-none rounded-xl border border-transparent bg-slate-50 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2394a3b8%22><path d=%22M5.5 7.5l4.5 4.5 4.5-4.5%22 stroke=%22%2394a3b8%22 stroke-width=%221.5%22 fill=%22none%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat px-4 py-3.5 text-[15px] outline-none transition-all focus:border-blue-600/40 focus:bg-white focus:ring-4 focus:ring-blue-50 ${
          value ? "text-slate-900" : "text-slate-400"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-slate-900">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function SectionLabel({ children, active }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
          active ? "text-blue-600" : "text-slate-400"
        }`}
      >
        {children}
      </span>
      <span className="h-px flex-1 bg-slate-100" />
    </div>
  );
}

// -----------------------------------------------------------------------
// Step progress — reflects which section the user is actively filling.
// Purely visual (all fields live on one scrollable page), so people know
// how far through the ~3 minute setup they are.
// -----------------------------------------------------------------------
const STEPS = ["Personal", "Business", "Security"];

function StepProgress({ current }) {
  return (
    <div className="mt-8 flex items-center gap-2">
      {STEPS.map((step, i) => (
        <div key={step} className="flex flex-1 items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                i <= current
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {i < current ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span
              className={`hidden text-xs font-medium sm:inline ${
                i <= current ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <span
              className={`h-px flex-1 transition-colors ${
                i < current ? "bg-blue-600" : "bg-slate-100"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------
// Password strength meter — simple heuristic, no external dependency.
// -----------------------------------------------------------------------
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

function PasswordStrength({ password }) {
  const score = getPasswordStrength(password);
  if (!password) return null;
  const meta = STRENGTH_META[score];
  return (
    <div className="-mt-3">
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < score ? meta.color : "bg-slate-100"
            }`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-xs font-medium text-slate-400">
        {meta.label} · min 8 characters, with a number and a symbol
      </p>
    </div>
  );
}

const features = [
  "Cloud-based property management",
  "Digital guest check-in",
  "Real-time analytics dashboard",
  "Housekeeping automation",
  "Integrated payments",
];

const stats = [
  { value: "500+", label: "Hotels" },
  { value: "99.9%", label: "Uptime" },
  { value: "24×7", label: "Support" },
];

const HOTEL_TYPES = [
  "Independent hotel",
  "Boutique hotel",
  "Chain / group property",
  "Resort",
  "Guesthouse / B&B",
  "Serviced apartments",
];
const ROOM_RANGES = ["1–10", "11–50", "51–150", "151–300", "300+"];

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    hotelName: "",
    city: "",
    hotelType: "",
    roomCount: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const update = (key) => (e) => {
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
    // Clear that field's server-side error as soon as the user edits it
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

  const isFormValid = useMemo(() => {
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.companyName.trim() &&
      form.hotelName.trim() &&
      form.city.trim() &&
      form.hotelType &&
      form.roomCount &&
      form.password.length >= 8 &&
      form.password === form.confirmPassword &&
      form.agreedToTerms
    );
  }, [form]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid || submitting) return;

    setSubmitting(true);
    setServerError("");
    setFieldErrors({});

    try {
      // Field names here match SignupRequest.java on the backend exactly —
      // "roomCount" in local state maps to "roomRange" in the API payload.
      await signup({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        companyName: form.companyName.trim(),
        hotelName: form.hotelName.trim(),
        city: form.city.trim(),
        hotelType: form.hotelType,
        roomRange: form.roomCount,
        password: form.password,
        confirmPassword: form.confirmPassword,
        agreedToTerms: form.agreedToTerms,
      });

      // Signup succeeded — send them to a "check your email" screen
      // rather than straight into the product, since the account
      // isn't email-verified yet.
      navigate("/verify-email", { state: { email: form.email.trim() } });
    } catch (err) {
      setServerError(err.message);
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-white lg:grid lg:grid-cols-5">
      {/* ========================================================= */}
      {/* BRAND PANEL — full-width hero on mobile, sticky sidebar on desktop */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0A1128] via-[#0D1B3A] to-[#0A1128] px-6 py-14 sm:px-10 lg:col-span-2 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:px-12 lg:py-14">
        {/* Soft glow accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="relative">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white ring-1 ring-white/15">
              S
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              Sypnofy
            </span>
          </Link>

          {/* Headline */}
          <h1 className="mt-10 max-w-md text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:mt-14">
            Hospitality management, run the way it should be.
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-400">
            One platform for reservations, housekeeping, guest experience and
            revenue — built for teams who care about the details.
          </p>

          {/* Feature list — thin, editorial, no boxes */}
          <ul className="mt-10 space-y-4">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px] text-slate-300">
                <CheckCircle2 size={16} className="shrink-0 text-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial + stats — hidden on small mobile to keep the hero compact, shown from sm up */}
        <div className="relative mt-12 hidden sm:block">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <Quote size={20} className="text-amber-400/70" />
            <p className="mt-3 text-[15px] leading-relaxed text-slate-200">
              Sypnofy replaced four disconnected tools for us. Front desk,
              housekeeping and billing finally speak to each other.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Aarav Mehta</p>
                <p className="text-xs text-slate-400">GM, Lakeview Grand Hotel</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FORM PANEL */}
      {/* ========================================================= */}
      <div className="flex justify-center px-6 py-14 sm:px-10 lg:col-span-3 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">
            Create Account
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Let's set up your hotel
          </h2>
          <p className="mt-2 text-[15px] text-slate-500">
            Takes about 3 minutes. No credit card required. You can add more
            properties later.
          </p>

          {/* Step progress */}
          <StepProgress current={activeStep} />

          <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
            {/* Personal */}
            <div className="space-y-5" onFocus={() => setActiveStep(0)}>
              <SectionLabel active={activeStep === 0}>
                Personal details
              </SectionLabel>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="First name"
                  placeholder="John"
                  value={form.firstName}
                  onChange={update("firstName")}
                  error={fieldErrors.firstName}
                />
                <Field
                  label="Last name"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={update("lastName")}
                  error={fieldErrors.lastName}
                />
              </div>
              <Field
                label="Email address"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={update("email")}
                error={fieldErrors.email}
                hint={fieldErrors.email ? undefined : "We'll send a verification link here."}
              />

              {/* Phone — fixed +91, India-only operations */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone number
                </label>
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
                {fieldErrors.phone && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{fieldErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Business */}
            <div className="space-y-5" onFocus={() => setActiveStep(1)}>
              <SectionLabel active={activeStep === 1}>
                Business details
              </SectionLabel>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Company name"
                  placeholder="Sypnofy Technologies"
                  value={form.companyName}
                  onChange={update("companyName")}
                  error={fieldErrors.companyName}
                />
                <Field
                  label="Hotel name"
                  placeholder="Grand Palace Hotel"
                  value={form.hotelName}
                  onChange={update("hotelName")}
                  error={fieldErrors.hotelName}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="City"
                  placeholder="Jaipur"
                  value={form.city}
                  onChange={update("city")}
                  error={fieldErrors.city}
                />
                <Select
                  label="Number of rooms"
                  placeholder="Select a range"
                  value={form.roomCount}
                  onChange={update("roomCount")}
                  options={ROOM_RANGES}
                />
              </div>
              <Select
                label="Hotel type"
                placeholder="Select a type"
                value={form.hotelType}
                onChange={update("hotelType")}
                options={HOTEL_TYPES}
              />
            </div>

            {/* Security */}
            <div className="space-y-5" onFocus={() => setActiveStep(2)}>
              <SectionLabel active={activeStep === 2}>Security</SectionLabel>

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
                <PasswordStrength password={form.password} />
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
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.agreedToTerms}
                onChange={update("agreedToTerms")}
                className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-600"
              />
              <span>
                I agree to the
                <Link to="/terms" className="mx-1 font-semibold text-slate-900 hover:text-blue-600">
                  Terms
                </Link>
                and
                <Link to="/privacy" className="ml-1 font-semibold text-slate-900 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Server-side error banner — e.g. "email already exists",
                or the network is unreachable */}
            {serverError && (
              <div className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Submit */}
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

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Or
              </span>
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
            Already have an account?
            <Link to="/login" className="ml-1.5 font-semibold text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
