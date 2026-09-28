import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  ShieldCheck,
  Zap,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
  Hotel,
  HeartHandshake,
} from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: Building2,
      title: "Smart Hotel Management",
      description:
        "Manage your hotel operations from a single, easy-to-use platform.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description:
        "Keep your hotel and guest information protected with secure technology.",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description:
        "Automate everyday operations and reduce unnecessary manual work.",
    },
    {
      icon: Users,
      title: "Guest Focused",
      description:
        "Create a smooth and convenient experience for your guests.",
    },
  ];

  const stats = [
    { number: "24/7", label: "Platform Availability" },
    { number: "100%", label: "Guest Focused" },
    { number: "1", label: "Unified Platform" },
    { number: "∞", label: "Possibilities" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-24 px-6">

        {/* Animated Background */}
        <motion.div
          className="absolute -left-32 -top-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-32 bottom-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-blue-200 font-semibold tracking-widest uppercase text-sm mb-4">
                About Sypnofy
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Simplifying Hotel
                <span className="block text-blue-200">
                  Management
                </span>
              </h1>

              <p className="text-blue-100 text-lg leading-relaxed max-w-xl mb-8">
                Sypnofy is a modern hotel management platform designed to
                simplify hotel operations, improve guest experiences, and
                help businesses manage everything from one place.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 bg-white
                text-blue-700 rounded-xl font-semibold shadow-lg"
              >
                Explore Sypnofy
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-72 h-72 md:w-96 md:h-96"
              >
                <div className="absolute inset-0 bg-white/10 rounded-[3rem] rotate-6" />

                <div className="absolute inset-5 bg-white rounded-[2.5rem]
                shadow-2xl flex items-center justify-center rotate-0">

                  <div className="text-center text-blue-700">
                    <Hotel size={90} strokeWidth={1.3} className="mx-auto mb-5" />

                    <h3 className="text-3xl font-bold">
                      Sypnofy
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Smart Hospitality
                    </p>
                  </div>

                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}
      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Image / Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >

              <div className="bg-blue-50 rounded-3xl p-10 md:p-16">

                <motion.div
                  animate={{
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="bg-white rounded-3xl shadow-xl p-10 text-center"
                >
                  <Building2
                    size={80}
                    className="mx-auto text-blue-600 mb-5"
                  />

                  <h3 className="text-2xl font-bold text-gray-900">
                    One Platform
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Complete Hotel Management
                  </p>
                </motion.div>

              </div>

              <div className="absolute -bottom-5 -right-5 bg-blue-600
              text-white rounded-2xl px-6 py-4 shadow-lg">

                <p className="text-2xl font-bold">
                  Smart
                </p>

                <p className="text-blue-100 text-sm">
                  Hospitality Solutions
                </p>

              </div>

            </motion.div>


            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">
                Who We Are
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Technology that makes hospitality simpler
              </h2>

              <p className="text-gray-600 leading-relaxed mb-5">
                Sypnofy is built with a simple goal: to make hotel management
                easier, faster, and more connected.
              </p>

              <p className="text-gray-600 leading-relaxed mb-7">
                From guest onboarding and identity verification to bookings,
                hotel operations, and reporting, Sypnofy brings important
                processes together into one platform.
              </p>

              <div className="space-y-4">

                {[
                  "Simple and intuitive interface",
                  "Centralized hotel operations",
                  "Secure guest management",
                  "Designed for modern hospitality",
                ].map((item, index) => (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-blue-600 flex-shrink-0"
                    />

                    <span className="text-gray-700">
                      {item}
                    </span>
                  </motion.div>

                ))}

              </div>

            </motion.div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}
      <section className="bg-gray-50 py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >

            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">
              What We Offer
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for modern hospitality
            </h2>

            <p className="text-gray-600">
              Everything you need to manage your hotel operations more
              efficiently and deliver better guest experiences.
            </p>

          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="bg-white rounded-2xl p-7 shadow-sm
                  border border-gray-100 hover:shadow-xl transition-shadow"
                >

                  <div className="w-14 h-14 rounded-xl bg-blue-100
                  flex items-center justify-center mb-6">

                    <Icon
                      size={27}
                      className="text-blue-600"
                    />

                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                </motion.div>
              );

            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          MISSION & VISION
      ===================================================== */}
      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-blue-600 text-white p-8 md:p-10"
            >

              <div className="w-14 h-14 rounded-xl bg-white/15
              flex items-center justify-center mb-6">

                <Target size={28} />

              </div>

              <h2 className="text-2xl font-bold mb-4">
                Our Mission
              </h2>

              <p className="text-blue-100 leading-relaxed">
                Our mission is to simplify hotel management through
                technology that helps businesses operate efficiently while
                creating seamless experiences for their guests.
              </p>

            </motion.div>


            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-gray-900 text-white p-8 md:p-10"
            >

              <div className="w-14 h-14 rounded-xl bg-white/10
              flex items-center justify-center mb-6">

                <Eye size={28} />

              </div>

              <h2 className="text-2xl font-bold mb-4">
                Our Vision
              </h2>

              <p className="text-gray-400 leading-relaxed">
                We envision a hospitality industry where technology removes
                operational complexity and allows hotel teams to focus on
                what matters most — their guests.
              </p>

            </motion.div>

          </div>

        </div>
      </section>


      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="bg-blue-50 py-16 px-6">

        <div className="max-w-5xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {stats.map((stat, index) => (

              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="text-center"
              >

                <h3 className="text-3xl md:text-4xl font-bold text-blue-600">
                  {stat.number}
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  {stat.label}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="py-20 px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r
          from-blue-600 to-indigo-700 text-white p-10 md:p-16 text-center
          relative overflow-hidden"
        >

          {/* Background Circle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute -right-20 -top-20 w-64 h-64
            rounded-full bg-white/10"
          />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute -left-20 -bottom-20 w-64 h-64
            rounded-full bg-white/10"
          />

          <div className="relative z-10">

            <HeartHandshake
              size={45}
              className="mx-auto mb-5"
            />

            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Ready to simplify your hotel operations?
            </h2>

            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Discover how Sypnofy can help you manage your hotel more
              efficiently and create better guest experiences.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5
              bg-white text-blue-700 rounded-xl font-semibold shadow-lg"
            >
              Get Started
              <ArrowRight size={18} />
            </motion.button>

          </div>

        </motion.div>

      </section>

    </div>
  );
};

export default AboutUs;
