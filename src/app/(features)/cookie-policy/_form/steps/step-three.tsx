"use client";

import { CheckboxField, SelectField, TextField } from "formify";
import { useFormContext } from "react-hook-form";
import type { CookieForm } from "../schema";
import { Card, CardContent } from "@/components/ui/card";

export function Step3Form({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { watch, formState } = useFormContext<CookieForm>();

  // Watch for other compliance and banner selection
  const otherCompliance = watch("stepThree.compliance.other");
  const banner = watch("stepThree.consentManagement.banner");

  // Get form errors
  const errors = formState.errors;

  return (
    <div className="space-y-6">
      <div className="rounded-lg pb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      {/* Compliance Requirements */}
      <Card variant="glass" className="border border-border">
        <CardContent>
          <h3 className="text-base font-medium mb-4">
            Compliance Requirements
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Which privacy regulations apply to your website?
          </p>
          <div className="grid grid-cols-1 gap-4">
            <CheckboxField<CookieForm>
              name="stepThree.compliance.gdpr"
              label="GDPR (General Data Protection Regulation)"
              description="European Union data protection regulation"
            />
            <CheckboxField<CookieForm>
              name="stepThree.compliance.ccpa"
              label="CCPA (California Consumer Privacy Act)"
              description="California state privacy law"
            />
            <CheckboxField<CookieForm>
              name="stepThree.compliance.other"
              label="Other Compliance Requirements"
              description="Additional privacy laws or regulations"
            />
            {otherCompliance && (
              <div className="ml-6 mt-2">
                <TextField<CookieForm>
                  name="stepThree.compliance.otherCompliance"
                  label="Specify Other Compliance"
                  placeholder="Enter other compliance requirements"
                  description="Describe any additional privacy laws or regulations"
                  required
                />
              </div>
            )}
            {/* Show validation error for compliance section */}
            {errors.stepThree?.compliance && (
              <div className="text-sm text-destructive mt-2">
                {errors.stepThree.compliance.message}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Consent Management */}
      <Card variant="glass" className="border border-border">
        <CardContent>
          <h3 className="text-base font-medium mb-4">Consent Management</h3>
          <p className="text-sm text-muted-foreground mb-4">
            How do you manage user consent for cookies?
          </p>
          <div className="space-y-4">
            <CheckboxField<CookieForm>
              name="stepThree.consentManagement.banner"
              label="Cookie Banner"
              description="Display a cookie consent banner"
            />
            <CheckboxField<CookieForm>
              name="stepThree.consentManagement.acceptRejectButtons"
              label="Accept/Reject Buttons"
              description="Provide clear accept and reject options"
            />
            <CheckboxField<CookieForm>
              name="stepThree.consentManagement.categorySelection"
              label="Category Selection"
              description="Allow users to select specific cookie categories"
            />
            <CheckboxField<CookieForm>
              name="stepThree.consentManagement.addLinks"
              label="Additional Links"
              description="Include links to privacy policy and cookie settings"
            />
            {banner && (
              <div className="ml-6 mt-2">
                <SelectField<CookieForm>
                  name="stepThree.consentManagement.consentExpiry"
                  label="Consent Expiry"
                  description="How long should user consent be remembered?"
                  options={[
                    { value: "session", text: "Session only" },
                    { value: "up_to_30_days", text: "Up to 30 days" },
                    { value: "up_to_90_days", text: "Up to 90 days" },
                    { value: "up_to_180_days", text: "Up to 180 days" },
                    { value: "up_to_365_days", text: "Up to 365 days" },
                    { value: "forever", text: "Forever" },
                  ]}
                  required
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
