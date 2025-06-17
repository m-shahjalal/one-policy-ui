import NotFound from "@/app/not-found";
import MDXContent from "@/components/blocks/mdx-content";
import { DetailsViewPage } from "@/components/shared/details-view";
import { apis } from "@/config/routes";
import { Policy } from "@/lib/type";
import { format } from "date-fns";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apis.policies.view(id)}`;
  const response = await fetch(url);
  const { data }: { data: Policy } = await response.json();

  if (!data) return <NotFound />;

  return (
    <DetailsViewPage
      type="terms"
      title="Terms and Conditions"
      description="These Terms and Conditions govern your use of our website and services."
      lastUpdated={format(data.updated_at ?? data.created_at, "d MMM, yyyy")}
      effectiveDate={format(data.effect_date ?? "", "d MMM, yyyy")}
      policyComponent={<MDXContent source={data.markdown} />}
      policyText={data.markdown}
      slug={data.id}
    />
  );
}
