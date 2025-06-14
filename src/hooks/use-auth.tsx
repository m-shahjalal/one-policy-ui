"use client";

import { createSession, destroySession, type User } from "@/app/auth/action";
import { LoginFormValues } from "@/app/auth/login/_form";
import { pages } from "@/config/routes";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (
    data: LoginFormValues,
    next: string,
    form: UseFormReturn<{
      email: string;
      password: string;
      rememberMe: boolean;
    }>
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return { ...context };
}

function getUserStore(tokenName = "user_store"): User | null {
  const match = document.cookie.match(new RegExp(`(^| )${tokenName}=([^;]+)`));
  return match ? JSON.parse(decodeURIComponent(match[2])) : null;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeUser = () => {
      const store = getUserStore();
      setUser(store);
      setIsAuthenticated(store !== null);
      setLoading(false);
    };

    initializeUser();

    const handleStorageChange = () => initializeUser();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cookieUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookieUpdate", handleStorageChange);
    };
  }, []);

  const login = async (
    data: LoginFormValues,
    next: string,
    form: UseFormReturn<{
      email: string;
      password: string;
      rememberMe: boolean;
    }>
  ): Promise<void> => {
    setLoading(true);
    try {
      const session = await createSession(data);

      if (session.error || !session.data?.user) {
        setUser(null);
        setIsAuthenticated(false);
        return form.setError("root", { message: "Invalid credentials." });
      }

      toast.success("Successfully signed in!");
      window.location.reload();
      router.push(next);
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
      setIsAuthenticated(false);
      form.setError("root", { message: "Invalid credentials." });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await destroySession();

      setUser(null);
      setIsAuthenticated(false);
      window.location.reload();
      router.push(pages.auth.login);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
