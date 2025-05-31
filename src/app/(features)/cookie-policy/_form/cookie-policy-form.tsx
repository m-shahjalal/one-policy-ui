"use client";

import { Form, FormRef, Stepper } from "formify";
import {
  CookieForm,
  cookieFormDefaultValues,
  cookieFormSchema,
} from "./schema";
import { Step1Form, Step2Form, Step3Form, Step4Form } from ".";
import { useRef } from "react";
import { useTriggerForm } from "@/components/formify/hooks/useTrigger";

const steps = [
  {
    stepNumber: 1,
    component: (
      <Step1Form
        title="Basic Information"
        description="Provide essential details about your website and organization, including its purpose, legal entity name, and domain information to set the foundation for compliance documentation."
      />
    ),
  },
  {
    stepNumber: 2,
    component: (
      <Step2Form
        title="Cookie Usage"
        description="Explain the categories of cookies your website uses, their purpose (e.g., analytics, functionality, advertising), and how long they are retained on users' devices."
      />
    ),
  },
  {
    stepNumber: 3,
    component: (
      <Step3Form
        title="Compliance"
        description="Outline how your website complies with relevant data protection regulations, including GDPR or CCPA, and describe your approach to managing user consent and policy updates."
      />
    ),
  },
  {
    stepNumber: 4,
    component: (
      <Step4Form
        title="Contact Information"
        description="Enter contact information for your data protection officer or relevant point of contact, so users know whom to reach for questions or requests about their personal data."
      />
    ),
  },
];

export function CookiePolicyForm({ initial }: { initial?: CookieForm }) {
  const formRef = useRef<FormRef<CookieForm>>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const triggerForm = useTriggerForm<CookieForm>();

  const clickSubmit = () => {
    submitRef.current?.click();
    console.info("Submitted", formRef.current?.form?.getValues());
  };

  return (
    <div className="space-y-8">
      <Form
        ref={formRef}
        submitHandler={clickSubmit}
        schema={cookieFormSchema}
        initialValues={initial ? initial : cookieFormDefaultValues}
      >
        <Stepper onComplete={clickSubmit}>
          {steps.map((item) => (
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
                  (stepValidationMap[item.stepNumber] || []) as FIX_ME[]
                );
              }}
              key={item.stepNumber}
            >
              {item.component}
            </Stepper.Step>
          ))}
        </Stepper>
      </Form>
    </div>
  );
}
