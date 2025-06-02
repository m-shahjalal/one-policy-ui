"use client";

import { CheckboxField, SelectField } from "formify";
import { FieldArray } from "@/components/formify/components/field-array";
import { ArrayPath, useFormContext } from "react-hook-form";
import type { CookieForm } from "../schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export function Step2Form({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { watch, formState, getValues, register } =
    useFormContext<CookieForm>();

  // Watch for persistent cookie selection and third party selection
  const persistent = watch("stepTwo.cookieDuration.persistent");
  const thirdParty = watch("stepTwo.cookieOrigin.thirdParty");

  return (
    <div className="space-y-6">
      <div className="rounded-lg pb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      {/* Cookie Types */}
      <Card variant="glass" className="border border-border">
        <CardContent>
          <h3 className="text-base font-medium mb-4">Cookie Types</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the types of cookies your website uses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CheckboxField<CookieForm>
              name="stepTwo.cookieTypes.necessary"
              label="Necessary Cookies"
              description="Essential for website functionality"
            />
            <CheckboxField<CookieForm>
              name="stepTwo.cookieTypes.preferences"
              label="Preference Cookies"
              description="Remember user preferences"
            />
            <CheckboxField<CookieForm>
              name="stepTwo.cookieTypes.analytics"
              label="Analytics Cookies"
              description="Track website usage and performance"
            />
            <CheckboxField<CookieForm>
              name="stepTwo.cookieTypes.advertising"
              label="Advertising Cookies"
              description="Deliver targeted advertisements"
            />
            <CheckboxField<CookieForm>
              name="stepTwo.cookieTypes.socialMedia"
              label="Social Media Cookies"
              description="Enable social media features"
            />
            <CheckboxField<CookieForm>
              name="stepTwo.cookieTypes.content"
              label="Content Cookies"
              description="Personalize content delivery"
            />
            <CheckboxField<CookieForm>
              name="stepTwo.cookieTypes.personalization"
              label="Personalization Cookies"
              description="Customize user experience"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cookie Duration */}
      <Card variant="glass" className="border border-border">
        <CardContent>
          <h3 className="text-base font-medium mb-4">Cookie Duration</h3>
          <p className="text-sm text-muted-foreground mb-4">
            How long do your cookies remain active?
          </p>
          <div className="space-y-4">
            <CheckboxField<CookieForm>
              name="stepTwo.cookieDuration.session"
              label="Session Cookies"
              description="Deleted when browser is closed"
            />
            <CheckboxField<CookieForm>
              name="stepTwo.cookieDuration.persistent"
              label="Persistent Cookies"
              description="Remain after browser is closed"
            />
            {persistent && (
              <div className="ml-6">
                <SelectField<CookieForm>
                  name="stepTwo.cookieDuration.persistentDuration"
                  label="Persistent Cookie Duration"
                  description="How long do persistent cookies last?"
                  options={[
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

      {/* Cookie Origin */}
      <Card variant="glass" className="border border-border">
        <CardContent>
          <h3 className="text-base font-medium mb-4">Cookie Origin</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Where do your cookies originate from?
          </p>
          <div className="space-y-4">
            <CheckboxField<CookieForm>
              name="stepTwo.cookieOrigin.firstParty"
              label="First-Party Cookies"
              description="Cookies set by your website domain"
            />
            <CheckboxField<CookieForm>
              name="stepTwo.cookieOrigin.thirdParty"
              label="Third-Party Cookies"
              description="Cookies set by external domains"
            />
            {thirdParty && (
              <div className="ml-6">
                <FieldArray<CookieForm>
                  name={
                    "stepTwo.cookieOrigin.thirdPartyURLList" as ArrayPath<CookieForm>
                  }
                  label="Third-Party URLs"
                  description="List the domains that set third-party cookies"
                  required
                >
                  {({ fields, append, remove, getFieldError }) => (
                    <div className="space-y-2">
                      {fields.map((field, index) => (
                        <div key={field.id} className="space-y-1">
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Input
                                placeholder="https://example.com"
                                {...register(
                                  `stepTwo.cookieOrigin.thirdPartyURLList.${index}` as const
                                )}
                                className={
                                  getFieldError(index)
                                    ? "border-destructive"
                                    : ""
                                }
                              />
                              {/* Display error message for this specific field */}
                              {getFieldError(index) && (
                                <p className="text-sm text-destructive mt-1">
                                  {getFieldError(index)?.message}
                                </p>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => remove(index)}
                              disabled={fields.length === 1} // Prevent removing the last field if required
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="gradient"
                        onClick={() => append("")}
                        className="w-full h-10"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Third-Party URL
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
