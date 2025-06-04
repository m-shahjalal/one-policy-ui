import type { Metadata } from "next";
import ResetPasswordForm from "./_form/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new password for your account",
};
export default async function ResetPasswordPage() {
  return <ResetPasswordForm token={"this is dynamic token"} />;
}
