import { NextRequest, NextResponse } from "next/server";
import { apis, pages } from "./config/routes";
import { url } from "./lib/fetcher";

const publicPaths = [
  pages.home,
  pages.auth.login,
  pages.auth.signup,
  pages.auth.forgotPass,
  pages.auth.resetPass,
  pages.features,
  pages.pricing,
  pages.contact,
  pages.indoorPolicy.ourPrivacy,
  pages.indoorPolicy.ourTerm,
  pages.indoorPolicy.ourCookie,
  pages.policies.cookies.index,
  pages.policies.privacies.index,
  pages.policies.terms.index,
] as const;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isPublicPath = publicPaths.some((p) => {
    const cleanPath = p.replace(/\/$/, "");
    const cleaned = pathname.replace(/\/$/, "");
    return cleanPath === cleaned || (cleaned === "" && cleanPath === "/");
  });

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL(pages.auth.login, request.url);
    loginUrl.searchParams.set("next", pathname);
    const response = NextResponse.redirect(loginUrl);
    clearUserCookies(response);
    return response;
  }

  if (token && pathname.includes("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const Cookie = request.cookies
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    const validationResponse = await fetch(url(apis.auth.me), {
      headers: { Cookie },
    });
    const result = await validationResponse.json();

    if (!result?.success) {
      const loginUrl = new URL(pages.auth.login, request.url);
      loginUrl.searchParams.set("next", pathname);
      const response = NextResponse.redirect(loginUrl);
      clearUserCookies(response);
      return response;
    }

    const response = NextResponse.next();
    if (result.data) setUserCookies(response, result.data);

    return response;
  } catch (error) {
    console.error("Error validating session:", error);
    const loginUrl = new URL(pages.auth.login, request.url);
    loginUrl.searchParams.set("next", pathname);
    const response = NextResponse.redirect(loginUrl);
    clearUserCookies(response);
    return response;
  }
}

function setUserCookies(response: NextResponse, userData: FIX_ME) {
  const cookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  };
  response.cookies.set("user_store", JSON.stringify(userData), cookieOptions);
}

function clearUserCookies(response: NextResponse) {
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  response.cookies.delete("user_store");
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
