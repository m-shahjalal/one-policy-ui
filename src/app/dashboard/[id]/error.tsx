"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function CookiePolicyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-center text-muted-foreground">
        {error.message ||
          "Failed to load cookie policy. Please try again later."}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/policies/cookies")}
        >
          Back to Policies
        </Button>
      </div>
    </div>
  );
}
