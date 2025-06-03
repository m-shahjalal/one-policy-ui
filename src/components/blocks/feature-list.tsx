"use client";

import { Button } from "@/components/ui/button";
import { pages } from "@/config/routes";
import { motion } from "framer-motion";
import { Check, FileText, Globe, Shield } from "lucide-react";
import Link from "next/link";

const policyDocuments = [
  {
    title: "Privacy Policy",
    description:
      "Comprehensive privacy policy that builds trust with your users while keeping your business compliant with global regulations.",
    icon: Shield,
    link: pages.policies.privacies.index,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
    textColor: "text-blue-700 dark:text-blue-300",
    borderColor: "border-blue-200 dark:border-blue-800",
    features: [
      "GDPR & CCPA compliant clauses",
      "Customizable to your data practices",
      "Regular regulatory updates",
      "Clear, user-friendly language",
    ],
  },
  {
    title: "Terms & Conditions",
    description:
      "Protect your business with comprehensive terms of service that clearly outline user rights, responsibilities and limitations.",
    icon: FileText,
    link: pages.policies.terms.index,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
    textColor: "text-purple-700 dark:text-purple-300",
    borderColor: "border-purple-200 dark:border-purple-800",
    features: [
      "Liability limitations",
      "Intellectual property protection",
      "User conduct guidelines",
      "Termination conditions",
    ],
  },
  {
    title: "Cookie Policy",
    description:
      "Ensure compliance with cookie regulations worldwide with a detailed policy explaining how cookies are used on your website.",
    icon: Globe,
    link: pages.policies.cookies.index,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
    textColor: "text-emerald-700 dark:text-emerald-300",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    features: [
      "Types of cookies explained",
      "Third-party cookies disclosure",
      "Cookie consent mechanism",
      "User opt-out instructions",
    ],
  },
];

export const FeatureList = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <section id="feature-list" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white"
          >
            Create Legal Documents Now
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Create and manage all the critical legal documents your website
            needs with our easy-to-use generators
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {policyDocuments.map((document, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div
                className={`h-full border ${document.borderColor} rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl`}
              >
                <div
                  className={`h-2 w-full bg-gradient-to-r ${document.color}`}
                ></div>
                <div className={`p-8 ${document.bgColor}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full blur-md opacity-80"></div>
                      <div
                        className={`relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r ${document.color} text-white shadow-md`}
                      >
                        <document.icon className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className={`text-2xl font-bold ${document.textColor}`}>
                      {document.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {document.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {document.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-r ${document.color} flex items-center justify-center shrink-0`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${document.color} text-white hover:shadow-lg transition-all duration-300 rounded-lg h-12`}
                  >
                    <Link href={document.link}>Generate {document.title}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
