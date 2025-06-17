"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { apis, pages } from "@/config/routes";
import {
  defaultValues,
  SignupFormFields,
  signupSchema,
  type SignupFormValues,
} from ".";
import fetcher from "@/lib/fetcher";
import { User } from "@/lib/type";

export function SignupForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const redirectTo = search.get("next");

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  async function onSubmit(data: SignupFormValues) {
    form.clearErrors("root");
    const nextRoute = `${pages.auth.login}?next=${redirectTo}`;

    startTransition(async () => {
      const response = await fetcher.post<{ error?: string; data: User }>(
        apis.auth.register,
        data
      );

      if (response.error) {
        return form.setError("root", { message: response.error });
      }

      if (!response.data) {
        return;
      }
      form.reset();
      toast.success("Account created successfully!");
      router.push(nextRoute);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password below to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignupFormFields />
            {form.formState.errors.root && (
              <div className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.root.message}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create account
            </Button>

            <div className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                href={`${pages.auth.login}?next=${redirectTo}`}
                className="text-primary underline-offset-4 transition-colors hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
