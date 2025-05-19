"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, HelpCircle, X, Zap } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { pages } from "@/config/pages";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  // Animation variants
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

  // Pricing plans
  const plans = [
    {
      name: "Free",
      description: "For individuals and small projects",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: "3 Legal Documents", included: true },
        { name: "Basic Customization", included: true },
        { name: "HTML Export", included: true },
        { name: "Email Support", included: true },
        { name: "PDF Export", included: false },
        { name: "Remove OnePolicy Branding", included: false },
        { name: "Custom Branding", included: false },
        { name: "Version History", included: false },
      ],
      cta: "Get Started",
      popular: false,
      color: "border-gray-200 dark:border-gray-800",
      headerColor: "bg-gray-50 dark:bg-gray-800",
    },
    {
      name: "Pro",
      description: "For growing businesses and websites",
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        { name: "Unlimited Legal Documents", included: true },
        { name: "Advanced Customization", included: true },
        { name: "HTML & PDF Export", included: true },
        { name: "Priority Email Support", included: true },
        { name: "Remove OnePolicy Branding", included: true },
        { name: "Custom Branding", included: true },
        { name: "Version History", included: true },
        { name: "API Access", included: false },
      ],
      cta: "Start For Free",
      popular: true,
      color: "border-blue-200 dark:border-blue-800",
      headerColor: "bg-blue-50 dark:bg-blue-900/30",
    },
    {
      name: "Business",
      description: "For larger organizations with multiple sites",
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        { name: "Unlimited Legal Documents", included: true },
        { name: "Advanced Customization", included: true },
        { name: "All Export Formats", included: true },
        { name: "24/7 Priority Support", included: true },
        { name: "Remove OnePolicy Branding", included: true },
        { name: "Custom Branding", included: true },
        { name: "Version History", included: true },
        { name: "API Access", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-purple-200 dark:border-purple-800",
      headerColor: "bg-purple-50 dark:bg-purple-900/30",
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. If you downgrade, the changes will take effect at the end of your current billing cycle.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within 14 days of your initial purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Business plans, we also accept bank transfers.",
    },
    {
      question: "Can I use OnePolicy for multiple websites?",
      answer:
        "The Free plan is limited to one website. The Pro plan allows up to 3 websites, and the Business plan supports unlimited websites under the same organization.",
    },
    {
      question: "Are the legal documents legally binding?",
      answer:
        "OnePolicy generates documents based on best practices and common legal requirements. However, we recommend having your documents reviewed by a legal professional to ensure they meet your specific needs and comply with local laws.",
    },
    {
      question: "How often are the legal templates updated?",
      answer:
        "We regularly update our templates to reflect changes in laws and regulations. All paid plans receive automatic updates to their documents when our templates are updated.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Hero section */}
      <section className="relative py-20 pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
          <div className="absolute inset-0 opacity-5">
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

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Choose the plan that&apos;s right for your business. All plans
              include a 14-day free trial.
            </p>

            <div className="flex items-center justify-center mb-12">
              <span
                className={`mr-3 text-sm font-medium ${
                  billingCycle === "monthly"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) =>
                  setBillingCycle(checked ? "yearly" : "monthly")
                }
                className="data-[state=checked]:bg-blue-500"
              />
              <span
                className={`ml-3 text-sm font-medium ${
                  billingCycle === "yearly"
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                  Save 20%
                </Badge>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing plans */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <div
                  className={`h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 ${
                    plan.popular
                      ? "border-blue-500 dark:border-blue-400 shadow-blue-100 dark:shadow-blue-900/20"
                      : plan.color
                  } overflow-hidden relative`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  <div className={`p-6 ${plan.headerColor}`}>
                    <h2 className="text-2xl font-bold dark:text-white">
                      {plan.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {plan.description}
                    </p>

                    <div className="mt-4">
                      <span className="text-4xl font-bold dark:text-white">
                        $
                        {billingCycle === "monthly"
                          ? plan.monthlyPrice
                          : plan.yearlyPrice}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {plan.monthlyPrice > 0
                          ? `/${billingCycle === "monthly" ? "mo" : "yr"}`
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mr-3 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "dark:text-white"
                                : "text-gray-500 dark:text-gray-400"
                            }
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href={pages.privacies.index}>{plan.cta}</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
            <p>
              All plans include a 14-day free trial. No credit card required.{" "}
              <Link
                href="#comparison"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View full plan comparison
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section id="#comparison" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white"
            >
              Compare Plans
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Find the plan that best fits your needs
            </motion.p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left p-4">Feature</th>
                  <th className="p-4 text-center">Free</th>
                  <th className="p-4 text-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold">
                    Pro
                  </th>
                  <th className="p-4 text-center">Business</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-medium dark:text-white">
                    Legal Documents
                  </td>
                  <td className="p-4 text-center">3</td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/30">
                    Unlimited
                  </td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-medium dark:text-white">Websites</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/30">
                    3
                  </td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-medium dark:text-white">
                    Export Formats
                  </td>
                  <td className="p-4 text-center">HTML</td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/30">
                    HTML, PDF
                  </td>
                  <td className="p-4 text-center">HTML, PDF, Word, Text</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-medium dark:text-white">
                    Custom Branding
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/30">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-medium dark:text-white">
                    Version History
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/30">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-medium dark:text-white">
                    API Access
                  </td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/30">
                    <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <td className="p-4 font-medium dark:text-white">
                    <div className="flex items-center">
                      <span>GDPR Compliance Tools</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400 ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Tools to help you comply with GDPR requirements,
                              including cookie consent management and data
                              subject request handling.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/30">
                    Advanced
                  </td>
                  <td className="p-4 text-center">Complete</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium dark:text-white">Support</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-900/30">
                    Priority Email
                  </td>
                  <td className="p-4 text-center">24/7 Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white"
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
              >
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Still have questions? We&apos;re here to help.
            </p>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8 md:p-12 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Ready to get started with OnePolicy?
                  </h2>
                  <p className="text-blue-100 text-lg max-w-2xl">
                    Join thousands of businesses that trust OnePolicy for their
                    legal compliance needs. Start your 14-day free trial today.
                  </p>
                </div>
                <div className="shrink-0">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 border-0 h-12 px-8 text-lg rounded-full shadow-lg transition-all duration-300"
                  >
                    <Link
                      className="flex items-center"
                      href={pages.privacies.index}
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start For Free
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
