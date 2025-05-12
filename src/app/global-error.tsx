"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden text-center"
          >
            {/* Decorative top border */}
            <div className="h-1 w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

            <div className="p-8">
              <div className="mb-6 inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full blur-xl opacity-70"></div>
                  <div className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg mx-auto">
                    <AlertTriangle className="w-10 h-10" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Something Went Wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We&apos;re sorry, but something went wrong on our end. Please
                try again or come back later.
              </p>

              <div className="mb-4">
                <Button
                  onClick={() => reset()}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>

              {error.digest && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Error ID:{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                    {error.digest}
                  </code>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
