import { FieldValues, useFormContext } from "react-hook-form";

import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils/shadcn";
import { JSX } from "react";
import { TDateTimeFieldProps } from "@/types/generic-form";

/**
 * DateField component
 *
 * @param name - The name of the field.
 * @param label - The label for the field.
 * @param required - Whether the field is required.
 * @param disabled - Whether the field is disabled.
 * @param className - The class name for the field.
 * @returns {JSX.Element} The DateField component.
 */

export const DateTimeField = <T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  className,
}: TDateTimeFieldProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, "flex flex-col")}>
          {label && (
            <FormLabel htmlFor={name}>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <DateTimePicker
            disabled={disabled}
            value={field.value}
            onChange={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DateTimeField.displayName = "DateField";
