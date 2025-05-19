import { FieldValues, useFormContext } from "react-hook-form";

import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { JSX } from "react";
import { TDateFieldProps } from "@/types/generic-form";

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

export const DateField = <T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  className,
}: TDateFieldProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel htmlFor={name}>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div>
              <DateTimePicker
                disabled={disabled}
                value={field.value}
                onChange={field.onChange}
                granularity="day"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DateField.displayName = "DateField";
