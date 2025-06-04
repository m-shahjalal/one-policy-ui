"use client";

import { useTriggerForm } from "@/components/formify/hooks/useTrigger";
import {
  OverviewForm,
  StepConfig,
} from "@/components/shared/step-form-overview";
import { Form, FormRef, Stepper } from "formify";
import { CookieIcon, GlobeIcon, MailIcon, ShieldIcon } from "lucide-react";
import { createElement, useEffect, useRef } from "react";
import useSWRMutation from "swr/mutation";
import { Step1Form, Step2Form, Step3Form, Step4Form } from ".";
import {
  CookieForm,
  cookieFormDefaultValues,
  cookieFormSchema,
} from "./schema";
import { createOrUpdatePolicy as creator } from "@/lib/mutate-form";
import { FormFeatureLoader } from "@/components/shared/form-loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apis, pages } from "@/config/routes";

const steps: StepConfig[] = [
  {
    stepNumber: 1,
    title: "Basic Information",
    icon: GlobeIcon,
    description:
      "Provide essential details about your website and organization, including its purpose, legal entity name, and domain information to set the foundation for compliance documentation.",
    component: Step1Form,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    stepNumber: 2,
    title: "Cookie Usage",
    description:
      "Explain the categories of cookies your website uses, their purpose (e.g., analytics, functionality, advertising), and how long they are retained on users' devices.",
    component: Step2Form,
    icon: CookieIcon,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  {
    stepNumber: 3,
    title: "Compliance",
    description:
      "Outline how your website complies with relevant data protection regulations, including GDPR or CCPA, and describe your approach to managing user consent and policy updates.",
    component: Step3Form,
    icon: ShieldIcon,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    stepNumber: 4,
    title: "Contact Information",
    description:
      "Enter contact information for your data protection officer or relevant point of contact, so users know whom to reach for questions or requests about their personal data.",
    component: Step4Form,
    icon: MailIcon,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    borderColor: "border-pink-200 dark:border-pink-800",
  },
];

export function CookiePolicyForm({ initial }: { initial?: CookieForm }) {
  const router = useRouter();
  const swr = useSWRMutation(apis.cookies.create, creator);
  const formRef = useRef<FormRef<CookieForm>>(null);
  const triggerForm = useTriggerForm<CookieForm>();
  const { data, isMutating, trigger, error } = swr;

  console.log("data", data, isMutating, trigger, error);

  const clickSubmit = async () => {
    trigger({ formData: formRef.current?.form.watch() });
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong, please try again later");
    }

    if (data) {
      toast.success("Cookie policy generated successfully.");
      router.push(pages.policies.cookies.view(data.id));
    }
  }, [data, error, router]);

  return (
    <div className="space-y-8">
      {isMutating ? (
        <FormFeatureLoader />
      ) : (
        <Form
          ref={formRef}
          submitHandler={clickSubmit}
          schema={cookieFormSchema}
          initialValues={initial ? initial : cookieFormDefaultValues}
          onSubmit={clickSubmit}
        >
          <Stepper onComplete={clickSubmit}>
            {steps.map(({ component, stepNumber, ...rest }) => (
              <Stepper.Step
                validate={() => {
                  const stepValidationMap: Record<number, string[]> = {
                    1: ["stepOne"],
                    2: ["stepTwo"],
                    3: ["stepThree"],
                    4: ["stepFour"],
                  };
                  return triggerForm(
                    formRef.current?.form,
                    (stepValidationMap[stepNumber] || []) as FIX_ME[]
                  );
                }}
                key={stepNumber}
              >
                {createElement(component, rest)}
              </Stepper.Step>
            ))}
            <Stepper.Step>
              <OverviewForm
                title="Review and Submit"
                description="Please review all the information before submitting. You can go back to any step to make changes."
                steps={steps}
              />
            </Stepper.Step>
          </Stepper>
        </Form>
      )}
    </div>
  );
}
