"use client";

import Link from "next/link";
import {
  Shield,
  Mail,
  Phone,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR Compliance", href: "/gdpr" },
  ];

  const resourceLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
    { label: "Documentation", href: "/docs" },
    { label: "API", href: "/api" },
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
              >
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                OnePolicy
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Generate professional legal documents for your business or website
              in minutes. No legal expertise required.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600 dark:text-gray-300 group">
                <Mail className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                <a
                  href="mailto:hello@onepolicy.com"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  hello@onepolicy.com
                </a>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 group">
                <Phone className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  (123) 456-7890
                </a>
              </div>
            </div>

            <div className="mt-6">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                Get Started Free
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Stay updated
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Subscribe to our newsletter for the latest updates and legal
                compliance tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} OnePolicy. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ y: -3 }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-300 border border-transparent hover:border-blue-100 dark:hover:border-blue-900"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
