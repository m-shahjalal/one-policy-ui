import type { Metadata } from "next";
import ResetPasswordForm from "./reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new password for your account",
};
export default async function ResetPasswordPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground">
          Create a new password for your account
        </p>
      </div>
      <ResetPasswordForm token={"this is dynamic token"} />
    </div>
  );
}
