import MDXContent from "@/components/blocks/mdx-content";
import { DetailsViewPage } from "@/components/shared/details-view";
import { apis } from "@/config/routes";
import { Policy } from "@/lib/type";
import { format } from "date-fns";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apis.policies.view(id)}`;
  const response = await fetch(url);
  const { data }: { data: Policy } = await response.json();

  return (
    <DetailsViewPage
      type="privacies"
      title="Privacy Policy"
      description="This Privacy Policy explains how OnePolicy collects, uses, and discloses your information and explains the rights you have with respect to your information."
      lastUpdated={format(data.updated_at ?? data.created_at, "d MMM, yyyy")}
      effectiveDate={format(data.effect_date ?? "", "d MMM, yyyy")}
      policyComponent={<MDXContent source={data.markdown} />}
      policyText={data.markdown}
      slug={data.id}
    />
  );
}
