import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apis, pages } from "@/config/routes";
import { useConfirmation } from "@/hooks/use-modal";
import { formatDate } from "@/lib/date";
import fetcher from "@/lib/fetcher";
import { Policy } from "@/lib/type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import {
  BookOpenText,
  Calendar,
  Edit,
  Eye,
  Link2,
  Link2Off,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const TableBody = ({ policies }: { policies: Policy[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <THead />
        <tbody className="bg-white/50 dark:bg-gray-900/50 divide-y divide-gray-200/50 dark:divide-gray-800/50 backdrop-blur-sm">
          {policies.length > 0 ? (
            policies.map((policy) => <TRow key={policy.id} policy={policy} />)
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center">
                  <BookOpenText className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    No policies found
                  </h3>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const THead = () => (
  <thead className="bg-gray-50 dark:bg-gray-800">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Policy
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Status
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Type
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Views
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Last Updated
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
);

const TRow = ({ policy }: { policy: Policy }) => {
  const handleCopyLink = () => {
    if (policy.status !== "published") {
      return toast.error("Policy is not published yet!");
    }

    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/share/${policy.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <motion.tr
      key={policy.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
    >
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <BookOpenText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {policy.title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ID: {policy.id}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge
          className="capitalize"
          variant={
            policy.status === "published"
              ? "default"
              : policy.status === "draft"
              ? "outline"
              : "secondary"
          }
        >
          {policy.status || "Unknown"}
        </Badge>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
        {policy.policy_type}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center text-sm text-gray-900 dark:text-white">
          <Eye className="h-4 w-4 text-gray-400 mr-1" />
          {policy.view_count || 0}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center text-sm text-gray-900 dark:text-white">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          {formatDate(policy.updated_at || policy.created_at)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            {policy.status === "published" ? (
              <Link2 className="h-4 w-4 dark:text-gray-200 text-gray-600" />
            ) : (
              <Link2Off className="h-4 w-4 dark:text-gray-600 text-gray-400" />
            )}
          </button>
          <TAction policy={policy} />
        </div>
      </td>
    </motion.tr>
  );
};

const TAction = ({ policy }: { policy: Policy }) => {
  const { confirmDelete } = useConfirmation();
  const router = useRouter();

  const handleDelete = () => {
    confirmDelete({
      itemName: policy.title,
      description: "Are you sure you want to delete this policy?",
      onConfirm: async () => {
        try {
          const result = await fetcher.delete<{ success: boolean }>(
            apis.policies.delete(policy.id)
          );
          if (!result.success) {
            toast.error("Failed to delete policy!");
            return;
          }
          router.refresh();
          toast.success("Policy deleted successfully!");
        } catch (error) {
          console.error(error);
          toast.error("Failed to delete policy!");
        }
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-gray-800">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-0" />
        <DropdownMenuItem className="py-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer">
          <Link
            className="flex gap-1 px-2 items-center"
            href={pages.dashboard.view(policy.id)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer">
          <Link
            className="flex gap-1 px-2 items-center"
            href={pages.dashboard.edit(policy.id)}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDelete}
          className="flex gap-1 px-2 items-center py-2 cursor-pointer text-red-500"
        >
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
