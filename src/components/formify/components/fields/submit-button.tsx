import { Button, ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FC, JSX } from "react";
import { cn } from "../../utils/tailwind-cn";

type SubmitButtonProps = ButtonProps & {
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
  width?: "full" | "auto";
  loadingIconClass?: string;
};

/**
 * SubmitButton component
 * @param {boolean} isLoading - Whether the button is loading
 * @param {'full' | 'auto'} width - The width of the button
 * @returns {JSX.Element} - The submit button component
 *
 * @example ```tsx
 * <SubmitButton />
 * ```
 */
export const SubmitButton: FC<SubmitButtonProps> = ({
  isLoading = false,
  disabled = false,
  label = "Save Changes",
  loadingLabel = "Saving...",
  width = "full",
  ...props
}: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      className={cn(
        "w-full flex gap-2 items-center",
        width === "auto" && "w-auto"
      )}
      type="submit"
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Spinner className={props.loadingIconClass} />}
      {isLoading ? <>{loadingLabel}</> : <>{label}</>}
    </Button>
  );
};

SubmitButton.displayName = "SubmitButton";
