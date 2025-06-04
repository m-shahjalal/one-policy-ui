"use client";

import { motion, number } from "framer-motion";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex min-h-screen">
        {/* Left Side - Professional Visual Section */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Base Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

          {/* Minimal Geometric Elements */}
          <div className="absolute inset-0">
            {/* Large subtle circle */}
            <motion.div
              className="absolute w-96 h-96 border border-white/5 rounded-full"
              style={{ top: "10%", left: "-10%" }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 60,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Medium circle */}
            <motion.div
              className="absolute w-64 h-64 border border-white/3 rounded-full"
              style={{ bottom: "20%", right: "-5%" }}
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 80,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Small accent dots */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-secondary rounded-full"
                style={{
                  top: `${30 + i * 20}%`,
                  left: `${20 + i * 15}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 1.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Subtle Glass Overlay */}
          <div className="absolute inset-0 backdrop-blur-[0.5px] bg-gradient-to-br from-black/5 to-black/20" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl font-light mb-8 leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #ffffff80 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Secure
                <br />
                <span className="font-medium">Authentication</span>
              </motion.h1>

              <motion.p
                className="text-lg text-white/70 mb-12 leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Experience seamless and secure access to your account with our
                modern authentication system.
              </motion.p>

              {/* Minimal Feature List */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {[
                  { icon: "🔐", text: "Enterprise Security" },
                  { icon: "⚡", text: "Instant Access" },
                  { icon: "🌍", text: "Global Reach" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-sm">
                      {feature.icon}
                    </div>
                    <span className="text-white/80 font-light">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Bottom Accent Flashing Left to Right */}
            <div className="absolute bottom-16 left-16 right-16 h-px">
              <motion.div
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ x: "-40%", opacity: 0.2 }}
                animate={{ x: "200%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative border-l border-slate-600/30">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              {children}

              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute top-1/6 right-1/6 w-64 h-64 rounded-full blur-3xl opacity-30"
                  style={{
                    background: `radial-gradient(circle, rgb(34, 197, 94) 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute bottom-1/6 left-1/6 w-64 h-64 rounded-full blur-3xl opacity-30"
                  style={{
                    background: `radial-gradient(circle, rgb(236, 72, 153) 0%, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
