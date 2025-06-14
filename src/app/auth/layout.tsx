import { AuthWrapper } from "@/components/shared/auth-layout";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
