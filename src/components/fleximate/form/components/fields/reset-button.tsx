import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils/shadcn";
import { JSX } from "react";
import { useFormContext } from "react-hook-form";

/**
 * The ResetButton component is a custom button designed for resetting forms.
 * It leverages the useFormContext hook from react-hook-form to reset the form state.
 *
 * @param {Object} props - The properties for the ResetButton component.
 * @param {string} props.resetLabel - The text displayed on the reset button.
 * @param {boolean} props.disabled - Determines if the button is disabled or not.
 * @param {string} props.className - Additional class names to apply to the button.
 * @returns {JSX.Element} The ResetButton component.
 */

export const ResetButton = ({
  resetLabel = "Reset",
  disabled = false,
  className,
}: ButtonProps & {
  resetLabel: string;
}): JSX.Element => {
  const form = useFormContext();
  return (
    <Button
      type="reset"
      disabled={disabled}
      className={cn(className)}
      onClick={() => form.reset()}
    >
      {resetLabel}
    </Button>
  );
};

ResetButton.displayName = "ResetButton";
