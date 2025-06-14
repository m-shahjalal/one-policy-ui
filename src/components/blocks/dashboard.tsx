"use client";

import { User as UserType } from "@/app/auth/action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpenText,
  ChartNoAxesCombined,
  Search,
} from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "../dashboard-header";

// Sample data
const recentDocuments = [
  {
    id: 1,
    title: "Privacy Policy",
    status: "Published",
    date: "2 hours ago",
    views: 245,
  },
  {
    id: 2,
    title: "Terms of Service",
    status: "Draft",
    date: "Yesterday",
    views: 0,
  },
  {
    id: 3,
    title: "Cookie Policy",
    status: "Published",
    date: "3 days ago",
    views: 189,
  },
  {
    id: 4,
    title: "GDPR Compliance",
    status: "Review",
    date: "1 week ago",
    views: 56,
  },
  {
    id: 5,
    title: "Refund Policy",
    status: "Published",
    date: "2 weeks ago",
    views: 321,
  },
  {
    id: 6,
    title: "Privacy Policy",
    status: "Published",
    date: "2 hours ago",
    views: 245,
  },
  {
    id: 7,
    title: "Terms of Service",
    status: "Draft",
    date: "Yesterday",
    views: 0,
  },
  {
    id: 8,
    title: "Cookie Policy",
    status: "Published",
    date: "3 days ago",
    views: 189,
  },
  {
    id: 9,
    title: "GDPR Compliance",
    status: "Review",
    date: "1 week ago",
    views: 56,
  },
  {
    id: 10,
    title: "Refund Policy",
    status: "Published",
    date: "2 weeks ago",
    views: 321,
  },
  {
    id: 11,
    title: "Privacy Policy",
    status: "Published",
    date: "2 hours ago",
    views: 245,
  },
];

const statsData = [
  { title: "Total Documents", value: "24", icon: BookOpenText },
  { title: "Total Views", value: "3,721", icon: BarChart3 },
  { title: "Last 24h Views", value: "165", icon: ChartNoAxesCombined },
];

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium">{title}</div>
              <div className="text-lg font-bold">{value}</div>
            </div>
            <div>
              <Icon className="h-12 w-12 text-blue-600/60 dark:text-blue-500/60" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function Dashboard({ user }: { user: UserType | null }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = recentDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
      <DashboardHeader user={user} />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 pt-20">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Here is what is happening with your documents today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 ">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Documents Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-none shadow-md bg-white dark:bg-slate-900">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Documents</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search documents..."
                        className="pl-9 h-9 w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <CardDescription>Manage your legal documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                          <th className="text-xs font-medium text-slate-500 dark:text-slate-400 text-left py-3 px-4">
                            Title
                          </th>
                          <th className="text-xs font-medium text-slate-500 dark:text-slate-400 text-left py-3 px-4">
                            Status
                          </th>
                          <th className="text-xs font-medium text-slate-500 dark:text-slate-400 text-left py-3 px-4">
                            Last Updated
                          </th>
                          <th className="text-xs font-medium text-slate-500 dark:text-slate-400 text-right py-3 px-4">
                            Views
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {filteredDocuments.length > 0 ? (
                          filteredDocuments.map((doc) => (
                            <motion.tr
                              key={doc.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                            >
                              <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-200">
                                {doc.title}
                              </td>
                              <td className="py-3 px-4">
                                <Badge
                                  variant={
                                    doc.status === "Published"
                                      ? "default"
                                      : doc.status === "Draft"
                                      ? "outline"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {doc.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-400">
                                {doc.date}
                              </td>
                              <td className="py-3 px-4 text-sm text-slate-500 dark:text-slate-400 text-right">
                                {doc.views}
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="py-6 text-center text-slate-500 dark:text-slate-400"
                            >
                              No documents found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    View All Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
