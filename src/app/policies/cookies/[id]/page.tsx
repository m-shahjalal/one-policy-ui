import MDXContent from "@/components/blocks/mdx-content";
import { DetailsViewPage } from "@/components/shared/details-view";
import { apis } from "@/config/routes";
import fetcher from "@/lib/fetcher";
import { cleanMDXContent } from "@/lib/mdx";

interface CookiePolicyData {
  id: string;
  updated_at: string;
  Effect_date: string;
  Markdown: string;
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetcher.get<CookiePolicyData>(apis.cookies.view(id));

  return (
    <DetailsViewPage
      slug={data.id}
      type="cookies"
      title="Cookie Policy"
      description="This Cookie Policy explains how OnePolicy uses cookies and similar technologies to enhance your browsing experience."
      lastUpdated={data.updated_at}
      effectiveDate={data.Effect_date}
      policyComponent={<MDXContent source={cleanMDXContent(data.Markdown)} />}
      policyText={data.Markdown}
    />
  );
}
