"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StepWrapperProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
  borderColor: string;
  stepNumber?: number;
  children: React.ReactNode;
}

export function StepWrapper({
  title,
  description,
  icon: IconComponent,
  color,
  bgColor,
  borderColor,
  stepNumber,
  children,
}: StepWrapperProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Enhanced Header */}
      <motion.div variants={headerVariants}>
        <div
          className={`${bgColor} border ${borderColor} overflow-hidden relative rounded-xl py-4`}
        >
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3,
                }}
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
              >
                <IconComponent className="h-8 w-8 text-white" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                  {stepNumber && (
                    <Badge variant="secondary" className="text-xs font-medium">
                      Step {stepNumber}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </CardHeader>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div className="flex flex-col gap-6" variants={itemVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
