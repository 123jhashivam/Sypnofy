import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-6">
        
        {/* Background Animation */}
        <motion.div
          className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-10 top-10 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-200 font-semibold uppercase tracking-widest text-sm mb-3">
              Get In Touch
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>

            <p className="max-w-2xl mx-auto text-blue-100 text-lg leading-relaxed">
              Have a question or need assistance? Our team is here to help.
              Get in touch with us and we'll get back to you shortly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ================= CONTACT INFORMATION ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Let's talk
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you have a question about our platform, need technical
              support, or want to explore a partnership, feel free to contact us.
            </p>

            <div className="space-y-6">

              {/* Email */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Email
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    info.sypnotechindia@gmail.com
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-blue-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Phone
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    +91 89202 80459
                  </p>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Office
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Noida, Uttar Pradesh, India
                  </p>
                </div>
              </motion.div>

              {/* Working Hours */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-blue-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Working Hours
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Monday - Friday
                  </p>
                  <p className="text-gray-500 text-sm">
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* ================= CONTACT FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send us a message
              </h2>

              <p className="text-gray-500 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form className="space-y-6">

                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      focus:border-transparent transition"
                    />
                  </div>

                </div>

                {/* Phone + Subject */}
                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>

                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      focus:border-transparent transition"
                    />
                  </div>

                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent transition resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full md:w-auto flex items-center justify-center
                  gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700
                  text-white font-semibold rounded-xl transition shadow-lg
                  shadow-blue-600/20"
                >
                  Send Message
                  <Send size={18} />
                </motion.button>

              </form>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= MAP / CTA SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-10 md:p-14"
        >

          <div className="relative z-10 max-w-2xl">

            <p className="text-blue-400 font-semibold mb-3">
              WE'RE HERE TO HELP
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's build better hospitality experiences together.
            </h2>

            <p className="text-gray-400 mb-7">
              Have questions about Sypnofy? Our team is ready to help you
              understand how our platform can simplify your hotel operations.
            </p>

            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-blue-400 font-semibold"
            >
              Learn More
              <ArrowRight size={18} />
            </motion.button>

          </div>

          {/* Decorative circles */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute -right-20 -bottom-32 w-96 h-96 rounded-full border border-blue-500/20"
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute -right-10 -bottom-20 w-64 h-64 rounded-full border border-blue-500/20"
          />

        </motion.div>

      </section>

    </div>
  );
};

export default ContactUs;
