import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication pages for OnePolicy",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
