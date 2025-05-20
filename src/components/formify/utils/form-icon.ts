import React, { cloneElement, isValidElement, ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "./tailwind-cn";

export const enhancedIcon = ({
  icon,
  error,
  loading,
}: {
  icon: ReactNode;
  error?: FIX_ME;
  loading?: boolean;
}) => {
  return isValidElement(icon)
    ? cloneElement(
        icon as React.ReactElement<{ size?: number; className?: string }>,
        {
          size: 20,
          className: cn(
            (icon as React.ReactElement<{ size?: number; className?: string }>)
              .props.className,
            error?.message?.length && "text-red-500"
          ),
        }
      )
    : loading
    ? React.createElement(Spinner, { size: 20 })
    : null;
};
