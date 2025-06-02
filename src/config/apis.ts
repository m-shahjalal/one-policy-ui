export const API = {
  login: "/auth/login",
  register: "/auth/signup",
  check: "/auth/me",

  cookies: {
    create: "/policy/cookie",
    view: (slug: string) => "/policy/cookie/" + slug,
  },
} as const;

export type API = typeof API;
