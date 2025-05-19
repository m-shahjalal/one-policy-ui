import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { TSwitchFieldProps } from "@/types/generic-form";
import { cn } from "@/utils/shadcn";
import { JSX } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

/**
 * SwitchField
 *
 * @param name - The name of the field.
 * @param label - The label of the field.
 * @param className - The class name of the field.
 * @param disabled - The disabled state of the field.
 * @param required - The required state of the field.
 * @param column - The column state of the field.
 * @param longGap - The long gap state of the field.
 * @param reverse - The reverse state of the field.
 * @param gap - The gap state of the field.
 *
 * @returns {JSX.Element} The SwitchField component.
 */

export const SwitchField = <T extends FieldValues>({
  name,
  label,
  className,
  required = false,
  disabled = false,
  reverse = false,
  gap = "2",
}: TSwitchFieldProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <div className={cn("relative flex items-center", `gap-${gap}`)}>
              <Switch
                className={cn(reverse ? "order-1" : "order-0")}
                onCheckedChange={field.onChange}
                id={name}
                checked={field.value}
                disabled={disabled}
              />
              {label && (
                <FormLabel
                  htmlFor={name}
                  className={cn(reverse ? "order-0" : "order-1")}
                >
                  <span>{label}</span>
                  {required && <span className="ml-1 text-red-500">*</span>}
                </FormLabel>
              )}
            </div>
          </FormControl>
          <FormMessage className="line-clamp-1 text-xs" />
        </FormItem>
      )}
    />
  );
};

SwitchField.displayName = "SwitchField";
