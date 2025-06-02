"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie, X, ChevronRight, Shield } from "lucide-react";
import Link from "next/link";
import { pages } from "@/config/pages";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
  cookiePolicyUrl?: string;
}

export default function CookieConsent({
  onAccept,
  onDecline,
  cookiePolicyUrl = pages.policies.cookies.index,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent");

    if (cookieConsent === null) {
      // Show the consent popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
    onDecline();
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

              <div className="p-6 md:p-8">
                <div className="flex items-start">
                  <div className="relative shrink-0 mr-5">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-md opacity-80"></div>
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                      <Cookie className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold mb-2 dark:text-white">
                        Cookie Consent
                      </h3>
                      <button
                        onClick={() => setIsVisible(false)}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We use cookies to enhance your browsing experience, serve
                      personalized ads or content, and analyze our traffic. By
                      clicking &quot;Accept All&quot;, you consent to our use of
                      cookies.
                    </p>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200 flex items-center">
                              <Shield className="w-4 h-4 mr-2 text-blue-500" />
                              Cookie Types
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                              <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>
                                  <strong>Essential:</strong> Necessary for the
                                  website to function properly.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>
                                  <strong>Analytics:</strong> Help us understand
                                  how visitors interact with our website.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>
                                  <strong>Marketing:</strong> Allow us to
                                  provide personalized content and
                                  advertisements.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
                      <div className="flex-1 w-full sm:w-auto order-3 sm:order-1">
                        <Button
                          onClick={handleDecline}
                          variant="outline"
                          className="w-full border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                        >
                          Decline
                        </Button>
                      </div>

                      <button
                        onClick={toggleDetails}
                        className="order-1 sm:order-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center transition-colors"
                      >
                        <span>
                          {showDetails ? "Hide Details" : "Cookie Settings"}
                        </span>
                        <ChevronRight
                          className={`ml-1 w-4 h-4 transition-transform ${
                            showDetails ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      <div className="flex-1 w-full sm:w-auto order-2 sm:order-3">
                        <Button
                          onClick={handleAccept}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                        >
                          Accept All
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                      <Link
                        href={cookiePolicyUrl}
                        className="hover:text-blue-600 dark:hover:text-blue-400 underline"
                      >
                        View our Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
