import MDXContent from "@/components/blocks/mdx-content";
import { DetailsViewPage } from "@/components/shared/details-view";
import { apis } from "@/config/routes";
import fetcher from "@/lib/fetcher";
import { cleanMDXContent } from "@/lib/mdx";
import { Policy } from "@/lib/type";
import { format } from "date-fns";

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await fetcher.get<{ data: Policy }>(apis.policies.view(id));
  if (!data) return null;

  return (
    <DetailsViewPage
      slug={data.id}
      type="cookies"
      title="Cookie Policy"
      description="This Cookie Policy explains how OnePolicy uses cookies and similar technologies to enhance your browsing experience."
      lastUpdated={format(data.updated_at ?? data.created_at, "d MMM, yyyy")}
      effectiveDate={format(data.effect_date ?? "", "d MMM, yyyy")}
      policyComponent={<MDXContent source={cleanMDXContent(data.markdown)} />}
      policyText={data.markdown}
    />
  );
}
