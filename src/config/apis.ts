export const API = {
  login: "/auth/login",
  register: "/auth/signup",
  check: "/auth/me",
} as const;

export type API = typeof API;
