import "./globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Navbar from "@/components/header";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";

const jost = Jost({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "OnePolicy – Generate Legal Pages in Seconds",
  description:
    "Privacy Policy, Terms & Conditions, Cookie Policy — all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          jost.className,
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
