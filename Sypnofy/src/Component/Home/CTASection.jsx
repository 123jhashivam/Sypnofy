import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Headphones,
  Rocket,
} from "lucide-react";

const highlights = [
  {
    icon: CalendarCheck,
    title: "Free Demo",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
  },
  {
    icon: Rocket,
    title: "Fast Onboarding",
  },
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28 bg-white">

      {/* Background Blur */}

      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-100 blur-[130px]" />

      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-100 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="rounded-[40px] bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 px-8 py-16 md:px-16 text-center text-white shadow-2xl"
        >

          <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">

            START TODAY

          </span>

          <h2 className="mt-8 text-4xl md:text-6xl font-bold leading-tight">

            Ready To Transform

            <span className="block">

              Your Hotel Operations?

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-blue-50">

            Simplify guest check-ins, automate housekeeping,
            manage bookings and deliver a premium guest
            experience from one powerful hotel platform.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .96 }}
              className="group inline-flex items-center rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition"
            >
              Book Free Demo

              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .96 }}
              className="rounded-xl border border-white/40 px-8 py-4 font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Contact Sales
            </motion.button>

          </div>

          {/* Highlights */}

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">

            {highlights.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * .15,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-2xl bg-white/10 p-6 backdrop-blur transition hover:bg-white/20"
                >

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600">

                    <Icon size={28} />

                  </div>

                  <h3 className="mt-5 font-semibold text-lg">

                    {item.title}

                  </h3>

                </motion.div>

              );

            })}

          </div>

        </motion.div>

      </div>

    </section>
  );
}