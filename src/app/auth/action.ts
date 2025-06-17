"use server";

import { apis } from "@/config/routes";
import fetcher from "@/lib/fetcher";
import { User } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { LoginFormValues } from "./login/_form";

export type AuthResponse = {
  message: string;
  data: null | {
    user: User;
    tokens?: {
      access_token: string;
      refresh_token: string;
    };
  };
  error?: string;
};

const getOptions = (maxAge: number, httpOnly = true) => {
  const secure = process.env.NODE_ENV === "production";
  return { httpOnly, secure, sameSite: "lax", maxAge, path: "/" } as const;
};

export const createSession = async (
  data: LoginFormValues
): Promise<AuthResponse> => {
  try {
    const response = await fetcher.post<AuthResponse>(apis.auth.login, data);
    const cookieStore = await cookies();

    if (response.data?.tokens && response.data?.user) {
      cookieStore.set("access_token", response.data.tokens.access_token, {
        ...getOptions(60 * 60 * 24 * 7, true),
      });
      cookieStore.set("refresh_token", response.data.tokens.refresh_token, {
        ...getOptions(60 * 60 * 24 * 7, true),
      });
      cookieStore.set("user_store", JSON.stringify(response.data.user), {
        ...getOptions(60 * 60 * 24 * 365, false),
      });
    }

    revalidatePath("/");
    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    return {
      message: "Error",
      data: null,
      error: error instanceof Error ? error.message : "Failed to login",
    };
  }
};

export const destroySession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("user_store");
};
