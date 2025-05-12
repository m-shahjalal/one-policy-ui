"use client";

import CookieConsent from "@/components/blocks/cookie-consent";
import Footer from "@/components/footer";
import Navbar from "@/components/header";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import FullPageLoader from "./page-loader";

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

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      {children}
      <Footer />
      {cookieConsent === null && (
        <CookieConsent
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
          cookiePolicyUrl="/cookie-policy"
        />
      )}
    </ThemeProvider>
  );
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

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

  return <ProviderInner>{children}</ProviderInner>;
};

export default Provider;
