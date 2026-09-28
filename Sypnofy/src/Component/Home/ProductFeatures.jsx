import { motion } from "framer-motion";
import {
  Smartphone,
  BedDouble,
  QrCode,
  FileCheck2,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

const features = [
    {
        icon: Smartphone,
        title: "Aadhaar & DigiLocker KYC",
        description:
            "Guests complete identity verification digitally before check-in — no manual document handling.",
    },
    {
        icon: QrCode,
        title: "GST Verification",
        description:
            "Your GSTIN is auto-verified against the GST portal at signup.",
    },
    {
        icon: FileCheck2,
        title: "Foreign Guest Compliance",
        description:
            "Automated Form III filing within the 24-hour reporting window, with receipts stored for audit.",
    },
    {
        icon: BedDouble,
        title: "Bookings & Property Sync",
        description:
            "Booking status, room assignment and guest KYC status stay in sync across your property.",
    },
];

export default function ProductFeatures() {
    return (

<section className="bg-white py-28">

<div className="max-w-7xl mx-auto px-6">

<motion.div

initial={{opacity:0,y:50}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

className="text-center"

>

<span className="text-blue-600 uppercase tracking-[4px] font-semibold">

Features

</span>

<h2 className="mt-5 text-5xl font-bold text-slate-900">

Compliance Without The Paperwork

</h2>

<p className="mt-6 max-w-3xl mx-auto text-slate-600 leading-8">

From identity verification to foreign-guest filings, every
compliance step happens inside one connected platform.

</p>

</motion.div>

<div className="mt-20 grid lg:grid-cols-3 gap-8">

{/* LEFT */}

<div className="space-y-8">

{features.slice(0,2).map((item,index)=>{

const Icon=item.icon;

return(

<motion.div

key={index}

whileHover={{
y:-10,
scale:1.02
}}

className="rounded-3xl border border-slate-200 p-8 bg-white shadow-sm hover:shadow-xl transition"

>

<div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

<Icon className="text-blue-600"/>

</div>

<h3 className="mt-7 text-2xl font-bold">

{item.title}

</h3>

<p className="mt-4 text-slate-600 leading-7">

{item.description}

</p>

</motion.div>

)

})}

</div>
                {/* CENTER DASHBOARD */}

                <motion.div
                    initial={{ opacity: 0, scale: .9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: .7 }}
                    viewport={{ once: true }}
                    className="relative flex items-center justify-center"
                >

                    {/* Glow */}

                    <div className="absolute h-[520px] w-[520px] rounded-full bg-blue-100 blur-[120px]" />

                    {/* Dashboard */}

                    <div className="relative w-full max-w-md rounded-[34px] border border-slate-200 bg-white shadow-2xl overflow-hidden">

                        {/* Header */}

                        <div className="border-b border-slate-100 px-7 py-5 flex items-center justify-between">

                            <div>

                                <h3 className="font-bold text-slate-900">

                                    Sypnofy Dashboard

                                </h3>

                                <p className="text-sm text-slate-500">

                                    Live Compliance Overview

                                </p>

                            </div>

                            <div className="flex gap-2">

                                <span className="h-3 w-3 rounded-full bg-red-400"></span>
                                <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                                <span className="h-3 w-3 rounded-full bg-green-400"></span>

                            </div>

                        </div>

                        {/* Verifications */}

                        <div className="p-7">

                            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 p-7 text-white">

                                <p className="text-blue-100">

                                    Verifications This Month

                                </p>

                                <h2 className="mt-2 text-4xl font-bold">

                                    3,842

                                </h2>

                                {/* Chart */}

                                <div className="mt-8 flex items-end justify-between gap-2 h-28">

                                    {[50, 75, 60, 90, 80, 110, 95].map((bar, index) => (

                                        <motion.div
                                            key={index}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: bar }}
                                            transition={{
                                                delay: index * .08,
                                                duration: .5,
                                            }}
                                            className="w-full rounded-full bg-white/80"
                                        />

                                    ))}

                                </div>

                            </div>

                            {/* Small Stats */}

                            <div className="grid grid-cols-2 gap-4 mt-6">

                                <div className="rounded-2xl bg-slate-50 p-5">

                                    <p className="text-slate-500 text-sm">

                                        KYC Verified

                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-slate-900">

                                        92%

                                    </h3>

                                </div>

                                <div className="rounded-2xl bg-slate-50 p-5">

                                    <p className="text-slate-500 text-sm">

                                        Pending Review

                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-slate-900">

                                        12

                                    </h3>

                                </div>

                            </div>

                            {/* Booking List */}

                            <div className="mt-6 rounded-2xl border border-slate-200 overflow-hidden">

                                <div className="px-5 py-4 bg-slate-50">

                                    <h4 className="font-semibold text-slate-800">

                                        Recent Verifications

                                    </h4>

                                </div>

                                {[
                                    ["Rahul Sharma", "Suite 204"],
                                    ["Priya Singh", "Deluxe 108"],
                                    ["Ankit Gupta", "Executive 305"],
                                ].map((guest, index) => (

                                    <motion.div
                                        key={index}
                                        whileHover={{
                                            backgroundColor: "#F8FAFC",
                                        }}
                                        className="flex items-center justify-between px-5 py-4 border-t border-slate-100"
                                    >

                                        <div>

                                            <h5 className="font-medium text-slate-800">

                                                {guest[0]}

                                            </h5>

                                            <p className="text-sm text-slate-500">

                                                {guest[1]}

                                            </p>

                                        </div>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">

                                            Verified

                                        </span>

                                    </motion.div>

                                ))}

                            </div>

                        </div>

                    </div>

                    {/* Floating Card */}

                    <motion.div

                        animate={{
                            y: [0, -12, 0],
                        }}

                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}

                        className="absolute -left-12 top-12 hidden xl:block rounded-2xl bg-white border border-slate-200 shadow-xl p-5"

                    >

                        <p className="text-sm text-slate-500">

                            KYC Verified Today

                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-blue-600">

                            84

                        </h3>

                    </motion.div>
                                        {/* Floating Notification */}

                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                        }}
                        className="absolute -right-12 bottom-20 hidden xl:block rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
                    >

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">

                                <AlertTriangle
                                    className="text-amber-600"
                                    size={24}
                                />

                            </div>

                            <div>

                                <h4 className="font-semibold text-slate-900">

                                    Compliance Alert

                                </h4>

                                <p className="text-sm text-slate-500">

                                    Form III Due in 2h

                                </p>

                            </div>

                        </div>

                    </motion.div>

                </motion.div>

                {/* RIGHT */}

                <div className="space-y-8">

                    {features.slice(2).map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: 60,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    delay: index * .2,
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                }}
                                viewport={{ once: true }}
                                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-500 hover:shadow-2xl"
                            >

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500">

                                    <Icon
                                        className="text-white"
                                        size={30}
                                    />

                                </div>

                                <h3 className="mt-8 text-2xl font-bold text-slate-900">

                                    {item.title}

                                </h3>

                                <p className="mt-5 leading-8 text-slate-600">

                                    {item.description}

                                </p>

                                <button className="group mt-8 inline-flex items-center font-semibold text-blue-600">

                                    Learn More

                                    <ArrowRight
                                        size={18}
                                        className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
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