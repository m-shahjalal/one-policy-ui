import MDXContent from "@/components/blocks/mdx-content";
import { DetailsViewPage } from "@/components/shared/details-view";
import { apis } from "@/config/routes";

interface CookiePolicyData {
  id: string;
  updated_at: string;
  Effect_date: string;
  Markdown: string;
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apis.cookies.view(id)}`;
  const response = await fetch(url);
  const { data }: { data: CookiePolicyData } = await response.json();

  return (
    <DetailsViewPage
      type="terms"
      title="Terms and Conditions"
      description="These Terms and Conditions govern your use of our website and services."
      lastUpdated={data.updated_at}
      effectiveDate={data.Effect_date}
      policyComponent={<MDXContent source={data.Markdown} />}
      policyText={data.Markdown}
      slug={data.id}
    />
  );
}
