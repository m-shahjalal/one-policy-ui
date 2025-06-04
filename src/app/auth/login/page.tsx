import type { Metadata } from "next";
import LoginForm from "./_form/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return <LoginForm />;
}
