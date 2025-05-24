"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JSX } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { TSelectFieldProps } from "../../types/form";

/**
 * SelectField component
 * @param {Path<T>} name - The name of the field
 * @returns {JSX.Element} - The select field component
 * @example ```tsx
<SelectField
name="publishedStatus"
label="Published Status"
options={PublishedOptions}
/>
```
 */
export const SelectField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  required = false,
  className,
}: TSelectFieldProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ?? "Select an item"} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

SelectField.displayName = "SelectField";
