"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Copy,
  Download,
  FileText,
  Clock,
  ChevronRight,
  Check,
  LinkIcon,
  Mail,
  ExternalLink,
  AlertCircle,
  FilePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { themeConfig, PolicyType } from "@/config/theme";
import { useTheme } from "next-themes";
import { pages } from "@/config/pages";

interface DetailsViewProps {
  type: PolicyType;
  title: string;
  description: string;
  lastUpdated: string;
  effectiveDate: string;
  policyText: string;
}

export function DetailsViewPage({
  type,
  title,
  description,
  lastUpdated,
  effectiveDate,
  policyText,
}: DetailsViewProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";
  const themeColors = themeConfig[type][currentTheme].primary;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(policyText);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPolicy = (format: string) => {
    toast(`Downloading ${format} file`);
    // In a real implementation, this would trigger an actual download
  };

  const getRelatedDocuments = () => {
    const documents = [
      {
        title: "Privacy Policy",
        description:
          "Protect your users' data with a comprehensive privacy policy.",
        icon: FileText,
        href: pages.privacies.index,
        color: "blue",
        type: "privacy",
      },
      {
        title: "Cookie Policy",
        description: "Inform users about the cookies used on your website.",
        icon: FilePlus,
        href: pages.cookies.index,
        color: "emerald",
        type: "cookie",
      },
      {
        title: "Terms & Conditions",
        description: "Set clear rules and guidelines for using your service.",
        icon: FileText,
        href: pages.terms.index,
        color: "purple",
        type: "terms",
      },
    ];

    // Filter out the current document
    return documents.filter((doc) => type !== doc.type);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 mt-24">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 order-2 lg:order-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/10 border border-gray-100 dark:border-gray-700 overflow-hidden lg:sticky lg:top-24">
            <div
              className={`p-4 sm:p-5 bg-gradient-to-r ${themeColors.bg} border-b border-gray-100 dark:border-gray-700`}
            >
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <Shield className={`h-5 w-5 ${themeColors.icon}`} />
                <span>Policy Tools</span>
              </h2>
            </div>

            <div className="p-4 sm:p-5">
              <Tabs defaultValue="view" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="view">View</TabsTrigger>
                  <TabsTrigger value="copy">Copy</TabsTrigger>
                  <TabsTrigger value="download">Download</TabsTrigger>
                </TabsList>

                <TabsContent value="view" className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>This is your {type} policy. You can:</p>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight
                          className={`h-4 w-4 ${themeColors.icon} mt-0.5 shrink-0`}
                        />
                        <span>View the full policy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight
                          className={`h-4 w-4 ${themeColors.icon} mt-0.5 shrink-0`}
                        />
                        <span>Copy to clipboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight
                          className={`h-4 w-4 ${themeColors.icon} mt-0.5 shrink-0`}
                        />
                        <span>Download in various formats</span>
                      </li>
                    </ul>
                  </div>

                  <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      This {type} policy should be reviewed by a legal
                      professional before use.
                    </AlertDescription>
                  </Alert>

                  <div
                    className={`flex items-center justify-between p-3 ${themeColors.bg} rounded-lg text-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className={`h-4 w-4 ${themeColors.icon}`} />
                      <span className="text-gray-700 dark:text-gray-300">
                        Effective: {effectiveDate}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                    >
                      Active
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="copy" className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      Copy your {type} policy as HTML or plain text to use on
                      your website.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={copyToClipboard}
                      className="w-full flex items-center justify-center gap-2"
                      variant={copied ? "outline" : "gradient"}
                      size="sm"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy to Clipboard</span>
                        </>
                      )}
                    </Button>

                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      You can also copy specific sections from the policy text
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="download" className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>Download your {type} policy in multiple formats:</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => downloadPolicy("PDF")}
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-500" />
                        <span>PDF Format</span>
                      </div>
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={() => downloadPolicy("DOCX")}
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>Word (DOCX)</span>
                      </div>
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={() => downloadPolicy("TXT")}
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span>Plain Text (TXT)</span>
                      </div>
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={() => downloadPolicy("HTML")}
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-orange-500" />
                        <span>HTML Format</span>
                      </div>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-gray-700">
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this {type} policy, please
                contact our support team.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Support</span>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 order-1 lg:order-2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/10 border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div
              className={`p-4 sm:p-5 bg-gradient-to-r ${themeColors.bg} border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3`}
            >
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <FileText className={`h-5 w-5 ${themeColors.icon}`} />
                <span>{title} Content</span>
              </h2>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={copyToClipboard}
                  size="sm"
                >
                  <Copy className="h-5 w-5 mr-2" />
                  <span className="text-sm">Copy</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <Download className="h-5 w-5 mr-2" />
                  <span className="text-sm">Download</span>
                </Button>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Active document
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Last updated: {lastUpdated}</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-sm sm:text-base">
                  {policyText}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Effective: {effectiveDate}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-700 dark:text-gray-200"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      <span>Copy Full Document</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="gradient"
                      className={`bg-gradient-to-r ${themeColors.from} ${themeColors.to} text-white`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/10 border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div
              className={`p-4 sm:p-5 bg-gradient-to-r ${themeColors.bg} border-b border-gray-100 dark:border-gray-700`}
            >
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <LinkIcon className={`h-5 w-5 ${themeColors.icon}`} />
                <span>Link to Your {title}</span>
              </h2>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                Copy the link to your {type} policy page. We host it for free.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
                <div className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-l-lg sm:rounded-r-none px-3 py-2 text-gray-700 dark:text-gray-300 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                  https://policymint.com/{type}-policy/t8f7s9d8f7s9d8f7s9d8f7
                </div>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://policymint.com/${type}-policy/t8f7s9d8f7s9d8f7s9d8f7`
                    );
                    toast("Link copied");
                  }}
                  size="sm"
                  variant="gradient"
                  className={`sm:rounded-l-none sm:rounded-r-lg bg-gradient-to-r ${themeColors.from} ${themeColors.to} text-white`}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  <span>Copy</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-3 flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      Free revisions
                    </p>
                    <p className="text-green-700 dark:text-green-400">
                      Free page updates and revisions.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-3 flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      Free hosting
                    </p>
                    <p className="text-green-700 dark:text-green-400">
                      Free page hosting by us.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-3 flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      Good SEO
                    </p>
                    <p className="text-green-700 dark:text-green-400">
                      Page is not indexable by Google.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-3 flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      Discounted upgrades
                    </p>
                    <p className="text-green-700 dark:text-green-400">
                      Discounts on major upgrades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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
            {getRelatedDocuments().map((doc) => (
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

      <div className="mt-8 sm:mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Disclaimer: Legal information is not legal advice. Read the{" "}
          <a
            href={pages.ourTerms}
            className={`text-${themeColors.text} hover:underline`}
          >
            disclaimer
          </a>
          .
        </p>
      </div>
    </div>
  );
}
