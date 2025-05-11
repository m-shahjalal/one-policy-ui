"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuIcon, FileText, X, ChevronRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ui/theme-toggle";

const NavLink = ({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer hover:bg-white/20 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-200 ${className}`}
    prefetch={false}
    onClick={onClick}
  >
    {children}
  </Link>
);

const MobileMenu = ({
  links,
}: {
  links: { label: string; href: string; icon?: React.ElementType }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/20 dark:hover:bg-gray-800/30"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-r border-gray-200 dark:border-gray-800"
      >
        <div className="flex justify-between items-center mb-6">
          <SheetTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            OnePolicy
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetClose>
        </div>

        <div className="flex flex-col h-full">
          <div className="px-2 py-4 mb-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Generate your legal pages in seconds with our easy-to-use
              platform.
            </p>
          </div>

          <nav className="flex-1 flex flex-col gap-y-1 mt-2">
            {links.map((link) => {
              const Icon = link.icon || ChevronRight;
              return (
                <SheetClose asChild key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>{link.label}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="px-4 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 OnePolicy
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DesktopNav = ({
  links,
}: {
  links: { label: string; href: string; icon?: React.ElementType }[];
}) => (
  <nav className="hidden lg:flex lg:items-center lg:space-x-1">
    {links.map((link) => (
      <NavLink key={link.label} href={link.href}>
        {link.label}
      </NavLink>
    ))}
    <div className="ml-4 flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-4">
      <ThemeToggle />
      <Button className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
        Get Started
      </Button>
    </div>
  </nav>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/", icon: Shield },
    { label: "Features", href: "/features", icon: FileText },
    { label: "Pricing", href: "/pricing", icon: FileText },
    { label: "Contact", href: "/contact", icon: FileText },
    { label: "Privacy Policy", href: "/privacy-policy", icon: FileText },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`max-w-[1248px] mx-auto mt-4 ${
          scrolled ? "h-14" : "h-16"
        } transition-all duration-200 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-md dark:shadow-gray-950/20 border border-gray-200/30 dark:border-gray-800/30`}
      >
        <div className="relative flex items-center justify-between h-full px-4 rounded-2xl">
          <div className="flex items-center lg:hidden">
            <MobileMenu links={links} />
          </div>

          <div className="flex-1 flex items-center justify-center lg:justify-start">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
            >
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              OnePolicy
            </Link>
          </div>

          <DesktopNav links={links} />
        </div>
      </motion.div>
    </header>
  );
}
