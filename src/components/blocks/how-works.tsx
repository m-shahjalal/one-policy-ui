"use client";

import { motion } from "framer-motion";
import { CheckCircle, FileText, Send } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Choose Documents",
      description: "Select the legal pages you want to generate.",
      color:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
      iconColor: "text-blue-500 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
      shadowColor: "shadow-blue-100 dark:shadow-blue-900/20",
    },
    {
      icon: CheckCircle,
      title: "Fill Details",
      description: "Answer a few simple questions in our form.",
      color:
        "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50",
      iconColor: "text-purple-500 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
      shadowColor: "shadow-purple-100 dark:shadow-purple-900/20",
    },
    {
      icon: Send,
      title: "Generate",
      description: "Instantly get your ready-to-use legal documents.",
      color:
        "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      shadowColor: "shadow-emerald-100 dark:shadow-emerald-900/20",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div
                  className={`h-full ${step.color} border ${step.borderColor} rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${step.shadowColor}`}
                >
                  <div className="flex flex-col items-center">
                    {/* Step Number */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full blur-md opacity-80"></div>
                      <div
                        className={`relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border ${step.borderColor} shadow-md`}
                      >
                        <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 z-20">
                        <span className="text-xs font-bold dark:text-white">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-gray-900/30"
          >
            Get Started Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
