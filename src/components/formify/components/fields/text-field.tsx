"use client";
"use no memo";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, useFormContext } from "react-hook-form";
import { TTextFieldProps } from "../../types/form";
import { enhancedIcon } from "../../utils/form-icon";
import { cn } from "../../utils/tailwind-cn";

/**
 * A text field component with dynamic icon placement.
 * @param name The name of the field.
 * @param label The label of the field.
 * @param type The type of the field.
 * @param placeholder The placeholder of the field.
 * @param required If the field is required.
 * @param icon The icon to display.
 * @param iconPosition The position of the icon ("start" or "end"). Defaults to "start".
 * @param loading If the field is loading.
 * @param className The class name of the field.
 * @param inputClass The class name of the input.
 * @param iconClass The class name of the icon.
 * @param disabled If the field is disabled.
 *
 * @returns The text field component.
 *
 * @example
 * ```tsx
 * <TextField name="name" label="Name" />
 * <TextField name="email" label="Email" icon={<Mail />} iconPosition="end" />
 * ```
 */

export const TextField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder = "Input",
  required = false,
  icon,
  loading,
  className,
  inputClass,
  disabled = false,
}: TTextFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel htmlFor={name}>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative flex items-center">
              {icon && (
                <div className={cn("absolute left-3 z-10")}>
                  {enhancedIcon({ icon, error: errors[name], loading })}
                </div>
              )}

              <Input
                {...field}
                type={type}
                value={field.value || ""}
                placeholder={placeholder ?? "Enter a value"}
                className={cn(
                  inputClass,
                  "w-full",
                  icon && "pl-10",
                  errors[name]?.message && "border-b-red-500/30"
                )}
                id={name}
                disabled={disabled}
              />
            </div>
          </FormControl>

          <FormMessage className="line-clamp-1 text-xs" />
        </FormItem>
      )}
    />
  );
};

TextField.displayName = "TextField";
