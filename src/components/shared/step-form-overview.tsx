"use client";

import type React from "react";

import { useStepperContext } from "@/components/formify/stepper/stepper.context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditIcon, FileTextIcon, SparklesIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export type StepConfig = {
  stepNumber: number;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  component: React.ComponentType<FIX_ME>;
  color: string;
  bgColor: string;
  borderColor: string;
};

interface OverviewProps {
  title: string;
  description: string;
  steps: StepConfig[];
}

export function OverviewForm({ title, description, steps }: OverviewProps) {
  const { watch } = useFormContext();
  const { setCurrentStep } = useStepperContext();

  const formData = watch();

  const handleEdit = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  // Convert camelCase to readable text
  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Format different value types with enhanced styling
  const formatValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-muted-foreground italic">Not provided</span>;
    }

    if (typeof value === "boolean") {
      return (
        <Badge variant={value ? "default" : "secondary"} className="text-xs">
          {value ? "Yes" : "No"}
        </Badge>
      );
    }

    if (value instanceof Date) {
      return (
        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
          {value.toLocaleDateString()}
        </span>
      );
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-muted-foreground italic">None</span>;
      }
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {String(item)}
            </Badge>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      return null; // Will be handled as nested object
    }

    return <span className="text-sm">{String(value)}</span>;
  };

  // Enhanced object renderer with better styling
  const renderObject = (
    obj: any,
    parentKey = "",
    level = 0
  ): React.ReactNode[] => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      return [];
    }

    const items: React.ReactNode[] = [];

    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        // Nested object - render as enhanced subsection
        const nestedItems = renderObject(value, fullKey, level + 1);
        if (nestedItems.length > 0) {
          items.push(
            <div
              key={fullKey}
              className={`${level > 0 ? "ml-4 mt-3" : "mt-4"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                <h4 className="font-semibold text-sm text-foreground">
                  {formatLabel(key)}
                </h4>
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-muted">
                {nestedItems}
              </div>
            </div>
          );
        }
      } else {
        // Regular field with enhanced styling
        const formattedValue = formatValue(value);
        if (formattedValue !== null) {
          items.push(
            <div
              key={fullKey}
              className={`flex items-start justify-between gap-4 py-2 ${
                level > 0 ? "ml-2" : ""
              }`}
            >
              <span className="font-medium text-sm text-muted-foreground min-w-0 flex-1">
                {formatLabel(key)}:
              </span>
              <div className="text-right min-w-0 flex-1">{formattedValue}</div>
            </div>
          );
        }
      }
    });

    return items;
  };

  // Enhanced step renderer
  const renderStep = (stepKey: string, stepData: any, index: number) => {
    const items = renderObject(stepData);

    if (items.length === 0) {
      return null;
    }

    const stepNumber = index + 1;
    const config = steps[index];
    const IconComponent = config?.icon;

    return (
      <div key={stepKey}>
        <Card
          variant="glass"
          className={`${config.bgColor} border ${config.borderColor} overflow-hidden`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">
                    {config.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Step {stepNumber}
                  </p>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(stepNumber)}
                  className="gap-2"
                >
                  <EditIcon className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">{items}</div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (Object.values(formData).filter(
      (step) => step && Object.keys(step).length > 0
    ).length /
      Object.keys(formData).length) *
      100
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Card
          variant="glass"
          className="text-center overflow-hidden relative border border-border shadow-none hover:shadow-none hover:translate-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <CardContent className="pt-12 relative z-10">
            <div className="w-20 h-20 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                <SparklesIcon className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {description}
            </p>

            {/* Progress Indicator */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Form Completion</span>
                <span className="text-sm font-bold text-primary">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center mt-10">
              <FileTextIcon className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Form Overview</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Data Overview */}
      <div className="space-y-6">
        <div className="grid gap-6">
          {Object.entries(formData).map(([stepKey, stepData], index) =>
            renderStep(stepKey, stepData, index)
          )}
        </div>
      </div>
    </div>
  );
}
