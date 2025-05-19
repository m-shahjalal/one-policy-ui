"use client";

import { FeatureList } from "@/components/blocks/feature-list";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Clock,
  FileCode,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
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

  const advancedFeatures = [
    {
      title: "AI-Powered Document Generation",
      description:
        "Our advanced AI analyzes your business needs and generates tailored legal documents that address your specific requirements.",
      icon: Sparkles,
      color:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
      iconColor: "text-blue-500 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Real-Time Collaboration",
      description:
        "Work together with your team or legal advisors to review and edit documents with real-time collaboration tools.",
      icon: Users,
      color:
        "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50",
      iconColor: "text-purple-500 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Version History",
      description:
        "Keep track of all changes to your legal documents with comprehensive version history and rollback capabilities.",
      icon: Clock,
      color:
        "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    {
      title: "Custom Code Injection",
      description:
        "Add custom HTML, CSS, or JavaScript to your policies for advanced tracking, styling, or functionality.",
      icon: FileCode,
      color:
        "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50",
      iconColor: "text-amber-500 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Hero section */}
      <section className="relative py-20 overflow-hidden pt-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.1) 2px, transparent 0)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Powerful Features for Your Legal Compliance
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              OnePolicy provides everything you need to create, manage, and
              integrate legal documents for your website or business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 h-12 px-8 text-lg rounded-full shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 transition-all duration-300"
              >
                <Link href="#feature-list">Get Started Free</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FeatureList />

      {/* Advanced features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white"
            >
              Advanced Features
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              OnePolicy goes beyond basic document generation with powerful
              features designed for businesses of all sizes.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div
                  className={`h-full ${feature.color} border ${feature.borderColor} rounded-xl p-8 transition-all duration-300 hover:shadow-xl group`}
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
                        <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white"
            >
              OnePolicy vs. Alternatives
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              See how OnePolicy compares to traditional methods and competitors.
            </motion.p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-50 dark:bg-gray-800 rounded-tl-lg">
                    Feature
                  </th>
                  <th className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold">
                    OnePolicy
                  </th>
                  <th className="p-4 bg-gray-50 dark:bg-gray-800">
                    Generic Templates
                  </th>
                  <th className="p-4 bg-gray-50 dark:bg-gray-800 rounded-tr-lg">
                    Legal Consultation
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Setup Time",
                    onepolicy: "5 minutes",
                    templates: "1-2 hours",
                    legal: "Days to weeks",
                  },
                  {
                    feature: "Cost",
                    onepolicy: "Affordable",
                    templates: "Often free",
                    legal: "Very expensive",
                  },
                  {
                    feature: "Customization",
                    onepolicy: true,
                    templates: false,
                    legal: true,
                  },
                  {
                    feature: "Legal Updates",
                    onepolicy: true,
                    templates: false,
                    legal: "Additional cost",
                  },
                  {
                    feature: "Multiple Formats",
                    onepolicy: true,
                    templates: "Limited",
                    legal: "Additional cost",
                  },
                  {
                    feature: "Integration Options",
                    onepolicy: true,
                    templates: false,
                    legal: "Additional cost",
                  },
                ].map((row, index, array) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 dark:border-gray-800 ${
                      index === array.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="p-4 font-medium dark:text-white">
                      {row.feature}
                    </td>
                    <td className="p-4 bg-blue-50 dark:bg-blue-900/30 text-center">
                      {typeof row.onepolicy === "boolean" ? (
                        row.onepolicy ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          "—"
                        )
                      ) : (
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          {row.onepolicy}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                      {typeof row.templates === "boolean" ? (
                        row.templates ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          "—"
                        )
                      ) : (
                        row.templates
                      )}
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                      {typeof row.legal === "boolean" ? (
                        row.legal ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          "—"
                        )
                      ) : (
                        row.legal
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">
                  Ready to get started?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-0">
                  Join thousands of businesses that trust OnePolicy for their
                  legal compliance needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 h-12 px-8 text-lg rounded-full shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 transition-all duration-300"
                >
                  <Link href="#feature-list">Get Started Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
