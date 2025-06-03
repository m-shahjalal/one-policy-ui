import { z } from "zod";

// STEP 1: Basic Website Information
export const cookieStepOne = z
  .object({
    siteName: z.string().min(3, { message: "Site Name is required" }),
    siteURL: z.string().url({ message: "Please enter a valid URL" }),
    entityType: z.enum(["business", "individual", "nonprofit", "government"], {
      message: "Please select an entity type",
    }),
    organization: z
      .object({
        name: z.string().min(3, { message: "Organization Name is required" }),
        address: z
          .string()
          .min(3, { message: "Organization Address is required" }),
      })
      .optional(),

    jurisdiction: z.object({
      country: z.string().min(3, { message: "Country is required" }),
      state: z.string().min(3, { message: "State is required" }),
      city: z.string().min(3, { message: "City is required" }),
    }),

    effectiveDate: z.date({ message: "Please enter a valid date" }),
    lastUpdated: z.date({ message: "Please enter a valid date" }),
  })
  .refine(
    (data) => {
      if (data.entityType !== "individual") {
        return true; // Organization is not required for non-individual entities
      }
      return data.organization !== undefined;
    },
    {
      message: "Organization is required for individual entity type",
      path: ["organization"],
    }
  );

// STEP 2: Cookie Usage Information
export const cookieStepTwo = z.object({
  cookieTypes: z
    .object({
      necessary: z.boolean().default(true),
      preferences: z.boolean().default(false),
      analytics: z.boolean().default(false),
      advertising: z.boolean().default(false),
      socialMedia: z.boolean().default(false),
      content: z.boolean().default(false),
      personalization: z.boolean().default(false),
    })
    .refine((value) => {
      return (
        value.necessary ||
        value.preferences ||
        value.analytics ||
        value.advertising ||
        value.socialMedia ||
        value.content ||
        value.personalization
      );
    }),

  cookieDuration: z.object({
    session: z.boolean().default(true),
    persistent: z.boolean().default(false),
    persistentDuration: z
      .enum([
        "up_to_30_days",
        "up_to_90_days",
        "up_to_180_days",
        "up_to_365_days",
        "forever",
      ])
      .optional(),
  }),

  cookieOrigin: z
    .object({
      firstParty: z.boolean().default(true),
      thirdParty: z.boolean().default(false),
      thirdPartyURLList: z
        .array(z.string().url({ message: "Please enter a valid URL" }))
        .optional(),
    })
    .refine(
      (value) => {
        if (value.thirdParty) {
          return (
            value.thirdPartyURLList !== undefined &&
            value.thirdPartyURLList.length > 0 &&
            value.thirdPartyURLList.every((url) => url.trim() !== "")
          );
        }
        return true;
      },
      {
        message:
          "At least one valid third-party URL is required when third-party cookies are enabled",
        path: ["thirdPartyURLList"],
      }
    ),
});

// STEP 3: Compliance & Consent
export const cookieStepThree = z
  .object({
    compliance: z
      .object({
        gdpr: z.boolean().default(false),
        ccpa: z.boolean().default(false),
        other: z.boolean().default(false),
        otherCompliance: z.string().optional(),
      })
      .refine(
        (value) => {
          if (value.other) {
            return (
              value.otherCompliance !== undefined &&
              value.otherCompliance.trim() !== ""
            );
          }
          return true;
        },
        {
          message: "Please specify other compliance requirements",
          path: ["otherCompliance"],
        }
      ),
    consentManagement: z
      .object({
        banner: z.boolean().default(false),
        acceptRejectButtons: z.boolean().default(false),
        categorySelection: z.boolean().default(true),
        addLinks: z.boolean().default(false),
        consentExpiry: z
          .enum([
            "session",
            "up_to_30_days",
            "up_to_90_days",
            "up_to_180_days",
            "up_to_365_days",
            "forever",
          ])
          .optional(),
      })
      .refine(
        (value) => {
          if (value.banner) {
            return value.consentExpiry !== undefined;
          }
          return true;
        },
        {
          message:
            "Please select consent expiry duration when using cookie banner",
          path: ["consentExpiry"],
        }
      ),
  })
  .refine(
    (data) => {
      // At least one compliance requirement must be selected
      return (
        data.compliance.gdpr || data.compliance.ccpa || data.compliance.other
      );
    },
    {
      message: "Please select at least one compliance requirement",
      path: ["compliance"],
    }
  );

// STEP 4: Contact Information
export const cookieStepFour = z
  .object({
    preferredContactMethod: z.enum(["email", "phone", "website", "mail"], {
      message: "Please select a contact method",
    }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .optional(),
    phone: z
      .string()
      .min(3, { message: "Phone Number is required" })
      .optional(),
    website: z.string().url({ message: "Please enter a valid URL" }).optional(),
    mailingAddress: z
      .string()
      .min(3, { message: "Mailing Address is required" })
      .optional(),
  })
  .refine(
    (data) => {
      // Check if the required field for the selected contact method is provided
      switch (data.preferredContactMethod) {
        case "email":
          return data.email !== undefined && data.email.length > 0;
        case "phone":
          return data.phone !== undefined && data.phone.length > 0;
        case "website":
          return data.website !== undefined && data.website.length > 0;
        case "mail":
          return (
            data.mailingAddress !== undefined && data.mailingAddress.length > 0
          );
        default:
          return false;
      }
    },
    (data) => {
      const fieldMap = {
        email: "Email",
        phone: "Phone Number",
        website: "Website",
        mail: "Mailing Address",
      };

      const fieldName = fieldMap[data.preferredContactMethod];

      return {
        message: `${fieldName} is required for your preferred contact method`,
        path: [
          data.preferredContactMethod === "mail"
            ? "mailingAddress"
            : data.preferredContactMethod,
        ],
      };
    }
  );

// Combined schema for the entire form
export const cookieFormSchema = z.object({
  stepOne: cookieStepOne,
  stepTwo: cookieStepTwo,
  stepThree: cookieStepThree,
  stepFour: cookieStepFour,
});

export type CookieStepOne = z.output<typeof cookieStepOne>;
export type CookieStepTwo = z.output<typeof cookieStepTwo>;
export type CookieStepThree = z.output<typeof cookieStepThree>;
export type CookieStepFour = z.output<typeof cookieStepFour>;
export type CookieForm = z.output<typeof cookieFormSchema>;

export const cookieFormDefaultValues: CookieForm = {
  stepOne: {
    siteName: "",
    siteURL: "",
    entityType: "business",
    jurisdiction: {
      country: "",
      state: "",
      city: "",
    },
    effectiveDate: new Date(),
    lastUpdated: new Date(),
  },
  stepTwo: {
    cookieTypes: {
      necessary: true,
      preferences: false,
      analytics: false,
      advertising: false,
      socialMedia: false,
      content: false,
      personalization: false,
    },
    cookieDuration: {
      session: true,
      persistent: false,
      persistentDuration: undefined,
    },
    cookieOrigin: {
      firstParty: true,
      thirdParty: false,
      thirdPartyURLList: [],
    },
  },
  stepThree: {
    compliance: {
      gdpr: false,
      ccpa: true,
      other: false,
      otherCompliance: undefined,
    },
    consentManagement: {
      banner: false,
      acceptRejectButtons: false,
      categorySelection: true,
      addLinks: false,
      consentExpiry: undefined,
    },
  },
  stepFour: {
    preferredContactMethod: "email",
    email: "text@mail.com",
  },
};
