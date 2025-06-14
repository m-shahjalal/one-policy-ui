"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pages } from "@/config/routes";
import {
  ResetPasswordFormFields,
  resetPasswordSchema,
  defaultValues,
  type ResetPasswordFormValues,
} from ".";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({}: ResetPasswordFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    setIsLoading(true);
    setError(null);
    console.info("Resetting password with data:", data);

    try {
      const result = { success: true, error: false };

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login?reset=true");
        }, 3000);
      } else {
        setError(
          typeof result.error === "string"
            ? result.error
            : "Failed to reset password"
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          {!isSuccess
            ? "Create a new password for your account"
            : "Your password has been reset successfully"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <ResetPasswordFormFields />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold">
              Password Reset Successful!
            </h3>
            <p className="text-muted-foreground mt-2">
              Your password has been reset successfully.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              You will be redirected to the login page in a few seconds...
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href={pages.auth.login}
          className="text-sm text-primary hover:underline"
        >
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}
