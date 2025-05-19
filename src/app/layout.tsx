'use client"';

import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "OnePolicy – Generate Legal Pages in Seconds",
  description:
    "Privacy Policy, Terms & Conditions, Cookie Policy — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={cn(
          jost.className,
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen"
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
