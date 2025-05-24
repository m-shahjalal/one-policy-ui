"use client";

import type React from "react";

import { Children, useState } from "react";
import type { StepProps } from "./stepper";
import { useStepperContext } from "./stepper.context";

export const useStepContent = (children: React.ReactNode) => {
  const { currentStep, setCurrentStep, totalSteps, stepErrors, setStepErrors } =
    useStepperContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = Children.toArray(children);

  const handleNext = async (onComplete?: () => void | Promise<void>) => {
    if (currentStep <= totalSteps) {
      setIsProcessing(true);
      try {
        // Get the current step component
        const currentStepComponent = steps[
          currentStep - 1
        ] as React.ReactElement<StepProps>;
        const validate = currentStepComponent.props.validate;

        // If there's a validation function, run it
        if (validate) {
          const validationResult = await validate();

          if (validationResult.hasError) {
            setStepErrors({
              ...stepErrors,
              [currentStep]: validationResult,
            });
            setIsProcessing(false);
            return;
          }
        }

        // Clear any previous errors for this step
        if (stepErrors[currentStep]) {
          const newErrors = { ...stepErrors };
          delete newErrors[currentStep];
          setStepErrors(newErrors);
        }

        // If we're on the last step and there's a completion handler, call it
        if (currentStep === totalSteps && onComplete) {
          await onComplete();
        } else if (currentStep < totalSteps) {
          // Otherwise, move to the next step
          setCurrentStep(currentStep + 1);
        }
      } catch (error) {
        console.error("Error in step validation:", error);
        setStepErrors({
          ...stepErrors,
          [currentStep]: {
            hasError: true,
            message: "An unexpected error occurred. Please try again.",
          },
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    totalSteps,
    stepErrors,
    handleNext,
    handlePrevious,
    steps,
    isProcessing,
  };
};
