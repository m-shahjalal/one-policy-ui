"use client";

import { pages } from "@/config/pages";
import { motion } from "framer-motion";
import { Lock, Zap, FileText, Package, ArrowRight } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "No data saved unless you want to. Your information stays private and secure.",
      color:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
      iconColor: "text-blue-500 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
      shadowColor: "shadow-blue-100 dark:shadow-blue-900/20",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description:
        "Preview and export your legal documents instantly with our lightning-fast system.",
      color:
        "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50",
      iconColor: "text-purple-500 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
      shadowColor: "shadow-purple-100 dark:shadow-purple-900/20",
    },
    {
      icon: FileText,
      title: "Legally Sound",
      description:
        "Human-readable documents that are legally sound and regularly updated to meet requirements.",
      color:
        "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      shadowColor: "shadow-emerald-100 dark:shadow-emerald-900/20",
    },
    {
      icon: Package,
      title: "Easy Integration",
      description:
        "Add to any website in just one click with our simple integration process.",
      color:
        "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50",
      iconColor: "text-amber-500 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-800",
      shadowColor: "shadow-amber-100 dark:shadow-amber-900/20",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white"
          >
            Why Choose OnePolicy?
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Our platform offers the simplest way to generate professional legal
            documents that protect your business and build trust with your
            users.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="h-full"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div
                className={`h-full ${feature.color} border ${feature.borderColor} rounded-xl p-8 transition-all duration-300 hover:shadow-xl ${feature.shadowColor} group`}
              >
                <div className="flex items-start gap-5">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full blur-md opacity-80"></div>
                    <div
                      className={`relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border ${feature.borderColor} shadow-md`}
                    >
                      <feature.icon
                        className={`w-7 h-7 ${feature.iconColor}`}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>

                    <div className="mt-4 inline-flex items-center text-sm font-medium group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400 transition-colors">
                      <span>Learn more</span>
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href={pages.features}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            <span>View all features</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
