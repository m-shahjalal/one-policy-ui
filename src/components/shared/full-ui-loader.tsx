"use client";

import { AnimatePresence, motion } from "framer-motion";

export function FullpageLoader() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 min-h-screen min-w-screen z-[99999900] bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 from-slate-100 to-slate-100"
      >
        <ScreenLoader />
      </motion.div>
    </AnimatePresence>
  );
}

function ScreenLoader() {
  // Define fancy gradient colors
  const gradientColors = {
    primary: "rgba(99, 102, 241, 0.8)", // Indigo
    secondary: "rgba(168, 85, 247, 0.8)", // Purple
    accent: "rgba(236, 72, 153, 0.7)", // Pink
    highlight: "rgba(59, 130, 246, 0.7)", // Blue
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Centered content with consistent spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Simplified elegant spinner */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: gradientColors.primary,
              borderRightColor: gradientColors.primary,
              opacity: 0.7,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Middle Ring */}
          <motion.div
            className="absolute inset-0 m-4 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: gradientColors.secondary,
              borderLeftColor: gradientColors.secondary,
              opacity: 0.7,
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute inset-0 m-8 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: gradientColors.accent,
              borderBottomColor: gradientColors.accent,
              opacity: 0.7,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Glowing center */}
          <motion.div
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md"
            style={{
              boxShadow: `0 0 20px 2px ${gradientColors.highlight}`,
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              rotate: [0, 200, 260, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Text with consistent spacing */}
        {/* Professional text */}
        <div className="text-center space-y-2">
          <motion.p
            className="text-sm font-medium dark:text-slate-300 text-slate-600"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Please wait while we process
          </motion.p>

          <motion.h2
            className="text-xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #6366f1)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Loading the destination actually...
          </motion.h2>
        </div>

        <motion.div
          className="flex justify-center gap-1.5 pt-0 mt-0"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-400"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.22,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top right glow */}
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${gradientColors.primary} 0%, transparent 70%)`,
          }}
        />

        {/* Bottom left glow */}
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${gradientColors.accent} 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}
