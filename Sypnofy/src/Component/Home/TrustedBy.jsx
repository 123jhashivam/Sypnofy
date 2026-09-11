import { motion } from "framer-motion";
import {
  Building2,
  Hotel,
  Landmark,
  Building,
} from "lucide-react";

const hotels = [
  { name: "TAJ HOTELS", icon: Hotel },
  { name: "MARRIOTT", icon: Building2 },
  { name: "HYATT", icon: Landmark },
  { name: "ITC HOTELS", icon: Hotel },
  { name: "RADISSON", icon: Building },
  { name: "LEMON TREE", icon: Hotel },
  { name: "HOLIDAY INN", icon: Building2 },
  { name: "RAMADA", icon: Landmark },
];

export default function TrustedBy() {
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
          transition={{ duration: .8 }}
          className="text-center"
        >

          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">

            TRUSTED BY HOSPITALITY BRANDS

          </span>

          <h2 className="mt-8 text-4xl font-bold text-slate-900 md:text-5xl">

            Powering Modern
            <span className="text-blue-600"> Hotel Operations</span>

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">

            From boutique hotels to luxury resorts,
            Sypnofy enables seamless guest experiences,
            digital operations and smarter hotel management.

          </p>

        </motion.div>

        {/* Marquee */}

        <div className="mt-20 overflow-hidden">

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
            className="flex gap-8 whitespace-nowrap"
          >

            {[...hotels, ...hotels].map((hotel, index) => {

              const Icon = hotel.icon;

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

                  <h3 className="mt-6 text-center text-xl font-bold tracking-wide text-slate-800">

                    {hotel.name}

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