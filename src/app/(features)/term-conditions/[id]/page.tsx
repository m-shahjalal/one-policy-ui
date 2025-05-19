"use client";

import { DetailsViewPage } from "@/components/shared/details-view";

export default function TermsPage() {
  const lastUpdated = "May 18, 2025";
  const effectiveDate = "May 18, 2025";

  const termsText = `
# Terms and Conditions

_Last updated: ${lastUpdated}_

Welcome to OnePolicy. These Terms and Conditions govern your use of our website and services.

## 1. Acceptance of Terms

By accessing or using OnePolicy, you agree to be bound by these Terms and Conditions.

## 2. Use of Service

You agree to:
- Use the service legally and ethically
- Not violate any laws
- Not interfere with service operation
- Not attempt unauthorized access

## 3. User Accounts

You are responsible for:
- Maintaining account security
- All activities under your account
- Providing accurate information

## 4. Intellectual Property

All content on OnePolicy is protected by copyright and other intellectual property laws.

## 5. Limitation of Liability

OnePolicy is not liable for any indirect, incidental, or consequential damages.

## 6. Changes to Terms

We may modify these terms at any time. Continued use implies acceptance.

## 7. Contact Us

Questions? Email us at [support@policymint.com](mailto:support@policymint.com).
  `;

  return (
    <DetailsViewPage
      type="terms"
      title="Terms and Conditions"
      description="These Terms and Conditions govern your use of our website and services."
      lastUpdated={lastUpdated}
      effectiveDate={effectiveDate}
      policyText={termsText}
    />
  );
}
