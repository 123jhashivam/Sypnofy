import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ShieldCheck,
  FileCheck2,
  Globe2,
  Copy,
  Check,
  ArrowRight,
  Zap,
  Lock,
  Clock,
} from "lucide-react";

const APIS = [
  {
    id: "kyc",
    icon: ShieldCheck,
    name: "Guest KYC Verification API",
    tagline: "Verify a guest's identity in under 5 seconds",
    description:
      "Aadhaar Offline e-KYC and DigiLocker-backed identity checks, returned as a pass/fail result — never raw identifiers. Built for hotel front desks, but works for any onboarding flow.",
    endpoint: "POST /v1/kyc/verify",
    request: `curl -X POST https://api.sypnofy.com/v1/kyc/verify \\
  -H "Authorization: Bearer sk_live_••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "aadhaar_offline",
    "guest_ref": "GST-5521",
    "xml_file": "<base64_encoded_zip>",
    "share_code": "1234"
  }'`,
    response: `{
  "status": "verified",
  "guest_uuid": "8e2f-...-91ab",
  "match": {
    "name": true,
    "dob": true,
    "photo_similarity": 0.97
  },
  "verified_at": "2026-09-17T10:12:04Z"
}`,
  },
  {
    id: "digilocker",
    icon: FileCheck2,
    name: "DigiLocker Document Fetch API",
    tagline: "Pull a verified passport, licence or PAN in one call",
    description:
      "Fetch government-issued documents directly from DigiLocker with the guest's consent — no manual upload, no photo of a physical card sitting in your storage.",
    endpoint: "POST /v1/digilocker/fetch",
    request: `curl -X POST https://api.sypnofy.com/v1/digilocker/fetch \\
  -H "Authorization: Bearer sk_live_••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "guest_ref": "GST-5521",
    "document_type": "DRVLC",
    "consent_token": "cst_9f81..."
  }'`,
    response: `{
  "status": "fetched",
  "document_type": "DRVLC",
  "issued_by": "Parivahan Sewa",
  "verified": true,
  "uri": "in.gov.digilocker.doc/xxxxx"
}`,
  },
  {
    id: "compliance",
    icon: Globe2,
    name: "Foreign Guest Compliance API",
    tagline: "File Form III without touching a government portal",
    description:
      "Submit passport, visa and stay details for foreign nationals and get a compliance receipt back — built to meet the 24-hour arrival/departure reporting window automatically.",
    endpoint: "POST /v1/compliance/form-iii",
    request: `curl -X POST https://api.sypnofy.com/v1/compliance/form-iii \\
  -H "Authorization: Bearer sk_live_••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "guest_ref": "GST-5530",
    "passport_number": "N1234567",
    "nationality": "USA",
    "visa_number": "IN2026081234",
    "check_in": "2026-09-17"
  }'`,
    response: `{
  "status": "submitted",
  "receipt_id": "FIII-2026-88213",
  "submitted_within_window": true,
  "authority": "FRRO Delhi"
}`,
  },
];

const STEPS = [
  {
    step: "01",
    title: "Get your API key",
    desc: "Create an account and grab test keys instantly. No sales call needed to start integrating.",
  },
  {
    step: "02",
    title: "Call the API",
    desc: "Every endpoint follows the same auth pattern and returns a consistent JSON shape — verify, fetch, or file, all the same way.",
  },
  {
    step: "03",
    title: "Go live",
    desc: "Swap your test key for a live one. Usage-based billing, no separate production onboarding step.",
  },
];

function CodeBlock({ label, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-[#0A1128]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-xs font-medium text-slate-400">
          {label}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="max-w-full overflow-x-auto px-4 py-4 text-[13px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ApiCard({ api, index }) {
  const Icon = api.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="grid min-w-0 gap-8 border-t border-slate-100 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16"
    >
      <div className="min-w-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>

        <h3 className="mt-5 break-words text-2xl font-semibold tracking-tight text-slate-900">
          {api.name}
        </h3>

        <p className="mt-2 text-[15px] font-medium text-blue-600">
          {api.tagline}
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-slate-500">
          {api.description}
        </p>

        <div className="mt-6 max-w-full overflow-x-auto rounded-lg bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600">
          <span className="whitespace-nowrap">
            {api.endpoint}
          </span>
        </div>
      </div>

      <div className="min-w-0 space-y-4">
        <CodeBlock
          label="Request"
          code={api.request}
        />

        <CodeBlock
          label="Response"
          code={api.response}
        />
      </div>
    </motion.div>
  );
}

export default function Apis() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1128] via-[#0D1B3A] to-[#0A1128] px-5 py-20 sm:px-10 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white ring-1 ring-white/15">
                S
              </div>

              <span className="text-lg font-semibold tracking-tight text-white">
                Sypnofy
              </span>
            </Link>

            <h1 className="mt-10 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Guest verification, as an API.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-slate-400">
              The same Aadhaar, DigiLocker and Form III compliance
              infrastructure that runs inside StayKYC — now callable directly
              from your own product.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="mailto:sales@sypnofy.com?subject=API access"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 text-[15px] font-semibold text-slate-900 transition hover:bg-amber-300 sm:w-auto"
            >
              Get API keys
              <ArrowRight size={16} />
            </a>

            <Link
              to="/pricing"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-white/15 px-6 text-[15px] font-medium text-white transition hover:bg-white/5 sm:w-auto"
            >
              View pricing
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-14 flex flex-col items-center justify-center gap-5 text-slate-400 sm:flex-row sm:flex-wrap sm:gap-8"
          >
            <div className="flex items-center gap-2 text-sm">
              <Zap size={15} className="text-amber-400" />
              <span>&lt;5s response time</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Lock size={15} className="text-amber-400" />
              <span>No raw identifiers stored</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock size={15} className="text-amber-400" />
              <span>24×7 support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* API products */}
      <section className="px-5 py-4 sm:px-10">
        <div className="mx-auto max-w-5xl">
          {APIS.map((api, i) => (
            <ApiCard
              key={api.id}
              api={api}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-100 bg-slate-50 px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
            Live in an afternoon, not a sprint
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step}>
                <p className="text-sm font-bold text-amber-500">
                  {s.step}
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {s.title}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-white px-5 py-16 text-center sm:px-10 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Ready to plug in guest verification?
        </h2>

        <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-500">
          Get test keys instantly, or talk to us about volume pricing for
          your platform.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:sales@sypnofy.com?subject=API access"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 px-6 text-[15px] font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            Get API keys
          </a>

          <Link
            to="/pricing"
            className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 px-6 text-[15px] font-medium text-slate-700 transition hover:border-slate-300 sm:w-auto"
          >
            View pricing
          </Link>
        </div>
      </section>
    </div>
  );
}