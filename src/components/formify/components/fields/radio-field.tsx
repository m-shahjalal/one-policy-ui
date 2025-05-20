import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { JSX } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { TRadioFieldProps } from "../../types/form";
import { cn } from "../../utils/tailwind-cn";

/**
 * RadioGroupField component is responsible for rendering the radio group field in the form.
 *
 * @param name - The name of the field.
 * @param options - The options for the radio group.
 * @param label - The label for the radio group.
 * @param required - The required flag for the radio group.
 * @param className - The class name for the radio group.
 * @param column - The column flag for the radio group.
 * @param longGap - The long gap flag for the radio group.
 * @param reverse - The reverse flag for the radio group.
 * @param gap - The gap for the radio group.
 * @param columnGroup - The column group flag for the radio group.
 * @param rowGroup - The row group flag for the radio group.
 * @returns {JSX.Element} The RadioGroupField component.
 */

export const RadioField = <T extends FieldValues>({
  name,
  options,
  label = "Question Type",
  required = false,
  className = "",
  reverse = false,
  gap = "2",
}: TRadioFieldProps<T>): JSX.Element => {
  const { control } = useFormContext<T>();

  if (options.length < 2) {
    return (
      <div className="text-red-500">
        Please provide at least two options for the radio group.
      </div>
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className={cn(
                className,

                "flex gap-2"
              )}
            >
              {options.map((option) => (
                <FormItem key={option.value}>
                  <FormControl>
                    <div
                      className={cn("relative flex items-center", `gap-${gap}`)}
                    >
                      <RadioGroupItem
                        id={option.value}
                        className={cn(reverse ? "order-1" : "order-0")}
                        value={option.value}
                      />
                      <FormLabel
                        htmlFor={option.value}
                        className={cn(reverse ? "order-0" : "order-1")}
                      >
                        {option.text}
                      </FormLabel>
                    </div>
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

RadioField.displayName = "RadioField";
