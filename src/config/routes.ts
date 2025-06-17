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
    view: (slug: string) => `/dashboard/${slug}` as const,
    edit: (slug: string) => `/dashboard/${slug}/edit` as const,
  },

  policies: {
    cookies: {
      index: "/policies/cookies",
      create: "/policies/cookies/create",
    },
    privacies: {
      index: "/policies/privacies",
      create: "/policies/privacies/create",
    },
    terms: {
      index: "/policies/terms",
      create: "/policies/terms/create",
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

  policies: {
    index: "/policies",
    create: "/policies/create",
    view: (id: string) => `/policies/${id}`,
    edit: (id: string) => `/policies/${id}/edit`,
    delete: (id: string) => `/policies/${id}`,
    ai_edit: (id: string) => `/policies/${id}/ai-edit`,
  },
} as const;

export type Apis = typeof apis;
export type Pages = typeof pages;
