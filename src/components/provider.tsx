"use client";

import CookieConsent from "@/components/blocks/cookie-consent";
import Footer from "@/components/footer";
import Navbar from "@/components/header";
import { pages } from "@/config/routes";
import fetch from "@/lib/fetcher";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import FullPageLoader from "./page-loader";
import { Toaster } from "./ui/sonner";

function ProviderInner({ children }: { children: React.ReactNode }) {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent !== null) {
      setCookieConsent(JSON.parse(savedConsent || "null"));
    }
  }, []);

  useEffect(() => {
    if (cookieConsent !== null) {
      localStorage.setItem("cookie-consent", JSON.stringify(cookieConsent));
    }
  }, [cookieConsent]);

  const handleAcceptCookies = () => {
    setCookieConsent(true);
  };

  const handleDeclineCookies = () => {
    setCookieConsent(false);
  };

  const theme = localStorage.getItem("theme") as "light" | "dark" | "system";

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (r) => fetch.get(r).then((r) => r.data),
      }}
    >
      <NextTopLoader color="oklch(71.4% 0.203 305.504)" />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        {children}
        <Footer />
        {cookieConsent === null && (
          <CookieConsent
            onAccept={handleAcceptCookies}
            onDecline={handleDeclineCookies}
            cookiePolicyUrl={pages.policies.cookies.index}
          />
        )}
      </ThemeProvider>
      <Toaster richColors position="top-center" theme={theme} />
    </SWRConfig>
  );
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FullPageLoader />
      </div>
    );
  }

  if (pathname.includes("/share/")) {
    return children;
  }

  return <ProviderInner>{children}</ProviderInner>;
};

export default Provider;
