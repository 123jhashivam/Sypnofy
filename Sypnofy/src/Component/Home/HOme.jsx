import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ClipboardList, Circle } from "lucide-react";

// -----------------------------------------------------------------------
// Floating glass card used for the "Check in complete" / "Order placed"
// overlays on top of the device panel.
// -----------------------------------------------------------------------
function FloatingCard({ icon, iconBg, title, subtitle, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 + delay, duration: 0.6 }}
      className={`absolute z-20 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl shadow-slate-900/20 backdrop-blur ${className}`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        <span className="text-xs text-slate-500">{subtitle}</span>
      </span>
    </motion.div>
  );
}

// -----------------------------------------------------------------------
// Glass device panel — sits on top of the full-bleed background video.
// It doesn't hold its own video; the bg-white/5 + backdrop-blur lets the
// section's video show through it, tinted, so it reads as "the same
// video, framed" rather than a second video.
// -----------------------------------------------------------------------
function DevicePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.9 }}
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-[10px] border-blue-500/60 bg-white/5 shadow-2xl shadow-blue-500/20 backdrop-blur-xl">
        {/* LIVE badge */}
        <div className="absolute right-5 top-5 z-10 flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/90">
          <Circle size={8} className="fill-emerald-400 text-emerald-400" />
          LIVE
        </div>

        {/* Identity status bar */}
        <div className="absolute inset-x-5 bottom-5 z-10 rounded-xl bg-slate-900/60 px-4 py-3 backdrop-blur">
          <span className="text-xs font-medium text-white/80">Identity status</span>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-4/5 rounded-full bg-emerald-400" />
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <FloatingCard
        icon={<CheckCircle2 size={18} className="text-emerald-600" />}
        iconBg="bg-emerald-50"
        title="Check in complete"
        subtitle="Room 412 · Access ready"
        className="-left-4 top-10 sm:-left-8"
        delay={0}
      />
      <FloatingCard
        icon={<ClipboardList size={18} className="text-blue-600" />}
        iconBg="bg-blue-50"
        title="Order placed"
        subtitle="In room dining · ETA 18m"
        className="-right-4 bottom-16 sm:-right-8"
        delay={0.3}
      />
    </motion.div>
  );
}

// -----------------------------------------------------------------------
// Main Hero — background video plays behind the ENTIRE section
// -----------------------------------------------------------------------
export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      {/* Background video — fills the whole section, behind all content */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="/assets/hero-video-poster.jpg"
        onError={(e) => console.error("Video failed to load:", e)}
      >
        {/* Replace with your own hosted video file */}
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Overlay for text legibility over the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/85" />

      {/* Decorative blue glow blobs, on top of overlay */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-400/20 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-28 sm:py-32 lg:grid-cols-2 lg:px-8 lg:py-36">
        {/* Left column — copy */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-6xl"
          >
            Hotel guest experience and operations that{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              grow ancillary revenue
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-slate-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Sypnofy is a hotel guest experience and operations platform that connects
            digital check-in, in-stay guest services, and staff workflows—so hotels
            can deliver clearer service and grow paid guest services after the room
            is sold.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400"
          >
            Built for hotel owners and operators who want one place for guest
            journey and ops work, not another disconnected login.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/demo"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-500 hover:scale-105"
            >
              Book a Demo
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/pricing"
              className="inline-flex items-center rounded-full border-2 border-white/40 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-white hover:text-slate-900"
            >
              View pricing
            </Link>

            <Link
              to="/about"
              className="text-[15px] font-semibold text-blue-300 transition-colors duration-200 hover:text-blue-200"
            >
              What is Sypnofy?
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 text-sm text-slate-400"
          >
            Already on Sypnofy?{" "}
            <Link to="/login" className="font-semibold text-blue-300 hover:text-blue-200">
              Sign in to the console
            </Link>
          </motion.p>
        </div>

        {/* Right column — glass device panel (video shows through it) */}
        <DevicePanel />
      </div>
    </section>
  );
}
