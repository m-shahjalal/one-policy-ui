"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pages } from "@/config/routes";
import { downloadContent, DownloadType } from "@/lib/downloader";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Download,
  FileText,
  Mail,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export const PolicyDetailsInner = ({
  effectiveDate,
  policyText,
  slug,
  type,
  policyComponent,
  themeColors,
  title,
  lastUpdate,
}: {
  effectiveDate: string;
  policyText: string;
  slug: string;
  type: "privacies" | "cookies" | "terms";
  themeColors: Record<string, string>;
  policyComponent: JSX.Element;
  title: string;
  lastUpdate: string;
}) => {
  return (
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

          {/* tabs */}
          <TabContainer
            slug={slug}
            policyText={policyText}
            type={type}
            themeColors={themeColors}
          />

          <div className="p-4 sm:p-5 border-t">
            <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about this {type} policy, please contact
              our support team.
            </p>
            <Link href={pages.contact}>
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Support</span>
              </Button>
            </Link>

            <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                This {type} policy should be reviewed by a legal professional
                before use.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="printArea"
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
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Active document
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span>Effective from: {effectiveDate}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdate}</span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-sm sm:text-base">
                {policyComponent}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TabContainer = ({
  slug,
  policyText,
  themeColors,
  type,
}: {
  slug: string;
  policyText: string;
  themeColors: Record<string, FIX_ME>;
  type: "privacies" | "cookies" | "terms";
}) => {
  const pathname = usePathname();
  const [docCopied, setDocCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/share/${slug}`;

  const copyAsDoc = () => {
    setDocCopied(true);
    navigator.clipboard.writeText(policyText);
    toast.success("Markdown copied to clipboard");
    setTimeout(() => setDocCopied(false), 2000);
  };

  const copyUrl = () => {
    setUrlCopied(true);
    navigator.clipboard.writeText(shareUrl);
    toast.success("Shareable URL copied to clipboard");
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const downloadPolicy = async (format: DownloadType) => {
    toast.info(`Downloading ${format} file`);

    if (format === "HTML" || format === "PDF") {
      const content = document.getElementById("printArea");
      if (!content) return toast.error("Something wrong happen");
      downloadContent(format, content);
    }

    if (format === "MD" || format === "TXT") {
      downloadContent(format, policyText);
    }
  };

  return (
    <div className="p-4 sm:p-5">
      <Tabs defaultValue="copy" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="copy">Copy</TabsTrigger>
          <TabsTrigger value="download">Download</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p>This is your {type} policy. You can:</p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight
                  className={`h-4 w-4 ${themeColors.icon} mt-0.5 shrink-0`}
                />
                <span>Edit and update the raw content</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight
                  className={`h-4 w-4 ${themeColors.icon} mt-0.5 shrink-0`}
                />
                <span>You can edit by AI</span>
              </li>
            </ul>
          </div>

          <Link
            href={`${pathname}/edit`}
            className="w-full flex items-center justify-center gap-2 border border-gray-100 dark:border-gray-700 rounded-md py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-900 dark:text-gray-100 btn-gradient"
          >
            Go to edit page
          </Link>
        </TabsContent>

        <TabsContent value="copy" className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p>
              Copy your {type} policy as Markdown text to use on your website.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={copyAsDoc}
              className="w-full flex items-center justify-center gap-2"
              variant={docCopied ? "outline" : "default"}
              size="sm"
            >
              {docCopied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy the Markdown</span>
                </>
              )}
            </Button>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Copy the link to your {type} policy page. We host it for free.
              </p>

              <div className="flex flex-col items-stretch gap-2">
                <div className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {shareUrl}
                </div>
                <Button
                  onClick={copyUrl}
                  size="sm"
                  variant="gradient"
                  className={`sm:rounded-lg mt-2 bg-gradient-to-r ${themeColors.from} ${themeColors.to} text-white`}
                >
                  {urlCopied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      <span>Copy URL</span>
                    </>
                  )}
                </Button>
              </div>
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
              onClick={() => downloadPolicy("MD")}
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-stone-800" />
                <span>Markdown (.md)</span>
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
                <span>Plain Text</span>
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
  );
};
