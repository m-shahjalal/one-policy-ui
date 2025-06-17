import { apis } from "@/config/routes";
import fetcher from "@/lib/fetcher";
import { Policy } from "@/lib/type";
import { PolicyEdit } from "./edit-form";

export default async function CookiePolicyGeneratorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await fetcher.get<{ data: Policy }>(apis.policies.view(id));
  return (
    <div className="container mx-auto max-w-7xl mt-10 px-4">
      <PolicyEdit data={data} />
    </div>
  );
}
