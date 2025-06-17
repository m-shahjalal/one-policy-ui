import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { pages } from "@/config/routes";
import { Plus } from "lucide-react";
import Link from "next/link";

export const DashboardHeader = () => {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-6">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Policy Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your organization&#39;s policies
            </p>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/10">
                  <Plus className="h-4 w-4" />
                  New Policy
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-gray-800">
                <DropdownMenuLabel>New policy</DropdownMenuLabel>
                <DropdownMenuSeparator className="mb-0" />
                <DropdownMenuItem className="flex gap-1 px-2 items-center py-3 border my-1 cursor-pointer">
                  <Link
                    className="flex gap-1 px-2 items-center"
                    href={pages.policies.cookies.create}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create Cookie Policy</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex gap-1 px-2 items-center py-3 border my-1 cursor-pointer">
                  <Link
                    className="flex gap-1 px-2 items-center"
                    href={pages.policies.terms.create}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create Terms & Conditions</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex gap-1 px-2 items-center py-3 border mt-1 cursor-pointer">
                  <Link
                    className="flex gap-1 px-2 items-center"
                    href={pages.policies.privacies.create}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create Privacy Policy</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
