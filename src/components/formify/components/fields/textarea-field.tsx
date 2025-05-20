import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ReactElement } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { TTextAreaFieldProps } from "../../types/form";
import { cn } from "../../utils/tailwind-cn";

/**
 * TextareaField component
 * @param {Path<T>} name - The name of the field
 * @returns {ReactElement} - The textarea field component
 * 
 * @example ```tsx
<TextareaField control={control} name="summary" label="Summary" autoGrow />
```
 */

export const TextAreaField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  required = false,
  resizable = false,
  action,
  loading,
  className,
  inputClassName,
}: TTextAreaFieldProps<T>): ReactElement => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative flex items-center gap-2">
              <Textarea
                {...field}
                placeholder={placeholder ?? "Enter a value"}
                className={cn(
                  "w-full",
                  action && "pr-12",
                  resizable === false && "resize-none",
                  inputClassName
                )}
              />
              {loading && <Spinner className="absolute right-4" />}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

TextAreaField.displayName = "TextAreaField";
