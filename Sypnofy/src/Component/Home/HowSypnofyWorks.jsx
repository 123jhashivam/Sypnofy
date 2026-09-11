import { motion } from "framer-motion";
import {
  Building2,
  ScanLine,
  Hotel,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Hotel Setup",
    description:
      "Register your property, configure rooms, pricing, staff accounts and start managing your hotel from one dashboard.",
    points: [
      "Hotel Registration",
      "Room Configuration",
      "Staff Management",
      "Pricing Setup",
    ],
  },
  {
    number: "02",
    icon: ScanLine,
    title: "Guest Check-In",
    description:
      "Guests verify their identity, complete digital check-in and receive instant room access with a secure QR experience.",
    points: [
      "Digital Check-In",
      "Aadhaar Verification",
      "QR Access",
      "Paperless Process",
    ],
  },
  {
    number: "03",
    icon: Hotel,
    title: "Smart Stay",
    description:
      "Guests request services, order food, contact reception and complete checkout without waiting at the front desk.",
    points: [
      "Room Service",
      "Housekeeping",
      "Guest Requests",
      "Digital Checkout",
    ],
  },
];

export default function HowSypnofyWorks() {
  return (
    <section className="relative overflow-hidden bg-[#f8fbff] py-24">

      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-100 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sky-100 blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">

            HOW SYPNOFY WORKS

          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">

            A Complete Digital Journey

            <span className="block text-blue-600">

              From Booking To Checkout

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">

            Every guest interaction—from registration to checkout—is
            managed through one connected platform, helping hotels
            deliver faster, smarter and more personalized experiences.

          </p>

        </motion.div>

        {/* Timeline */}

        <div className="relative mt-20">

          {/* Desktop Connector */}

          <div className="absolute left-1/2 top-24 hidden h-1 w-[75%] -translate-x-1/2 rounded-full bg-blue-100 lg:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5 }}
              className="h-full rounded-full bg-blue-600"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.2,
                    duration: .7,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  viewport={{ once: true }}
                  className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-500 hover:shadow-2xl"
                >

                  {/* Number */}

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">

                    {step.number}

                  </div>

                  {/* Icon */}

                  <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

                    <Icon className="text-blue-600" size={30} />

                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">

                    {step.title}

                  </h3>

                  <p className="mt-5 leading-7 text-slate-600">

                    {step.description}

                  </p>

                  {/* Features */}

                  <div className="mt-8 space-y-4">

                    {step.points.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2
                          className="text-blue-600"
                          size={20}
                        />

                        <span className="text-slate-700">

                          {item}

                        </span>
                      </div>
                    ))}

                  </div>

                  <button className="group mt-10 flex items-center font-semibold text-blue-600">

                    Learn More

                    <ArrowRight
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                      size={18}
                    />

                  </button>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}