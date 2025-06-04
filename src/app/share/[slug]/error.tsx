"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RotateCw } from "lucide-react";

export default function CookiePolicyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for debugging purposes
    console.error("Cookie Policy Error:", error);
  }, [error]);

  // Determine if it's a connection error
  const isConnectionError = error.message?.includes(
    "Cannot connect to API server"
  );

  return (
    <div className="min-h-[60vh] px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <div className="flex flex-col items-center text-center sm:ml-6">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle
                className="h-6 w-6 text-destructive"
                aria-hidden="true"
              />
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Unable to Load Cookie Policy
            </h1>

            <div className="mt-4">
              <div className="text-base text-muted-foreground">
                {isConnectionError ? (
                  <>
                    <p className="mb-2">
                      {`We're currently unable to connect to our policy server.`}
                    </p>
                    <p className="mb-4">This might be due to:</p>
                    <ul className="list-disc text-left pl-4 mb-4">
                      <li>Temporary server maintenance</li>
                      <li>Network connectivity issues</li>
                      <li>Server updates in progress</li>
                    </ul>
                  </>
                ) : (
                  <p className="mb-4">
                    {error.message ||
                      "We encountered an unexpected error while trying to load the cookie policy."}
                  </p>
                )}

                <p className="mt-4">
                  You can try refreshing the page or explore our other policy
                  resources below.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  onClick={() => reset()}
                  className="flex items-center gap-2"
                >
                  <RotateCw className="h-4 w-4" />
                  Try Again
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="flex items-center gap-2"
                >
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to previous page
                  </Button>
                </Button>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Contact our support team
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
