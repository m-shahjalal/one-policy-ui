"use client";

import { pages } from "@/config/routes";
import { motion } from "framer-motion";
import { FileText, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
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
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-md opacity-80"></div>
                <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                  <FileText className="w-7 h-7" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                Terms & Conditions
              </h1>
            </div>

            <div className="prose prose-blue max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:text-blue-600 dark:prose-headings:text-blue-400">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                By accessing or using OnePolicy, you agree to be bound by these
                Terms and Conditions. Please read them carefully before using
                our services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                By accessing or using our service, you agree to be bound by
                these Terms. If you disagree with any part of the terms, you may
                not access the service.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Use of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You agree to use the platform for lawful purposes only. You must
                not use the service in any way that causes, or may cause, damage
                to the service or impairment of the availability or
                accessibility of the service.
              </p>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 mb-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Prohibited Activities
                </h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  <li>Using the service for any unlawful purpose</li>
                  <li>
                    Attempting to gain unauthorized access to any part of the
                    service
                  </li>
                  <li>
                    Using the service to generate, distribute, or publish
                    offensive, illegal, or harmful content
                  </li>
                  <li>Impersonating another person or entity</li>
                  <li>
                    Interfering with or disrupting the service or servers or
                    networks connected to the service
                  </li>
                </ul>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The service and its original content, features, and
                functionality are and will remain the exclusive property of
                OnePolicy and its licensors. The service is protected by
                copyright, trademark, and other laws.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">User Accounts</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. Failure to
                do so constitutes a breach of the Terms, which may result in
                immediate termination of your account on our service.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                OnePolicy is not liable for any damages arising from the use of
                our service, including but not limited to direct, indirect,
                incidental, punitive, and consequential damages. The documents
                generated by our service are provided &quot;as is&quot; without
                any guarantees or warranties.
              </p>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800/30 mb-6">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                  Disclaimer
                </h3>
                <p className="text-yellow-700 dark:text-yellow-200 text-sm">
                  The legal documents generated by OnePolicy are templates and
                  should not be considered as legal advice. We recommend
                  consulting with a qualified legal professional before
                  implementing any legal documents for your business or website.
                </p>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">Termination</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">Changes</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We reserve the right to update or replace these Terms at any
                time. If a revision is material, we will try to provide at least
                30 days&apos; notice prior to any new terms taking effect.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                These Terms shall be governed and construed in accordance with
                the laws of [Your Country], without regard to its conflict of
                law provisions.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have any questions about these Terms, please contact us
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
