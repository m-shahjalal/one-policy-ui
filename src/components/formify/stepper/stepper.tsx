"use client";

import type React from "react";

import { Children, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronRightIcon, XCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StepError,
  StepperContext,
  useStepperContext,
} from "./stepper.context";
import { useStepContent } from "./stepper.hook";
import { Card } from "@/components/ui/card";

export type StepProps = {
  children: ReactNode;
  validate?: () => StepError | Promise<StepError>;
};

type StepperProps = {
  children: React.ReactNode;
  onComplete?: () => void | Promise<void>;
  completeLabel?: string;
  variant?: "default" | "outline" | "card";
};

export const Step = ({ children }: StepProps) => {
  const { currentStep, stepErrors } = useStepperContext();
  const error = stepErrors[currentStep];

  return (
    <div>
      {error?.hasError && error.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 flex items-start"
        >
          <XCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error.message}</p>
        </motion.div>
      )}

      <div>{children}</div>
    </div>
  );
};

export const Stepper = ({
  children,
  onComplete,
  completeLabel = "Complete",
  variant = "default",
}: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepErrors, setStepErrors] = useState<Record<number, StepError>>({});

  const steps = Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type === Step
  );
  const totalSteps = steps.length;

  return (
    <StepperContext
      value={{
        currentStep,
        setCurrentStep,
        totalSteps,
        stepErrors,
        setStepErrors,
      }}
    >
      <StepContent
        onComplete={onComplete}
        completeLabel={completeLabel}
        variant={variant}
      >
        {children}
      </StepContent>
    </StepperContext>
  );
};

Stepper.displayName = "Stepper";
Stepper.Step = Step;

type StepContentProps = {
  children: React.ReactNode;
  onComplete?: () => void | Promise<void>;
  completeLabel?: string;
  variant?: "default" | "outline" | "card";
};

const StepContent = ({
  children,
  onComplete,
  completeLabel = "Complete",
  variant = "default",
}: StepContentProps) => {
  const {
    currentStep,
    totalSteps,
    stepErrors,
    handleNext,
    handlePrevious,
    steps,
    isProcessing,
  } = useStepContent(children);
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div
      className="flex flex-col h-full gap-6"
      role="region"
      aria-label="Step progress"
    >
      {/* Main container - vertical layout */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Step indicators section */}
        <div className="w-fit">
          {/* Step indicators container */}
          <div className="flex lg:flex-col flex-row justify-between lg:justify-start">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
              const isActive = currentStep === step;
              const isCompleted = currentStep > step;
              const hasError = stepErrors[step]?.hasError;

              return (
                <div
                  key={step}
                  className="relative group lg:mb-8 last:mb-0 flex-1 lg:flex-none"
                >
                  {/* Desktop step indicator with title and description */}
                  <div className="hidden lg:flex items-start flex-row">
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-full w-10 h-10 text-sm font-medium shrink-0 mr-4",
                        isActive
                          ? "btn-gradient text-primary-foreground ring-4 ring-primary/20"
                          : isCompleted
                          ? "btn-gradient text-primary-foreground"
                          : hasError
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? <CheckIcon className="h-5 w-5" /> : step}
                    </div>

                    <div
                      className={cn(
                        "text-sm",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    />
                  </div>

                  {/* Mobile step indicator - just the number/icon */}
                  <div className="lg:hidden flex flex-col items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-full w-10 h-10 text-sm font-medium",
                        isActive
                          ? "btn-gradient text-primary-foreground ring-4 ring-primary/20"
                          : isCompleted
                          ? "btn-gradient text-primary-foreground"
                          : hasError
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? <CheckIcon className="h-5 w-5" /> : step}
                    </div>
                    <div className="text-xs font-medium mt-1 text-center max-w-[60px] truncate" />
                  </div>

                  {/* Connector line */}
                  {step < totalSteps && (
                    <div
                      className={cn(
                        "absolute bg-muted overflow-hidden",
                        "lg:left-5 lg:top-10 lg:bottom-0 lg:w-0.5 lg:h-[calc(100%-10px)] top-5 left-[calc(50%+8px)] right-[calc(50%+8px)] h-0.5 w-[calc(100%-60px)]"
                      )}
                    >
                      <div
                        className={cn(
                          "h-full bg-primary transition-all duration-500 ease-in-out",
                          isCompleted ? "w-full" : "w-0"
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step content area */}
        <div
          className={cn(
            "flex-1 overflow-hidden",
            variant === "outline"
              ? "border border-border"
              : variant === "card"
              ? "bg-card text-card-foreground shadow-sm border border-border"
              : ""
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep - 1]}
            </motion.div>
          </AnimatePresence>

          <Card
            className="p-6 pb-0 mt-8 border border-border/50"
            variant="glass"
          >
            {/* Progress indicator */}
            <div className="w-full bg-muted h-3 rounded-full overflow-hidden relative shadow-inner">
              <div
                className="btn-gradient h-full transition-all duration-700 ease-in-out rounded-full relative"
                style={{
                  width: `${progressPercentage}%`,
                }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full" />
              </div>

              {/* Step markers on progress bar */}
              <div className="absolute inset-0 flex justify-between items-center px-1">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full border-2 transition-all duration-300",
                      index < currentStep
                        ? "bg-white border-primary shadow-sm"
                        : index === currentStep - 1
                        ? "bg-primary border-primary-foreground animate-pulse shadow-md"
                        : "bg-muted-foreground/50 border-muted"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center pb-4 border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isProcessing}
                className="gap-2 hover:bg-muted/50 transition-colors duration-200"
              >
                Previous
              </Button>

              <div className="text-center">
                <div className="text-sm font-medium text-foreground">
                  {currentStep <= totalSteps - 1 ? currentStep : totalSteps - 1}{" "}
                  of {totalSteps - 1}
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round(progressPercentage)}% complete
                </div>
              </div>

              <Button
                type="button"
                onClick={() => handleNext(onComplete)}
                disabled={isProcessing}
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : currentStep === totalSteps ? (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    {completeLabel}
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRightIcon className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

StepContent.displayName = "StepContent";
