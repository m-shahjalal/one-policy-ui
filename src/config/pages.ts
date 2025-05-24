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

  cookies: {
    index: "/cookie-policy",
    create: "/cookie-policy/create",
    view: (id: string) => `/cookie-policy/view/${id}`,
    edit: (id: string) => `/cookie-policy/${id}/edit`,
  },
  privacies: {
    index: "/privacy-policy",
    create: "/privacy-policy/create",
    view: (id: string) => `/privacy-policy/view/${id}`,
    edit: (id: string) => `/privacy-policy/${id}/edit`,
  },
  terms: {
    index: "/term-conditions",
    create: "/term-conditions/create",
    view: (id: string) => `/term-conditions/view/${id}`,
    edit: (id: string) => `/term-conditions/${id}/edit`,
  },
};
