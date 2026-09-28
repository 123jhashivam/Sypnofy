import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Send,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";

const socialLinks = [
  { icon: FaLinkedinIn, url: "#" },
  { icon: FaInstagram, url: "#" },
  { icon: FaFacebookF, url: "#" },
  { icon: FaXTwitter, url: "#" },
];

const platformLinks = [
  { label: "Guest KYC Verification" },
  { label: "Foreign Guest Compliance" },
  { label: "Property Management" },
  { label: "Bookings"},
  { label: "Audit Logs & Reports"},
  { label: "Admin & User Roles"},
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Our Team", to: "/company/team" },
  { label: "Partners", to: "/partners" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contactUs" },
];

const resourceLinks = [
  { label: "Documentation", to: "/resources/docs" },
  { label: "Help Center", to: "/resources/help" },
  { label: "API Reference", to: "/apis" },
  { label: "Privacy Policy", to: "/legal/privacy" },
  { label: "Terms & Conditions", to: "/legal/terms" },
  { label: "Support", to: "/support" },
];

const stats = [
  { number: "500+", label: "Hotels Using Sypnofy" },
  { number: "40+", label: "Cities Served" },
  { number: "99.9%", label: "Platform Uptime" },
  { number: "24×7", label: "Customer Support" },
];

// -----------------------------------------------------------------------
// Reusable footer link column
// -----------------------------------------------------------------------
function LinkColumn({ title, links, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200">
        {title}
      </h3>
      <ul className="mt-7 space-y-4">
        {links.map((item) => (
          <motion.li key={item.label} whileHover={{ x: 6 }}>
            <Link
              to={item.to}
              className="group inline-flex items-center text-[15px] text-blue-100/90 transition duration-300 hover:text-white"
            >
              {item.label}
              <ArrowRight
                size={15}
                className="ml-1.5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0B3BFF] via-[#1557FF] to-[#2F7BFF] pt-28 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[180px]" />
      <div className="absolute bottom-[-150px] right-[-150px] h-[600px] w-[600px] rounded-full bg-indigo-500/20 blur-[220px]" />
      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[40px] bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] p-10 text-white shadow-2xl shadow-blue-900/30 md:p-16"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold tracking-wide backdrop-blur">
                STAY UPDATED
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                Let's Build The Future
                <span className="block">Of Hospitality Compliance.</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50">
                Get product updates, compliance changes, feature releases
                and hospitality-verification insights directly in your
                inbox.
              </p>
            </div>

            {/* Right */}
            <div>
              <div className="rounded-3xl bg-white p-3 shadow-xl">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail
                      size={18}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      placeholder="Enter your business email"
                      className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none transition focus:border-blue-600"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="group flex h-14 items-center justify-center rounded-2xl bg-white px-8 font-semibold text-blue-600 shadow-sm transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg"
                  >
                    Subscribe
                    <Send
                      size={18}
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.button>
                </div>
              </div>

              <p className="mt-5 text-sm text-blue-100">
                No spam. Only product updates and compliance news.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Content */}
        <div className="mt-24 grid gap-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight">
              <span className="text-white">Syp</span>
              <span className="text-blue-200">nofy</span>
            </h2>

            <p className="mt-6 max-w-sm leading-8 text-blue-100/90">
              Sypnofy helps hotels verify guest identity, automate
              foreign-guest compliance and keep an audit-ready record —
              all from one platform.
            </p>

            {/* Contact */}
            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Noida, India</p>
                  <span className="text-sm text-blue-200">
                    Corporate Office
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">+91 89202 80459</p>
                  <span className="text-sm text-blue-200">Mon - Sat</span>
                </div>
              </div>
            </div>
          </motion.div>

          <LinkColumn title="Platform" links={platformLinks} delay={0.1} />
          <LinkColumn title="Company" links={companyLinks} delay={0.2} />
          <LinkColumn title="Resources" links={resourceLinks} delay={0.3} />
        </div>

        {/* Premium Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -10, scale: 1.03 }}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-300 hover:shadow-xl"
            >
              <h2 className="text-5xl font-bold text-blue-600">
                {item.number}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 border-t border-white/15 py-10"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div>
              <h3 className="text-2xl font-bold text-white">
                Building Compliance Hotels Can Trust.
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-blue-100/90">
                Helping hotels replace manual registers with Aadhaar-backed
                verification and automated compliance reporting.
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:border-white hover:bg-white hover:text-blue-600 hover:shadow-xl"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Copyright */}
          <div className="flex flex-col gap-5 text-center md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-blue-100">
              © 2026
              <span className="mx-1 font-semibold text-white">
                Sypnotech India Pvt. Ltd.
              </span>
              All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                to="/legal/privacy"
                className="text-sm text-blue-100 transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                to="/legal/terms"
                className="text-sm text-blue-100 transition hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                to="/legal/cookies"
                className="text-sm text-blue-100 transition hover:text-white"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back To Top */}
      <motion.button
        whileHover={{ y: -6, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-600 shadow-2xl transition-all duration-300 hover:bg-blue-600 hover:text-white"
        aria-label="Back to top"
      >
        <ArrowUpRight size={22} className="-rotate-45" />
      </motion.button>
    </footer>
  );
}