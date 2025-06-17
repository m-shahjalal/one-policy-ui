"use client";

import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { BarChart3, BookOpenText, LucideProps, TrendingUp } from "lucide-react";
import React from "react";

export type StatsData = {
  title: string;
  value: string;
  icon: React.ComponentType<LucideProps>;
  change: string;
};

const statsData = [
  {
    title: "Total Documents",
    value: "24",
    icon: BookOpenText,
    change: "+2 this week",
  },
  {
    title: "Total Views",
    value: "3,721",
    icon: BarChart3,
    change: "+12% from last month",
  },
  {
    title: "Last 24h Views",
    value: "165",
    icon: TrendingUp,
    change: "+5% from yesterday",
  },
];

export const Statistics = () => {
  const { user } = useAuth();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600 mt-1 dark:text-gray-400">
          Here&#39;s what&#39;s happening with your documents today.
        </p>
      </motion.div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>
    </>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<LucideProps>;
  change: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/80 rounded-xl p-6 shadow-sm border border-gray-200/50 dark:bg-gray-900/70 dark:border-gray-800/50 hover:shadow-md transition-shadow backdrop-blur-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-green-600 mt-1 dark:text-green-400">
          {change}
        </p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </motion.div>
);
