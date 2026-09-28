import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileCheck2,
  LayoutDashboard,
  BellRing,
} from "lucide-react";

const cards = [
  {
    icon: ShieldCheck,
    title: "Aadhaar-Verified Check-In",
    description:
      "Guests verify identity via Aadhaar Offline e-KYC or DigiLocker before arrival — no photocopies at the front desk.",
  },
  {
    icon: FileCheck2,
    title: "DigiLocker Document Fetch",
    description:
      "Pull a verified passport, driving licence or PAN directly from DigiLocker with the guest's consent.",
  },
  {
    icon: LayoutDashboard,
    title: "Compliance Dashboard",
    description:
      "Track KYC status, foreign-guest filings and the audit trail from one property-level dashboard.",
  },
  {
    icon: BellRing,
    title: "Real-time Compliance Alerts",
    description:
      "Get notified the moment a Form III filing is due or a verification fails.",
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

              Guest Verification

              <br />

              Hotels Can Trust.

            </h2>

            <p className="mt-8 text-lg text-slate-600 leading-8">

              Verify guest identity, file foreign-guest compliance and
              keep an audit-ready record — all from one platform built
              for modern hospitality operators.

            </p>

            <div className="grid grid-cols-2 gap-10 mt-14">

              <div>

                <h3 className="text-5xl font-bold text-blue-600">

                  &lt;5s

                </h3>

                <p className="mt-2 text-slate-600">

                  Average Verification Time

                </p>

              </div>

              <div>

                <h3 className="text-5xl font-bold text-blue-600">

                  24×7

                </h3>

                <p className="mt-2 text-slate-600">

                  Compliance Monitoring

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

                  100%

                </h3>

                <p className="mt-2 text-slate-600">

                  On-Time Form III Filing

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