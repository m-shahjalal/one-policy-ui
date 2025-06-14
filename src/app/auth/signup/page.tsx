import type { Metadata } from "next";
import { SignupForm } from "./_form/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignupPage() {
  return <SignupForm />;
}
