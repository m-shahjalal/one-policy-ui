"use client";
"use no memo";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TCheckboxFieldProps } from "@/types/generic-form";
import { cn } from "@/utils/shadcn";
import { JSX } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

/**
 * CheckboxField. A checkbox field component.
 *
 * @param name - The name of the field.
 * @param label - The label of the field.
 * @param required - The required flag of the field.
 * @param disabled - The disabled flag of the field.
 * @param column - The column flag of the field.
 * @param longGap - The long gap flag of the field.
 * @param reverse - The reverse flag of the field.
 * @param gap - The gap of the field.
 * @param className - The class name of the field.
 * @returns {JSX.Element} A checkbox field component.
 *
 * @example
 * ```tsx
 * <CheckboxField name="isActive" label="Is Active" />
 * ```
 */

export const CheckboxField = <T extends FieldValues>({
  name,
  label,
  disabled = false,
  required = false,
  reverse = false,
  gap = "2",
  className,
  description,
}: TCheckboxFieldProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            className,
            "flex flex-row items-start space-x-3 gap-y-0 rounded-md border p-4 w-full"
          )}
        >
          <FormControl>
            <div className={cn("relative flex items-center", `gap-${gap}`)}>
              <Checkbox
                className={cn(reverse ? "order-1" : "order-0")}
                onCheckedChange={field.onChange}
                id={name}
                checked={field.value}
                disabled={disabled}
              />
            </div>
          </FormControl>
          <div className="leading-none flex flex-col gap-1 justify-center">
            {label && (
              <FormLabel htmlFor={name}>
                <span>{label}</span>
                {required && <span className="ml-1 text-red-500">*</span>}
              </FormLabel>
            )}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

CheckboxField.displayName = "CheckboxField";
