export const pages = {
  home: "/",
  pricing: "/pricing",
  features: "/features",
  contact: "/contact",

  indoorPolicy: {
    ourPolicy: "/our-policy",
    ourPrivacy: "/our-privacy",
    ourTerms: "/our-terms",
    ourCookie: "/our-cookie",
    ourGDPR: "/our-gdpr",
  },

  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    forgotPass: "/auth/forgot-password",
    resetPass: "/auth/reset-password",
  },

  policies: {
    cookies: {
      index: "/cookie-policy",
      create: "/cookie-policy/create",
      view: (slug: string) => `/cookie-policy/${slug}`,
      edit: (slug: string) => `/cookie-policy/${slug}/edit`,
    },
    privacy: {
      index: "/policy/privacy",
      create: "/policy/privacy",
    },
    term: {
      index: "/policy/term",
    },
  },
};
