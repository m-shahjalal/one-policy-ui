"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pages } from "@/config/routes";
import { themeConfig } from "@/config/theme";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink, FilePlus, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { JSX } from "react";
import { PolicyDetailsInner } from "../blocks/policy-details";

interface DetailsViewProps {
  type: "privacies" | "cookies" | "terms";
  title: string;
  slug: string;
  description: string;
  lastUpdated: string;
  effectiveDate: string;
  policyText: string;
  policyComponent: JSX.Element;
}

export function DetailsViewPage({
  slug,
  type,
  title,
  description,
  lastUpdated,
  effectiveDate,
  policyText,
  policyComponent,
}: DetailsViewProps) {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";
  const themeColors = themeConfig[type][currentTheme].primary;

  const getRelatedDocuments = () => {
    const documents = [
      {
        title: "Privacy Policy",
        description:
          "Protect your users' data with a comprehensive privacy policy.",
        icon: FileText,
        href: pages.policies.privacies.index,
        color: "blue",
        type: "privacies",
      },
      {
        title: "Cookie Policy",
        description: "Inform users about the cookies used on your website.",
        icon: FilePlus,
        href: pages.policies.cookies.index,
        color: "emerald",
        type: "cookies",
      },
      {
        title: "Terms & Conditions",
        description: "Set clear rules and guidelines for using your service.",
        icon: FileText,
        href: pages.policies.terms.index,
        color: "purple",
        type: "terms",
      },
    ] as const;

    return documents.filter((doc) => type.toLowerCase() !== doc.type);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 mt-24">
      <ViewHeader
        themeColors={themeColors}
        title={title}
        description={description}
        lastUpdated={lastUpdated}
      />

      <PolicyDetailsInner
        effectiveDate={effectiveDate}
        policyText={policyText}
        slug={slug}
        type={type}
        themeColors={themeColors as unknown as FIX_ME}
        policyComponent={policyComponent}
        title={title}
        lastUpdate={lastUpdated}
      />

      <ViewFooter themeColors={themeColors} documents={getRelatedDocuments()} />
    </div>
  );
}

const ViewHeader = ({
  themeColors,
  title,
  description,
  lastUpdated,
}: {
  themeColors: Record<string, FIX_ME>;
  title: string;
  description: string;
  lastUpdated: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-6 sm:mb-8 text-center"
  >
    <Badge
      variant="outline"
      className={`mb-3 sm:mb-4 px-3 py-1 text-sm ${themeColors.badge.bg} ${themeColors.badge.text} ${themeColors.badge.border}`}
    >
      Last updated: {lastUpdated}
    </Badge>
    <h1
      className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r ${themeColors.from} ${themeColors.to} bg-clip-text text-transparent`}
    >
      {title}
    </h1>
    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
      {description}
    </p>
  </motion.div>
);

const ViewFooter = ({
  themeColors,
  documents,
}: {
  themeColors: Record<string, FIX_ME>;
  documents: {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    color: string;
    type: string;
  }[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="mt-8 sm:mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/10 border border-gray-100 dark:border-gray-700 overflow-hidden"
  >
    <div
      className={`p-4 sm:p-5 bg-gradient-to-r ${themeColors.bg} border-b border-gray-100 dark:border-gray-700`}
    >
      <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
        <ExternalLink className={`h-5 w-5 ${themeColors.icon}`} />
        <span>Related Documents</span>
      </h2>
    </div>

    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {documents.map((doc) => (
          <div
            key={doc.href}
            className={`bg-gradient-to-br from-${doc.color}-50 to-${doc.color}-100 dark:from-${doc.color}-950/50 dark:to-${doc.color}-900/50 rounded-xl p-4 sm:p-5 border border-${doc.color}-200 dark:border-${doc.color}-800 group hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center mb-4">
              <div className="relative mr-4">
                <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full blur-md opacity-80"></div>
                <div
                  className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-${doc.color}-200 dark:border-${doc.color}-800 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <doc.icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-${doc.color}-500 dark:text-${doc.color}-400`}
                  />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                {doc.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {doc.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              className={`w-full border-${doc.color}-200 dark:border-${doc.color}-800`}
              asChild
            >
              <a href={doc.href}>
                <span>View Document</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);
