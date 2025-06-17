"use client";

import CookieConsent from "@/components/blocks/cookie-consent";
import Footer from "@/components/footer";
import Navbar from "@/components/header";
import { pages } from "@/config/routes";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import fetcher from "@/lib/fetcher";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useState } from "react";
import { SWRConfig } from "swr";
import FullPageLoader from "./page-loader";
import { Toaster } from "./ui/sonner";
import { ModalProvider } from "./blocks/modal";

function ProviderInner({
  children,
  hide,
}: {
  children: React.ReactNode;
  hide: boolean;
}) {
  const { loading } = useAuth();
  const [cookieConsent, setCookieConsent] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage?.getItem("cookie-consent") ? true : false;
  });

  const handleCookieConsent = (value: boolean) => {
    setCookieConsent(value);
    localStorage.setItem("cookie-consent", JSON.stringify(value));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen fixed top-0 left-0 right-0 z-50">
        <FullPageLoader />
      </div>
    );
  }

  return (
    <>
      {hide && <Navbar />}
      <div className="min-h-[calc(100vh-440px)]">{children}</div>
      {hide && <Footer />}
      {cookieConsent === null && (
        <CookieConsent
          onAccept={() => handleCookieConsent(true)}
          onDecline={() => handleCookieConsent(false)}
          cookiePolicyUrl={pages.policies.cookies.index}
        />
      )}
      <NextTopLoader color="rgb(88, 60, 180)" />
    </>
  );
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideHeaderFooter = !/\/auth|\/dashboard/.test(pathname);

  if (pathname.includes("/share/")) return children;

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (r) => fetcher.get(r as string),
        onError: (err) => console.error("SWR Error:", err),
      }}
    >
      <ModalProvider>
        <ThemeProvider attribute="class" enableSystem>
          <AuthProvider>
            <ProviderInner hide={hideHeaderFooter}>{children}</ProviderInner>
            <Toaster richColors position="top-center" />
          </AuthProvider>
        </ThemeProvider>
      </ModalProvider>
    </SWRConfig>
  );
};

export default Provider;
