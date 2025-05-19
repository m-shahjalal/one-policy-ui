"use client";

import { motion } from "framer-motion";
import { CheckCircle, Shield } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 dark:via-blue-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 dark:via-purple-400 to-transparent"></div>
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.1) 2px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-purple-200 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 md:p-16 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-md opacity-80"></div>
                <div className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
                  <Shield className="w-10 h-10" />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center dark:text-white"
            >
              Ready to make your site compliant?
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8 text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl"
            >
              Generate your legal pages instantly. No credit card required.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <motion.a
                href="#feature-list"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Generate Legal Pages Now
              </motion.a>

              <a
                href="#sections"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <span>Learn more</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Instant generation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>GDPR compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Regular updates</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
