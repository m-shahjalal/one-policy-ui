"use client";

import { pages } from "@/config/routes";
import { motion } from "framer-motion";
import { Cookie, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back button */}
        <Link
          href={pages.home}
          className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          {/* Decorative top border */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-md opacity-80"></div>
                <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                  <Cookie className="w-7 h-7" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                Cookie Policy
              </h1>
            </div>

            <div className="prose prose-blue max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:text-blue-600 dark:prose-headings:text-blue-400">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                OnePolicy uses cookies to enhance your experience. This Cookie
                Policy explains what cookies are, how we use them, and your
                choices regarding cookies.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                What Are Cookies?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Cookies are small data files stored on your device that help us
                improve your experience. They allow us to remember your
                preferences, understand how you use our site, and offer you
                relevant content.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Types of Cookies We Use
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Essential Cookies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    These cookies are necessary for the website to function
                    properly. They enable basic functions like page navigation
                    and access to secure areas of the website. The website
                    cannot function properly without these cookies.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Analytics Cookies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. This helps us improve our website and your
                    experience.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Functional Cookies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    These cookies enable the website to provide enhanced
                    functionality and personalization. They may be set by us or
                    by third-party providers whose services we have added to our
                    pages.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Marketing Cookies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    These cookies track your online activity to help advertisers
                    deliver more relevant advertising or to limit how many times
                    you see an ad. These cookies can share that information with
                    other organizations or advertisers.
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                How We Use Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We use cookies for analytics, preferences, and session
                management. This helps us understand how you use our site,
                remember your preferences, and provide a seamless experience.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Managing Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You can disable cookies through your browser settings. Please
                note that disabling certain cookies may affect the functionality
                of our website. You can also manage your cookie preferences
                using our Cookie Settings tool available at the bottom of every
                page.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Changes to This Cookie Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may update our Cookie Policy from time to time. We will
                notify you of any changes by posting the new Cookie Policy on
                this page and updating the &quot;Last Updated&quot; date.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have questions about our Cookie Policy, please contact us
                at support@onepolicy.app.
              </p>

              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                Last Updated: May 12, 2025
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
