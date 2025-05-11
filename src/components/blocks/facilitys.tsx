"use client";

import { motion } from "framer-motion";
import { Check, FileText, FileClock, FileCheck, FilePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DocumentsSection() {
  const documents = [
    {
      title: "Privacy Policy",
      icon: FileText,
      color:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
      iconColor: "text-blue-500 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
      comingSoon: false,
    },
    {
      title: "Terms & Conditions",
      icon: FileCheck,
      color:
        "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50",
      iconColor: "text-purple-500 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
      comingSoon: false,
    },
    {
      title: "Cookie Policy",
      icon: FilePlus,
      color:
        "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      comingSoon: false,
    },
    {
      title: "Return Policy",
      icon: FileClock,
      color:
        "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50",
      iconColor: "text-amber-500 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-800",
      comingSoon: true,
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
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white">
            Documents You Can Generate
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create professional legal documents for your business or website in
            minutes. No legal expertise required.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {documents.map((doc, index) => (
            <motion.div key={index} variants={item} className="relative">
              <div
                className={`h-full ${doc.color} border ${doc.borderColor} rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full blur-md opacity-80"></div>
                    <div
                      className={`relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border ${doc.borderColor} shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <doc.icon className={`w-7 h-7 ${doc.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {doc.title}
                  </h3>

                  {doc.comingSoon ? (
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
                    >
                      Coming Soon
                    </Badge>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 text-green-600 font-medium">
                      <Check size={16} className="text-green-500" />
                      <span>Available</span>
                    </div>
                  )}
                </div>

                {!doc.comingSoon && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-gray-900/30"
          >
            Generate Documents Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
