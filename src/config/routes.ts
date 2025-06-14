export const pages = {
  home: "/",
  pricing: "/pricing",
  features: "/features",
  contact: "/contact",

  indoorPolicy: {
    ourPrivacy: "/our-privacy",
    ourTerm: "/our-term",
    ourCookie: "/our-cookie",
  },

  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    forgotPass: "/auth/forgot-password",
    resetPass: "/auth/reset-password",
  },

  dashboard: {
    index: "/dashboard",
    settings: "/dashboard/settings",
  },

  policies: {
    cookies: {
      index: "/policies/cookies",
      create: "/policies/cookies/create",
      view: (slug: string) => `/policies/cookies/${slug}` as const,
      edit: (slug: string) => `/policies/cookies/${slug}/edit` as const,
    },
    privacies: {
      index: "/policies/privacies",
      create: "/policies/privacies/create",
      view: (slug: string) => `/policies/privacies/${slug}` as const,
      edit: (slug: string) => `/policies/privacies/${slug}/edit` as const,
    },
    terms: {
      index: "/policies/terms",
      create: "/policies/terms/create",
      view: (slug: string) => `/policies/terms/${slug}` as const,
      edit: (slug: string) => `/policies/terms/${slug}/edit` as const,
    },
  },
} as const;

export const apis = {
  index: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    me: "/auth/me",
    logout: "/auth/logout",
  },

  cookies: {
    index: "/policies/cookies",
    create: "/policies/cookies",
    view: (slug: string) => `/policies/cookies/${slug}` as const,
    edit: (slug: string) => `/policies/cookies/${slug}/edit`,
  },
} as const;

export type Apis = typeof apis;
export type Pages = typeof pages;
