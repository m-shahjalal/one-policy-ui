import MDXContent from "@/components/blocks/mdx-content";
import { apis } from "@/config/routes";
import fetcher from "@/lib/fetcher";
import { cleanMDXContent } from "@/lib/mdx";
import { format } from "date-fns";
import { Clock, FileText, Sparkles } from "lucide-react";

interface CookiePolicyData {
  id: string;
  updated_at: string;
  effect_date: string;
  markdown: string;
  policy_type: string;
  created_at: string;
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apis.policies.view(slug)}`;
  const { data } = await fetcher.get<{ data: CookiePolicyData }>(url);

  const readableLastUpdated =
    data?.updated_at ?? data?.created_at
      ? format(data?.updated_at ?? data?.created_at, "d MMM, yyyy")
      : "Unknown";
  const readableEffective = data?.effect_date
    ? format(data?.effect_date, "d MMM, yyyy")
    : "Unknown";

  return (
    <div className="lg:col-span-2 order-1 lg:order-2 max-w-7xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
        <div
          className={`p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3`}
        >
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className={`h-5 w-5`} />
            <span>{data?.policy_type} Content</span>
          </h2>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Active document
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>Effective from: {readableEffective}</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Last updated: {readableLastUpdated}</span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base dark:text-gray-300">
            <div className="whitespace-pre-wrap">
              <MDXContent source={cleanMDXContent(data?.markdown ?? "")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
