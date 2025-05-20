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
import { Eye, EyeOff } from "lucide-react";
import { JSX, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { TPasswordFieldProps } from "../../types/form";
import { enhancedIcon } from "../../utils/form-icon";
import { cn } from "../../utils/tailwind-cn";

/**
 * Password field component
 *
 * @param name - The name of the field
 * @param label - The label of the field
 * @param placeholder - The placeholder of the field
 * @param required - The required status of the field
 * @param className - The class name of the field
 * @param icon - The icon status of the field
 * @param showIcon - The show icon of the field
 * @param hideIcon - The hide icon of the field
 * @param showStrength - The show strength of the field
 * @param showMessage - The show message of the field
 *
 * @returns {JSX.Element} - The password field component
 */

export const PasswordField = <T extends FieldValues>({
  name,
  label,
  placeholder = "Enter password",
  required = false,
  className,
  icon,
}: TPasswordFieldProps<T>): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative flex items-center">
              <div className={cn("absolute left-3 z-10 text-muted-foreground")}>
                {enhancedIcon({ icon, error: errors[name] })}
              </div>

              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={field.value || ""}
                className={cn(
                  "w-full",
                  icon && "pl-10",
                  errors[name]?.message && "border-b-red-500/40"
                )}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

PasswordField.displayName = "PasswordField";
