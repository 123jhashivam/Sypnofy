import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    tagline: "For a single independent property",
    monthly: 4999,
    annual: 3999,
    highlighted: false,
    features: {
      properties: "1 property",
      verifications: "300 / month",
      foreignGuest: false,
      support: "Email",
      audit: false,
    },
  },
  {
    name: "Growth",
    tagline: "For small chains getting serious about compliance",
    monthly: 14999,
    annual: 11999,
    highlighted: true,
    features: {
      properties: "Up to 10 properties",
      verifications: "1,500 / month",
      foreignGuest: true,
      support: "Priority chat + email",
      audit: true,
    },
  },
  {
    name: "Enterprise",
    tagline: "For hotel groups with dedicated compliance teams",
    monthly: null,
    annual: null,
    highlighted: false,
    features: {
      properties: "Unlimited",
      verifications: "Custom",
      foreignGuest: true,
      support: "Dedicated account manager",
      audit: true,
    },
  },
];

const FEATURE_ROWS = [
  { key: "properties", label: "Properties" },
  { key: "verifications", label: "Guest KYC verifications" },
  { key: "foreignGuest", label: "Foreign guest compliance (Form III)" },
  { key: "audit", label: "Full audit log & exports" },
  { key: "support", label: "Support" },
];

const FAQS = [
  {
    q: "Do you charge per verification or a flat fee?",
    a: "Both — every plan includes a monthly quota of KYC verifications. If you go over, extra verifications are billed at a fixed per-verification rate, shown on your invoice. There's no surprise markup tied to any single identity provider.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes, anytime. Moving up takes effect immediately; moving down takes effect at your next billing cycle so you don't lose unused quota mid-month.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. Starter and Growth plans are self-serve — create an account and start onboarding properties the same day. Enterprise plans include a guided setup session at no extra cost.",
  },
  {
    q: "What happens to guest data if I cancel?",
    a: "You can export all guest and audit records at any time. After cancellation, data is retained for 30 days for compliance continuity, then permanently deleted on request.",
  },
];

function Toggle({ annual, setAnnual }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5">
      <button
        onClick={() => setAnnual(false)}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          !annual ? "bg-slate-900 text-white" : "text-slate-500"
        }`}
      >
        Monthly
      </button>

      <button
        onClick={() => setAnnual(true)}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          annual ? "bg-slate-900 text-white" : "text-slate-500"
        }`}
      >
        Annual

        <span
          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
            annual
              ? "bg-amber-400 text-slate-900"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          Save 20%
        </span>
      </button>
    </div>
  );
}

function FeatureValue({ value }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} className="mx-auto text-emerald-500" />
    ) : (
      <span className="mx-auto block h-px w-4 bg-slate-200" />
    );
  }

  return <span>{value}</span>;
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <p className="text-[15px] font-medium text-slate-900">{faq.q}</p>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-slate-400"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-slate-500">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1128] via-[#0D1B3A] to-[#0A1128] px-6 py-24 sm:px-10">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-400/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-2xl text-center"
        >
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white ring-1 ring-white/15">
              S
            </div>

            <span className="text-lg font-semibold tracking-tight text-white">
              Sypnofy
            </span>
          </Link>

          <h1 className="mt-10 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Priced for how hotels actually grow.
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-slate-400">
            One property or fifty — pay for the verifications you use, not a
            seat count. No setup fee, cancel anytime.
          </p>
        </motion.div>
      </section>

      {/* Pricing table */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex justify-center">
            <Toggle annual={annual} setAnnual={setAnnual} />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const price = annual ? plan.annual : plan.monthly;

              return (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 ${
                    plan.highlighted
                      ? "bg-[#0A1128] text-white"
                      : "border border-slate-200 bg-white text-slate-900"
                  }`}
                >
                  <p
                    className={`text-lg font-semibold ${
                      plan.highlighted ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.name}
                  </p>

                  <p
                    className={`mt-1.5 text-sm ${
                      plan.highlighted ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  <div className="mt-6">
                    {price ? (
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={price}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl font-bold"
                        >
                          ₹{price.toLocaleString("en-IN")}

                          <span
                            className={`ml-1 text-base font-normal ${
                              plan.highlighted
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}
                          >
                            /mo
                          </span>
                        </motion.p>
                      </AnimatePresence>
                    ) : (
                      <p className="text-4xl font-bold">Custom</p>
                    )}
                  </div>

                  <a
                    href={
                      price
                        ? "https://console.sandbox.co.in/"
                        : "mailto:sales@sypnofy.com"
                    }
                    className={`mt-6 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition ${
                      plan.highlighted
                        ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {price ? "Start free trial" : "Contact sales"}
                  </a>

                  <ul className="mt-8 space-y-3 text-sm">
                    {FEATURE_ROWS.map((row) => (
                      <li
                        key={row.key}
                        className={`flex items-center justify-between gap-3 ${
                          plan.highlighted
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        <span>{row.label}</span>

                        <span
                          className={
                            plan.highlighted
                              ? "text-white"
                              : "font-medium text-slate-900"
                          }
                        >
                          <FeatureValue value={plan.features[row.key]} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-100 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Questions, answered
          </h2>

          <div className="mt-8">
            {FAQS.map((faq) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={openFaq === faq.q}
                onToggle={() =>
                  setOpenFaq(openFaq === faq.q ? null : faq.q)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-slate-50 px-6 py-20 text-center sm:px-10">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Ready to try it on your property?
        </h2>

        <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-500">
          No credit card required. Set up your first property in under 5
          minutes.
        </p>

        <Link
          to="/signup"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 text-[15px] font-semibold text-white transition hover:bg-slate-800"
        >
          Create your account
        </Link>
      </section>
    </div>
  );
}