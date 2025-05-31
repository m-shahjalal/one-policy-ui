"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pages } from "@/config/pages";
import { motion } from "framer-motion";
import { type LucideIcon, ArrowRight, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Types for the component props
export interface FeatureList {
  iconColor: string;
  borderColor: string;
  color: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureTestimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface FeatureFAQItem {
  question: string;
  answer: string;
}

export interface FeatureLandingPageProps {
  // Basic information
  type: "privacy" | "terms" | "cookie";
  title: string;
  subtitle: string;
  heroIcon: LucideIcon;
  heroTagline: string;

  // Colors and styling
  primaryColor: string;
  secondaryColor?: string;
  gradientFrom: string;
  gradientTo: string;
  darkGradientFrom: string;
  darkGradientTo: string;

  // Content sections
  features: FeatureList[];
  howItWorksSteps: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  testimonials: FeatureTestimonial[];
  faqItems: FeatureFAQItem[];

  // CTA content
  ctaTitle: string;
  ctaDescription: string;

  // URLs
  viewSampleUrl: string;
  generateUrl?: string;
}

export default function FeatureLandingPage({
  type,
  title,
  subtitle,
  heroIcon: HeroIcon,
  heroTagline,
  primaryColor,
  secondaryColor,
  gradientFrom,
  gradientTo,
  features,
  howItWorksSteps,
  testimonials,
  faqItems,
  ctaTitle,
  ctaDescription,
  generateUrl,
}: FeatureLandingPageProps) {
  console.log("generateUrl", generateUrl);
  const [isLoaded, setIsLoaded] = useState(false);

  // Color mappings based on policy type
  const colorMap = {
    bg: {
      light: `from-${primaryColor}-50 to-white`,
      dark: `from-${primaryColor}-950/50 dark:to-gray-950`,
    },
    badge: {
      bg: `bg-${primaryColor}-100 dark:bg-${primaryColor}-900/30`,
      text: `text-${primaryColor}-700 dark:text-${primaryColor}-300`,
      border: `border-${primaryColor}-200 dark:border-${primaryColor}-800`,
    },
    button: {
      bg: `bg-${primaryColor}-600 hover:bg-${primaryColor}-700`,
      outline: {
        border: `border-${primaryColor}-300 dark:border-${primaryColor}-700`,
        text: `text-${primaryColor}-700 dark:text-${primaryColor}-300`,
        hover: `hover:bg-${primaryColor}-50 dark:hover:bg-${primaryColor}-900/30`,
      },
    },
    section: {
      bg: `to-${primaryColor}-50 dark:to-${primaryColor}-950/20`,
      full: `bg-${primaryColor}-50 dark:bg-${primaryColor}-950/20`,
    },
    connector: `bg-${primaryColor}-200 dark:bg-${primaryColor}-800/30`,
    cta: {
      from: `from-${primaryColor}-600`,
      to: `to-${secondaryColor || primaryColor}-600`,
      darkFrom: `dark:from-${primaryColor}-700`,
      darkTo: `dark:to-${secondaryColor || primaryColor}-700`,
    },
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden bg-gradient-to-b ${colorMap.bg.light} dark:${colorMap.bg.dark} pt-24 pb-16 md:pt-32 md:pb-24`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-40 -right-40 w-80 h-80 rounded-full bg-${primaryColor}-100 dark:bg-${primaryColor}-900/20 blur-3xl opacity-50`}
          ></div>
          <div
            className={`absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-${
              secondaryColor || primaryColor
            }-100 dark:bg-${
              secondaryColor || primaryColor
            }-900/20 blur-3xl opacity-40`}
          ></div>
          <div
            className={`absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-${
              secondaryColor || primaryColor
            }-100 dark:bg-${
              secondaryColor || primaryColor
            }-900/20 blur-3xl opacity-30`}
          ></div>

          {/* Grid Pattern */}
          <div
            className={`absolute inset-0 bg-grid-${primaryColor}-500/[0.03] dark:bg-grid-${primaryColor}-400/[0.02]`}
            style={{ backgroundSize: "30px 30px" }}
          ></div>
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={`inline-flex items-center gap-2 ${colorMap.badge.bg} px-3 py-1 rounded-full ${colorMap.badge.text} text-sm font-medium mb-6`}
            >
              <HeroIcon className="h-4 w-4" />
              <span>{heroTagline}</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.1 },
                },
              }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#gradientFrom] via-[#primaryColor]-600 to-[#gradientTo] dark:from-[#darkGradientFrom] dark:via-[#primaryColor]-500 dark:to-[#darkGradientTo]"
              style={{
                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.2 },
                },
              }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.3 },
                },
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href={generateUrl || ""}>
                <Button
                  size="lg"
                  className={`${colorMap.button.bg} text-white px-8`}
                  style={{
                    backgroundColor: gradientFrom,
                    backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                  }}
                >
                  Generate{" "}
                  {type === "terms"
                    ? "Terms & Conditions"
                    : `${type.charAt(0).toUpperCase() + type.slice(1)} Policy`}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Trusted By */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: 0.5, duration: 0.8 },
              },
            }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              TRUSTED BY THOUSANDS OF BUSINESSES
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              {[
                "Wastedd.org",
                "Shocchocroy",
                "Alysia",
                "Sultanium IT",
                "Proa",
              ].map((company, index) => (
                <div
                  key={index}
                  className="text-gray-400 dark:text-gray-500 font-semibold text-lg"
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto fill-white dark:fill-gray-950"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial="active"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className={`mb-4 px-3 py-1 ${colorMap.badge.border} ${colorMap.badge.text} ${colorMap.badge.bg}`}
            >
              Key Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {type === "privacy" &&
                "Everything You Need for Privacy Compliance"}
              {type === "terms" && "Everything You Need for Legal Protection"}
              {type === "cookie" && "Everything You Need for Cookie Compliance"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our {type === "terms" ? "terms and conditions" : `${type} policy`}{" "}
              generator includes all the essential elements to keep your
              {type === "privacy" &&
                " business legally protected and build trust with your users."}
              {type === "terms" &&
                " business legally protected and establish clear rules for your users."}
              {type === "cookie" &&
                " website legally compliant and build trust with your users."}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              const colorIndex = index % 4;

              // Pre-define color variants to avoid complex string interpolation
              const colorVariants = [
                {
                  bg: `bg-${primaryColor}-50 dark:bg-${primaryColor}-900/20`,
                  icon: `text-${primaryColor}-500 dark:text-${primaryColor}-400`,
                  border: `border-${primaryColor}-200 dark:border-${primaryColor}-800`,
                },
                {
                  bg: `bg-${secondaryColor || primaryColor}-50 dark:bg-${
                    secondaryColor || primaryColor
                  }-900/20`,
                  icon: `text-${secondaryColor || primaryColor}-500 dark:text-${
                    secondaryColor || primaryColor
                  }-400`,
                  border: `border-${
                    secondaryColor || primaryColor
                  }-200 dark:border-${secondaryColor || primaryColor}-800`,
                },
                {
                  bg: `bg-${colorIndex === 2 ? "sky" : "teal"}-50 dark:bg-${
                    colorIndex === 2 ? "sky" : "teal"
                  }-900/20`,
                  icon: `text-${
                    colorIndex === 2 ? "sky" : "teal"
                  }-500 dark:text-${colorIndex === 2 ? "sky" : "teal"}-400`,
                  border: `border-${
                    colorIndex === 2 ? "sky" : "teal"
                  }-200 dark:border-${colorIndex === 2 ? "sky" : "teal"}-800`,
                },
                {
                  bg: `bg-${colorIndex === 3 ? "cyan" : "lime"}-50 dark:bg-${
                    colorIndex === 3 ? "cyan" : "lime"
                  }-900/20`,
                  icon: `text-${
                    colorIndex === 3 ? "cyan" : "lime"
                  }-500 dark:text-${colorIndex === 3 ? "cyan" : "lime"}-400`,
                  border: `border-${
                    colorIndex === 3 ? "cyan" : "lime"
                  }-200 dark:border-${colorIndex === 3 ? "cyan" : "lime"}-800`,
                },
              ];

              return (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`${
                    feature.color || colorVariants[colorIndex].bg
                  } border ${
                    feature.borderColor || colorVariants[colorIndex].border
                  } rounded-xl p-6 shadow-sm`}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                      {FeatureIcon && (
                        <FeatureIcon
                          className={`h-6 w-6 ${
                            feature.iconColor || colorVariants[colorIndex].icon
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 text-center"
          >
            <Button
              className={`${colorMap.button.bg} text-white`}
              style={{
                backgroundColor: gradientFrom,
                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
              }}
            >
              <Link
                href={pages.features}
                className="flex justify-center items-center"
              >
                Explore All Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className={`py-16 md:py-24 bg-gradient-to-b from-white ${colorMap.section.bg}`}
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className={`mb-4 px-3 py-1 dark:!text-gray-700 ${colorMap.badge.border} ${colorMap.badge.text} ${colorMap.badge.bg}`}
            >
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-gray-700">
              How It Works
            </h2>
            <p className="text-lg dark:text-gray-500 max-w-2xl mx-auto">
              Creating a professional{" "}
              {type === "terms" ? "terms and conditions" : `${type} policy`}{" "}
              with OnePolicy is simple and straightforward
            </p>
          </motion.div>

          <div className="relative">
            {/* Connector Line */}
            <div
              className={`absolute top-1/2 left-0 w-full h-0.5 ${colorMap.connector} -translate-y-1/2 hidden md:block`}
            ></div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            >
              {howItWorksSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="relative"
                  >
                    <div
                      className={`bg-white dark:bg-gray-900 border ${colorMap.badge.border} rounded-xl p-8 shadow-sm relative z-10 h-full`}
                    >
                      <div className="flex flex-col items-center text-center">
                        {/* Step Number */}
                        <div className="relative mb-6">
                          <div
                            className={`w-16 h-16 rounded-full ${colorMap.badge.bg} flex items-center justify-center mb-4`}
                          >
                            <StepIcon
                              className={`h-8 w-8 ${colorMap.badge.text}`}
                            />
                          </div>
                          <div
                            className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold`}
                            style={{
                              backgroundColor: gradientFrom,
                              backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                            }}
                          >
                            {index + 1}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Connector Arrow (only between cards) */}
                    {index < 2 && (
                      <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                        <div
                          className={`w-8 h-8 bg-white dark:bg-gray-900 rounded-full border ${colorMap.badge.border} flex items-center justify-center shadow-sm`}
                        >
                          <ChevronRight
                            className={`h-5 w-5 ${colorMap.badge.text}`}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-16 text-center"
          >
            <Button
              size="lg"
              className={`${colorMap.button.bg} text-white px-8`}
              style={{
                backgroundColor: gradientFrom,
                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
              }}
            >
              <Link href={generateUrl ?? "#"}> Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`py-16 md:py-24 dark:bg-gray-950 ${colorMap.section.full}`}
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className={`mb-4 px-3 py-1 ${colorMap.badge.border} ${colorMap.badge.text} bg-${primaryColor}-100 dark:bg-${primaryColor}-900/30`}
            >
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have simplified their{" "}
              {type === "terms" ? "legal compliance" : `${type} compliance`}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-white dark:bg-gray-900 border ${colorMap.badge.border} rounded-xl p-6 shadow-sm`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className={`mb-4 px-3 py-1 ${colorMap.badge.border} ${colorMap.badge.text} ${colorMap.badge.bg}`}
            >
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about our{" "}
              {type === "terms" ? "terms and conditions" : `${type} policy`}{" "}
              generator
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`border ${colorMap.badge.border} rounded-xl overflow-hidden`}
              >
                <details className="group">
                  <summary
                    className={`flex items-center justify-between gap-2 p-6 cursor-pointer ${colorMap.badge.bg} hover:bg-${primaryColor}-100 dark:hover:bg-${primaryColor}-900/30 transition-colors`}
                  >
                    <h3 className="text-lg font-medium">{item.question}</h3>
                    <div className="group-open:rotate-180 transition-transform">
                      <ChevronRight className="h-5 w-5 rotate-90" />
                    </div>
                  </summary>
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </div>
                </details>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Still have questions?
            </p>
            <Button
              variant="outline"
              className={`${colorMap.button.outline.border} ${colorMap.button.outline.text} ${colorMap.button.outline.hover}`}
            >
              <Link href={pages.contact}>Contact Support</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-16 md:py-24 text-white`}
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {ctaTitle}
                  </h2>
                  <p className={`text-${primaryColor}-100 mb-6 text-lg`}>
                    {ctaDescription}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className={`bg-white text-${primaryColor}-700 hover:bg-${primaryColor}-50`}
                    >
                      Generate{" "}
                      {type === "terms"
                        ? "Terms & Conditions"
                        : `${
                            type.charAt(0).toUpperCase() + type.slice(1)
                          } Policy`}
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                  className="hidden md:block"
                >
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-${primaryColor}-400/20 blur-3xl rounded-full`}
                    ></div>
                    <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className="text-sm text-${primaryColor}-100 ml-2">
                          {type === "privacy" && "Privacy Policy Preview"}
                          {type === "terms" && "Terms & Conditions Preview"}
                          {type === "cookie" && "Cookie Policy Preview"}
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 bg-white/20 rounded-full w-full"
                          ></div>
                        ))}
                        <div className="h-4 bg-white/20 rounded-full w-3/4"></div>
                        <div className="h-10 mt-4"></div>
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 bg-white/20 rounded-full w-full"
                          ></div>
                        ))}
                        <div className="h-4 bg-white/20 rounded-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
