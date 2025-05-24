"use client";

import { SelectField, TextField } from "formify";
import { useFormContext } from "react-hook-form";
import type { CookieForm } from "../schema";
import { Card, CardContent } from "@/components/ui/card";
import { DateField } from "@/components/formify/components/fields/DateField";

export function Step1Form({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { watch } = useFormContext<CookieForm>();

  // Use watch to reactively update when the value changes
  const entityType = watch("stepOne.entityType");
  const isPersonal = entityType === "individual";

  return (
    <div className="space-y-6">
      <div className="rounded-lg pb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
      <Card variant="glass" className="border border-border">
        <CardContent>
          <div className="space-y-4">
            <TextField<CookieForm>
              name="stepOne.siteName"
              label="Website Name"
              placeholder="Enter your website name"
              description="The name of your website or application"
              required
            />
            <TextField<CookieForm>
              name="stepOne.siteURL"
              label="Website URL"
              placeholder="https://example.com"
              description="The full URL of your website"
              type="url"
              required
            />
            <SelectField<CookieForm>
              name="stepOne.entityType"
              label="Entity Type"
              description="The type of entity that owns the website"
              options={[
                { value: "business", text: "Business" },
                { value: "individual", text: "Individual" },
                { value: "nonprofit", text: "Non-Profit" },
                { value: "government", text: "Government" },
              ]}
              required
            />
          </div>
        </CardContent>
      </Card>

      {!isPersonal && (
        <Card variant="glass" className="border border-border">
          <CardContent>
            <h3 className="text-base font-medium mb-4">
              Organization Information
            </h3>
            <div className="space-y-4">
              <TextField<CookieForm>
                name="stepOne.organization.name"
                label="Organization Name"
                placeholder="Enter organization name"
                description="The legal name of your organization"
                required
              />
              <TextField<CookieForm>
                name="stepOne.organization.address"
                label="Organization Address"
                placeholder="Enter organization address"
                description="The registered address of your organization"
                required
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Card variant="glass" className="border border-border">
        <CardContent>
          <h3 className="text-base font-medium mb-4">Jurisdiction</h3>
          <div className="space-y-4">
            <TextField<CookieForm>
              name="stepOne.jurisdiction.country"
              label="Country"
              placeholder="Enter country"
              description="The country where your business operates"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField<CookieForm>
                name="stepOne.jurisdiction.state"
                label="State/Province"
                placeholder="Enter state/province"
                description="Optional: State or province"
              />
              <TextField<CookieForm>
                name="stepOne.jurisdiction.city"
                label="City"
                placeholder="Enter city"
                description="Optional: City or locality"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass" className="border border-border">
        <CardContent>
          <h3 className="text-base font-medium mb-4">Policy Dates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateField<CookieForm>
              name="stepOne.effectiveDate"
              label="Effective Date"
              required
            />
            <DateField<CookieForm>
              name="stepOne.lastUpdated"
              label="Last Updated"
              required
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
