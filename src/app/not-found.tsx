"use client";

import { motion } from "framer-motion";
import { FileQuestion, Home, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pages } from "@/config/pages";

export default function NotFound() {
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

  // Suggested pages
  const suggestedPages = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Home", href: "/" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden text-center"
        >
          {/* Decorative top border */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

          <div className="p-8 md:p-12">
            <motion.div variants={itemVariants} className="mb-6 inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-xl opacity-70"></div>
                <div className="relative z-10 w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg mx-auto">
                  <FileQuestion className="w-12 h-12" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Page Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved. Let&apos;s get you back on track.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
              <Link href={pages.home}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Or check out these pages:
              </h3>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {suggestedPages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.href}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                  >
                    {page.name}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500/5 rounded-full"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-500 rounded-full"
            style={{
              boxShadow: "0 0 20px 2px rgba(59, 130, 246, 0.5)",
              animation: "pulse 4s infinite",
            }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500 rounded-full"
            style={{
              boxShadow: "0 0 20px 2px rgba(168, 85, 247, 0.5)",
              animation: "pulse 4s infinite 1s",
            }}
          ></motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.8);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
