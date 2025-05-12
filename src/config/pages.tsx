export const pages = {
  home: "/",
  pricing: "/pricing",
  features: "/features",
  contact: "/contact",
  ourPolicy: "/our-policy",
  ourPrivacy: "/our-privacy",
  ourTerms: "/our-terms",
  ourCookie: "/our-cookie",
  ourGDPR: "/our-gdpr",

  cookies: {
    index: "/cookies",
    create: {
      step1: "/cookies/create/step1",
      step2: "/cookies/create/step2",
      step3: "/cookies/create/step3",
      step4: "/cookies/create/step4",
    },
    view: (id: string) => `/cookies/view/${id}`,
    edit: (id: string) => ({
      step1: `/cookies/edit/${id}/step1`,
      step2: `/cookies/edit/${id}/step2`,
      step3: `/cookies/edit/${id}/step3`,
      step4: `/cookies/edit/${id}/step4`,
    }),
  },
  policies: {
    index: "/policies",
    create: {
      step1: "/policies/create/step1",
      step2: "/policies/create/step2",
      step3: "/policies/create/step3",
      step4: "/policies/create/step4",
    },
    view: (id: string) => `/policies/view/${id}`,
    edit: (id: string) => ({
      step1: `/policies/edit/${id}/step1`,
      step2: `/policies/edit/${id}/step2`,
      step3: `/policies/edit/${id}/step3`,
      step4: `/policies/edit/${id}/step4`,
    }),
  },
  terms: {
    index: "/terms",
    create: {
      step1: "/terms/create/step1",
      step2: "/terms/create/step2",
      step3: "/terms/create/step3",
      step4: "/terms/create/step4",
    },
    view: (id: string) => `/terms/view/${id}`,
    edit: (id: string) => ({
      step1: `/terms/edit/${id}/step1`,
      step2: `/terms/edit/${id}/step2`,
      step3: `/terms/edit/${id}/step3`,
      step4: `/terms/edit/${id}/step4`,
    }),
  },
};
