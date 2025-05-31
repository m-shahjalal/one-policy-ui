"use client";

import { SelectField, TextField } from "formify";
import { useFormContext } from "react-hook-form";
import type { CookieForm } from "../schema";
import { Card, CardContent } from "@/components/ui/card";

export function Step4Form({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { watch } = useFormContext<CookieForm>();

  const preferredContactMethod =
    watch("stepFour.preferredContactMethod") ?? "email";

  return (
    <div className="space-y-6">
      <div className="rounded-lg pb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
      <Card variant="glass" className="border border-border">
        <CardContent className="pt-6">
          <h3 className="text-base font-medium mb-4">Contact Information</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Provide contact details for data protection inquiries
          </p>
          <div className="space-y-4">
            <SelectField<CookieForm>
              name="stepFour.preferredContactMethod"
              label="Preferred Contact Method"
              description="How should users contact you about privacy matters?"
              options={[
                { value: "email", text: "Email" },
                { value: "phone", text: "Phone" },
                { value: "website", text: "Website" },
                { value: "mail", text: "Mail" },
              ]}
              required
            />

            {/* Conditional fields based on contact method */}
            {preferredContactMethod === "email" && (
              <TextField<CookieForm>
                name="stepFour.email"
                label="Email Address"
                placeholder="privacy@example.com"
                description="Email address for privacy-related inquiries"
                type="email"
                required
              />
            )}

            {preferredContactMethod === "phone" && (
              <TextField<CookieForm>
                name="stepFour.phone"
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                description="Phone number for privacy-related inquiries"
                type="tel"
                required
              />
            )}

            {preferredContactMethod === "website" && (
              <TextField<CookieForm>
                name="stepFour.website"
                label="Website URL"
                placeholder="https://example.com/contact"
                description="Website URL for privacy-related inquiries"
                type="url"
                required
              />
            )}

            {preferredContactMethod === "mail" && (
              <TextField<CookieForm>
                name="stepFour.mailingAddress"
                label="Mailing Address"
                placeholder="123 Main St, City, State, ZIP"
                description="Physical address for privacy-related inquiries"
                required
              />
            )}

            {/* Optional fields for additional contact methods */}
            {preferredContactMethod !== "email" && (
              <TextField<CookieForm>
                name="stepFour.email"
                label="Email Address (Optional)"
                placeholder="privacy@example.com"
                description="Additional email contact"
                type="email"
              />
            )}

            {preferredContactMethod !== "phone" && (
              <TextField<CookieForm>
                name="stepFour.phone"
                label="Phone Number (Optional)"
                placeholder="+1 (555) 123-4567"
                description="Additional phone contact"
                type="tel"
              />
            )}

            {preferredContactMethod !== "website" && (
              <TextField<CookieForm>
                name="stepFour.website"
                label="Website URL (Optional)"
                placeholder="https://example.com/contact"
                description="Additional website contact"
                type="url"
              />
            )}

            {preferredContactMethod !== "mail" && (
              <TextField<CookieForm>
                name="stepFour.mailingAddress"
                label="Mailing Address (Optional)"
                placeholder="123 Main St, City, State, ZIP"
                description="Additional mailing address"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
