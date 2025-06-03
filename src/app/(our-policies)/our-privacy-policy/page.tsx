"use client";

import { pages } from "@/config/routes";
import { motion } from "framer-motion";
import { Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
                  <Shield className="w-7 h-7" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                Privacy Policy
              </h1>
            </div>

            <div className="prose prose-blue max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:text-blue-600 dark:prose-headings:text-blue-400">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This Privacy Policy describes how we collect, use, and protect
                your personal information when you use OnePolicy. We are
                committed to ensuring the privacy and security of your data.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We collect non-personal data to improve our service. If you sign
                up for an account, we store your email address and any documents
                you save. We may also collect usage data such as your IP
                address, browser type, and pages visited to enhance your
                experience.
              </p>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 mb-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Types of Data We Collect
                </h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  <li>
                    <strong>Account Information:</strong> Email address, name,
                    and password
                  </li>
                  <li>
                    <strong>Usage Data:</strong> IP address, browser type,
                    operating system, and pages visited
                  </li>
                  <li>
                    <strong>User Content:</strong> Information you provide when
                    generating legal documents
                  </li>
                  <li>
                    <strong>Cookies and Similar Technologies:</strong> Data
                    collected through cookies and similar tracking technologies
                  </li>
                </ul>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                How We Use Your Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your data is used to provide, personalize, and improve the
                service. Specifically, we use your information to:
              </p>

              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-6">
                <li>Provide and maintain our service</li>
                <li>Notify you about changes to our service</li>
                <li>
                  Allow you to participate in interactive features when you
                  choose to do so
                </li>
                <li>Provide customer support</li>
                <li>Monitor the usage of our service</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The security of your data is important to us. We implement
                appropriate security measures to protect against unauthorized
                access, alteration, disclosure, or destruction of your personal
                information. However, no method of transmission over the
                Internet or electronic storage is 100% secure.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Data Retention
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We will retain your personal information only for as long as is
                necessary for the purposes set out in this Privacy Policy. We
                will retain and use your information to the extent necessary to
                comply with our legal obligations, resolve disputes, and enforce
                our policies.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Your Data Protection Rights
              </h2>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 mb-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Under GDPR, you have the following rights:
                </h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  <li>
                    <strong>Right to Access:</strong> You have the right to
                    request copies of your personal data.
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> You have the right
                    to request that we correct any information you believe is
                    inaccurate or complete information you believe is
                    incomplete.
                  </li>
                  <li>
                    <strong>Right to Erasure:</strong> You have the right to
                    request that we erase your personal data, under certain
                    conditions.
                  </li>
                  <li>
                    <strong>Right to Restrict Processing:</strong> You have the
                    right to request that we restrict the processing of your
                    personal data, under certain conditions.
                  </li>
                  <li>
                    <strong>Right to Object to Processing:</strong> You have the
                    right to object to our processing of your personal data,
                    under certain conditions.
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> You have the
                    right to request that we transfer the data we have collected
                    to another organization, or directly to you, under certain
                    conditions.
                  </li>
                </ul>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may employ third-party companies and individuals to
                facilitate our service, provide the service on our behalf,
                perform service-related services, or assist us in analyzing how
                our service is used. These third parties have access to your
                personal information only to perform these tasks on our behalf
                and are obligated not to disclose or use it for any other
                purpose.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last Updated&quot; date. You
                are advised to review this Privacy Policy periodically for any
                changes.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have questions about this Privacy Policy, please contact
                us at support@onepolicy.app.
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
