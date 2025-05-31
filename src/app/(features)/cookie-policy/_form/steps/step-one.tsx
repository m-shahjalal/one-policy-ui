"use client";

import { SelectField, TextField } from "formify";
import { useFormContext } from "react-hook-form";
import type { CookieForm } from "../schema";
import { Card, CardContent } from "@/components/ui/card";
import { DateField } from "@/components/formify/components/fields/DateField";
import { StepWrapper } from "@/components/shared/step-form-wrapper";

export function Step1Form({
  title,
  description,
  icon,
  color,
  bgColor,
  borderColor,
  stepNumber,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
  borderColor: string;
  stepNumber?: number;
}) {
  const { watch } = useFormContext<CookieForm>();

  // Use watch to reactively update when the value changes
  const entityType = watch("stepOne.entityType");
  const isPersonal = entityType === "individual";

  return (
    <StepWrapper
      title={title}
      description={description}
      icon={icon}
      color={color}
      bgColor={bgColor}
      borderColor={borderColor}
      stepNumber={stepNumber}
    >
      <Card variant="glass" className="border border-border/50 shadow-none">
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
        <Card variant="glass" className="border border-border/50 shadow-none">
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

      <Card variant="glass" className="border border-border/50 shadow-none">
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

      <Card variant="glass" className="border border-border/50 shadow-none">
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
    </StepWrapper>
  );
}
