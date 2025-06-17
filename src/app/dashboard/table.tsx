"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { TableBody } from "./table-body";
import { Policy } from "@/lib/type";

export const DashboardTable = ({ policies }: { policies: Policy[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated_at");

  const filteredPolicies = policies
    .filter((policy) => {
      const matchesSearch =
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.policy_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.markdown?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || policy.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "view_count")
        return (b.view_count || 0) - (a.view_count || 0);
      if (sortBy === "updated_at") {
        const dateA = new Date(a.updated_at || a.created_at || 0);
        const dateB = new Date(b.updated_at || b.created_at || 0);
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 dark:bg-gray-900/80 shadow-sm border border-gray-200/50 dark:border-gray-800/50 rounded-lg backdrop-blur-lg"
    >
      {/* Table Header */}
      <TableHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {/* Table */}
      <TableBody policies={filteredPolicies} />

      {/* Table Footer */}
      <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 rounded-b-md">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {filteredPolicies.length} of {policies.length}
            policies
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TableHeader = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}) => {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Policy Documents
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage and track your policy documents
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <StatusFilter filter={statusFilter} setFilter={setStatusFilter} />
          <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search policies..."
        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:ring-0 sm:w-64 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 h-11"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

const StatusFilter = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[140px] justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 h-11"
        >
          <span>
            {filter === "all"
              ? "All Status"
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[140px]">
        <DropdownMenuItem onSelect={() => setFilter("all")}>
          All Status
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setFilter("published")}>
          Published
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setFilter("draft")}>
          Draft
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setFilter("archived")}>
          Archived
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SortFilter = ({
  sortBy,
  setSortBy,
}: {
  sortBy: string;
  setSortBy: (sort: string) => void;
}) => {
  const getSortLabel = (value: string) => {
    switch (value) {
      case "updated_at":
        return "Last Updated";
      case "title":
        return "Title";
      case "view_count":
        return "Views";
      default:
        return value;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[150px] justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 h-11"
        >
          {getSortLabel(sortBy)}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[140px]">
        <DropdownMenuItem onClick={() => setSortBy("updated_at")}>
          Last Updated
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy("title")}>
          Title
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy("view_count")}>
          Views
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
