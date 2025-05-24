import { cn } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";
import type { StepError } from "./stepper.context";

type StepIndicatorProps = {
  step: number;
  error?: StepError;
  isActive: boolean;
  isCompleted: boolean;
  title?: string;
  description?: string;
  isVertical?: boolean;
};

export const StepIndicator = ({
  step,
  error,
  isActive,
  isCompleted,
  title,
  description,
  isVertical = false,
}: StepIndicatorProps) => {
  const baseClassName =
    "w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0";

  const renderIndicator = () => {
    if (error?.hasError) {
      return (
        <div
          className={cn(
            baseClassName,
            "border-destructive text-destructive bg-destructive/10"
          )}
        >
          <AlertCircle className="w-5 h-5" aria-label="Error" />
        </div>
      );
    }

    if (isCompleted) {
      return (
        <div
          className={cn(
            baseClassName,
            "bg-green-500 border-green-500 text-white"
          )}
        >
          <Check className="w-5 h-5" aria-label="Completed" />
        </div>
      );
    }

    if (isActive) {
      return (
        <div
          className={cn(
            baseClassName,
            "border-primary text-primary bg-primary/10"
          )}
        >
          <span className="font-medium">{step}</span>
        </div>
      );
    }

    return (
      <div
        className={cn(
          baseClassName,
          "border-muted text-muted-foreground bg-muted/10"
        )}
      >
        <span>{step}</span>
      </div>
    );
  };

  // Return just the indicator if not vertical or no title provided
  if (!isVertical || !title) {
    return renderIndicator();
  }

  // Return indicator with title and description for vertical layout
  return (
    <div className="flex items-center">
      {renderIndicator()}
      <div className="ml-4">
        <h3
          className={cn(
            "font-medium",
            isActive
              ? "text-primary"
              : isCompleted
              ? "text-green-600"
              : "text-muted-foreground"
          )}
        >
          {title}
        </h3>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

StepIndicator.displayName = "StepIndicator";

export const StepConnector = ({
  isCompleted,
  isVertical = false,
}: {
  isCompleted: boolean;
  isVertical?: boolean;
}) => (
  <div
    className={cn(
      isVertical ? "h-16 w-0.5 ml-5" : "h-0.5 w-full",
      isCompleted ? "bg-green-500" : "bg-muted"
    )}
    role="separator"
  />
);

StepConnector.displayName = "StepConnector";
