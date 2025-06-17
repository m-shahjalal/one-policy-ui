import { apis } from "@/config/routes";
import fetcher from "@/lib/fetcher";
import { Policy } from "@/lib/type";
import { Statistics } from "./statistics";
import { DashboardTable } from "./table";

export default async function PolicyDashboard() {
  const data = await fetcher.get<{ data: Policy[] }>(apis.policies.index);
  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-gray-950 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Statistics />
        <DashboardTable policies={data.data} />
      </div>
    </div>
  );
}
