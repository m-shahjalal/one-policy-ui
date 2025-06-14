"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Shield } from "lucide-react";
import Link from "next/link";
import type React from "react";

// Simplified background with CSS-only animations
function LightweightBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />

      {/* Simplified floating orbs with CSS animations */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      {/* Static star field */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

interface OnePolicyHeroProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  features?: string[];
}

const OnePolicyHero: React.FC<OnePolicyHeroProps> = ({
  title = "Generate Legal Pages for Your Website in Seconds",
  subtitle = "Privacy Policy, Terms & Conditions, Cookie Policy — all in one place.",
  primaryButtonText = "Get Started Free",
  features = [
    "No signup required",
    "PDF export",
    "100% Free",
    "GDPR Compliant",
  ],
}) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <LightweightBackground />

      <div className="relative z-10 w-full h-[calc(100vh-76px)] flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-5xl w-full text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white border border-white/20">
            <Shield size={16} className="text-blue-300" />
            <span className="text-sm">Legal compliance made simple</span>
          </div>

          {/* Main heading with subtle animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {subtitle}
          </p>

          {/* CTA Button */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="#feature-list">{primaryButtonText}</Link>
            </Button>
          </div>

          {/* Features */}
          <div
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-200">
                <Check size={18} className="mr-1.5 text-green-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="w-10 h-14 border-2 border-white/30 rounded-full flex justify-center mb-2">
            <div className="w-1.5 h-3 bg-white rounded-full mt-3 animate-bounce" />
          </div>
          <span className="text-white/70 text-sm font-medium flex items-center gap-1">
            Scroll Down <ChevronDown size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default OnePolicyHero;
