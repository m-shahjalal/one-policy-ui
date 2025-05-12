"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X, Cookie, Shield, BarChart, Target } from "lucide-react";

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: CookieSettings) => void;
  initialSettings?: CookieSettings;
}

export interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieSettingsModal({
  isOpen,
  onClose,
  onSave,
  initialSettings = {
    essential: true,
    analytics: true,
    marketing: true,
  },
}: CookieSettingsModalProps) {
  const [settings, setSettings] = useState<CookieSettings>(initialSettings);

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const handleToggle = (key: keyof CookieSettings) => {
    if (key === "essential") return; // Essential cookies cannot be disabled

    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const cookieTypes = [
    {
      id: "essential",
      name: "Essential Cookies",
      description:
        "These cookies are necessary for the website to function properly and cannot be disabled.",
      icon: Shield,
      color: "text-blue-500",
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors interact with our website, helping us improve our services.",
      icon: BarChart,
      color: "text-purple-500",
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      description:
        "These cookies are used to track visitors across websites to display relevant advertisements.",
      icon: Target,
      color: "text-emerald-500",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-md opacity-80"></div>
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                      <Cookie className="w-6 h-6" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold dark:text-white">
                    Cookie Settings
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Customize your cookie preferences. Essential cookies are
                necessary for the website to function properly and cannot be
                disabled.
              </p>

              <div className="space-y-6 mb-8">
                {cookieTypes.map((type) => (
                  <div
                    key={type.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <type.icon className={`w-5 h-5 mt-0.5 ${type.color}`} />
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-200">
                            {type.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>

                      <Switch
                        checked={settings[type.id as keyof CookieSettings]}
                        onCheckedChange={() =>
                          handleToggle(type.id as keyof CookieSettings)
                        }
                        disabled={type.id === "essential"}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
