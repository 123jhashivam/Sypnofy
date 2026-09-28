import { motion } from "framer-motion";
import {
  Building2,
  Hotel,
  Landmark,
  Building,
} from "lucide-react";
import { useEffect, useState } from "react";

const segments = [
  { name: "INDEPENDENT HOTELS", icon: Hotel },
  { name: "HOTEL GROUPS", icon: Building2 },
  { name: "ENTERPRISE CHAINS", icon: Landmark },
  { name: "BOUTIQUE PROPERTIES", icon: Hotel },
  { name: "BUSINESS HOTELS", icon: Building },
  { name: "RESORTS", icon: Hotel },
  { name: "CO-LIVING SPACES", icon: Building2 },
  { name: "SERVICED APARTMENTS", icon: Building },
];

export default function TrustedBy() {
  const [mobileIndex, setMobileIndex] = useState(0);

  // Mobile: change card automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % segments.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const mobileSegment = segments[mobileIndex];
  const MobileIcon = mobileSegment.icon;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F7FAFF] to-white py-28">

      {/* Background Glow */}
      <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-blue-100 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-100 blur-[170px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >

          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
            BUILT FOR EVERY PROPERTY TYPE
          </span>

          <h2 className="mt-8 text-4xl font-bold text-slate-900 md:text-5xl">
            Verification That Scales
            <span className="text-blue-600"> With Your Property</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            From a single independent property to a multi-city enterprise
            chain, Sypnofy handles guest verification and compliance the
            same reliable way.
          </p>

        </motion.div>


        {/* ================= MOBILE ================= */}
        <div className="mt-16 flex justify-center md:hidden">

          <motion.div
            key={mobileIndex}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.95 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="
              group
              w-full
              max-w-[320px]
              rounded-3xl
              border
              border-blue-100
              bg-white
              p-8
              shadow-[0_10px_40px_rgba(37,99,235,.08)]
            "
          >

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
              <MobileIcon size={30} />
            </div>

            <h3 className="mt-6 text-center text-xl font-bold tracking-wide text-slate-800">
              {mobileSegment.name}
            </h3>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-blue-600" />

          </motion.div>

        </div>


        {/* ================= DESKTOP ================= */}
        <div className="mt-20 hidden overflow-hidden md:block">

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
            className="flex gap-8 whitespace-nowrap"
          >

            {[...segments, ...segments].map((segment, index) => {

              const Icon = segment.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    scale: 1.04,
                  }}
                  className="
                    group
                    min-w-[250px]
                    rounded-3xl
                    border
                    border-blue-100
                    bg-white
                    p-8
                    shadow-[0_10px_40px_rgba(37,99,235,.08)]
                    transition-all
                    duration-500
                    hover:border-blue-400
                    hover:shadow-[0_20px_60px_rgba(37,99,235,.18)]
                  "
                >

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-6 whitespace-normal break-words text-center text-xl font-bold tracking-wide text-slate-800">
                    {segment.name}
                  </h3>

                  <div className="mx-auto mt-5 h-1 w-0 rounded-full bg-blue-600 transition-all duration-500 group-hover:w-20" />

                </motion.div>
              );
            })}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
