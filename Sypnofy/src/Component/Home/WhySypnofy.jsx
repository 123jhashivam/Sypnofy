import { motion } from "framer-motion";
import {
  ShieldCheck,
  Smartphone,
  BellRing,
  LayoutDashboard,
} from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    title: "Secure Digital Check-In",
    description:
      "Guests can complete their check-in digitally before arriving, reducing reception waiting time.",
  },
  {
    icon: Smartphone,
    title: "Guest Services",
    description:
      "Food ordering, housekeeping requests and concierge services from one mobile interface.",
  },
  {
    icon: LayoutDashboard,
    title: "Hotel Dashboard",
    description:
      "Track bookings, occupancy, housekeeping and revenue from one modern dashboard.",
  },
  {
    icon: BellRing,
    title: "Real-time Notifications",
    description:
      "Receive instant updates for check-ins, guest requests and housekeeping activities.",
  },
];

export default function WhySypnofy() {
  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
          >

            <span className="text-blue-600 uppercase tracking-[4px] font-semibold text-sm">

              WHY CHOOSE SYPNOFY

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">

              Hotel Operations

              <br />

              Made Smarter.

            </h2>

            <p className="mt-8 text-lg text-slate-600 leading-8">

              Manage guests, check-ins, housekeeping,
              staff communication and hotel operations
              through one intelligent platform designed
              for modern hospitality businesses.

            </p>

            <div className="grid grid-cols-2 gap-10 mt-14">

              <div>

                <h3 className="text-5xl font-bold text-blue-600">

                  98%

                </h3>

                <p className="mt-2 text-slate-600">

                  Guest Satisfaction

                </p>

              </div>

              <div>

                <h3 className="text-5xl font-bold text-blue-600">

                  24×7

                </h3>

                <p className="mt-2 text-slate-600">

                  Customer Support

                </p>

              </div>

              <div>

                <h3 className="text-5xl font-bold text-blue-600">

                  500+

                </h3>

                <p className="mt-2 text-slate-600">

                  Hotels

                </p>

              </div>

              <div>

                <h3 className="text-5xl font-bold text-blue-600">

                  40+

                </h3>

                <p className="mt-2 text-slate-600">

                  Cities

                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <div className="grid md:grid-cols-2 gap-6">

            {cards.map((card, index) => {

              const Icon = card.icon;

              return (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * .15,
                    duration: .6,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  viewport={{ once: true }}
                  className="rounded-[28px]
                  bg-gradient-to-br
                  from-blue-600
                  via-blue-500
                  to-sky-400
                  p-8
                  text-white
                  shadow-lg
                  transition-all"
                >

                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

                    <Icon size={30} />

                  </div>

                  <h3 className="mt-8 text-3xl font-bold leading-tight">

                    {card.title}

                  </h3>

                  <p className="mt-6 text-blue-50 leading-8">

                    {card.description}

                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}