
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  MapPin,
  Clock,
  ArrowRight,
  Code2,
  ShieldCheck,
} from "lucide-react";

const values = [
  "We ship straight to Aadhaar/DigiLocker and Form III — no sandbox theater, real compliance flows from day one",
  "A hotel's front desk shouldn't need training to use what we build",
  "Talk to a property manager before you talk to code",
  "Own a module end to end — model, API, and the screen someone actually clicks",
];

const stack = [
  { label: "Frontend", detail: "React, Vite, Tailwind" },
  { label: "Backend", detail: "Java, Spring Boot, MySQL" },
  { label: "Identity", detail: "Aadhaar Offline e-KYC, DigiLocker" },
  { label: "Compliance", detail: "Form III automated reporting" },
];

const roles = [
  {
    title: "Backend Engineer — Spring Boot",
    dept: "Engineering",
    location: "Noida, UP (Hybrid)",
    type: "Full-time",
    description:
      "Own the guest identity and compliance layer — Aadhaar Offline e-KYC, DigiLocker document fetch, and the Form III foreign-guest reporting pipeline. You'll design the entity model around an immutable guest UUID (no raw identifiers stored, per UIDAI data-minimization guidance) and build the RBAC scoping across our five personas — Corporate Admin, Property Admin, Front Desk Agent, Compliance Officer and Platform Super Admin.",
  },
  {
    title: "Frontend Engineer — React",
    dept: "Engineering",
    location: "Noida, UP (Hybrid)",
    type: "Full-time",
    description:
      "Build the screens front desk staff use during every check-in: Properties, Bookings, Guest KYC status, and the Foreign Guest Compliance dashboard. You'll work directly off our Spring Boot APIs, and care as much about a slow list on a hotel's spotty wifi as you do about the design.",
  },
  {
    title: "Customer Success Associate",
    dept: "Customer Success",
    location: "Noida, UP",
    type: "Full-time",
    description:
      "Onboard new hotels and hotel groups onto StayKYC — set up their property hierarchy, GSTIN/PAN records, and walk front desk teams through their first digital check-in. You'll be the first person a property calls when a guest's Aadhaar verification doesn't go through.",
  },
  {
    title: "Sales Development Representative",
    dept: "Sales",
    location: "Noida, UP",
    type: "Full-time",
    description:
      "Reach out to independent hotels and small chains still logging guest IDs on paper registers. You'll explain what QR-based digital check-in and automated Form III reporting actually save them, and hand qualified conversations to the founders.",
  },
];

function RoleRow({ role, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <div>
          <p className="text-lg font-semibold text-slate-900">{role.title}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>{role.dept}</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {role.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {role.type}
            </span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-slate-400"
        >
          <ChevronDown size={20} />
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
            <div className="pb-6 pr-10">
              <p className="text-[15px] leading-relaxed text-slate-600">
                {role.description}
              </p>

              <a
                href={`mailto:careers@sypnofy.com?subject=Application: ${role.title}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Apply for this role
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Careers() {
  const [openRole, setOpenRole] = useState(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1128] via-[#0D1B3A] to-[#0A1128] px-6 py-24 sm:px-10 lg:py-32">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              We're building the compliance layer Indian hotels don't have yet.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-slate-400">
              StayKYC replaces the paper register with Aadhaar-backed digital
              check-in and automated foreign-guest reporting. A small
              engineering-led team at Sypnotech, building for hotels that
              have never touched a compliance API before.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stack.map((s) => (
              <div key={s.label} className="text-left sm:text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-400/80">
                  {s.label}
                </p>

                <p className="mt-1 text-sm text-slate-300">{s.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-blue-600">
            <ShieldCheck size={18} />
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              How we build
            </h2>
          </div>

          <ul className="mt-8 space-y-5">
            {values.map((v) => (
              <li
                key={v}
                className="flex items-start gap-3 text-[15px] text-slate-600"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you'd actually work on */}
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-blue-600">
            <Code2 size={18} />
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              What you'd actually work on
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Guest KYC",
                desc: "Aadhaar Offline e-KYC and DigiLocker document verification, with a guest UUID that never stores raw identifiers.",
              },
              {
                title: "Foreign Guest Compliance",
                desc: "Automated Form III reporting — passport, visa validity, 24-hour arrival/departure submission windows.",
              },
              {
                title: "Multi-Property Management",
                desc: "Organization hierarchies from a single independent hotel up to enterprise chains, with GSTIN/PAN records per property.",
              },
              {
                title: "Role-Based Access",
                desc: "Five scoped personas — Corporate Admin down to Front Desk Agent — with organization and property-level permissions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 border border-slate-100"
              >
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Open roles
          </h2>

          <p className="mt-2 text-[15px] text-slate-500">
            Don't see a fit? Email us anyway — careers@sypnofy.com.
          </p>

          <div className="mt-8">
            {roles.map((role) => (
              <RoleRow
                key={role.title}
                role={role}
                isOpen={openRole === role.title}
                onToggle={() =>
                  setOpenRole(
                    openRole === role.title ? null : role.title
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-slate-50 px-6 py-20 text-center sm:px-10">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Not the right role yet?
        </h2>

        <p className="mx-auto mt-2 max-w-md text-[15px] text-slate-500">
          We're a small team growing deliberately. Send your resume and
          we'll reach out when something fits.
        </p>

        <a
          href="mailto:careers@sypnofy.com"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 text-[15px] font-semibold text-white transition hover:bg-slate-800"
        >
          info.sypnotechindia@gmail.com
        </a>
      </section>
    </div>
  );
}

