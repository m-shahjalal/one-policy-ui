"use client";

import { DetailsViewPage } from "@/components/shared/details-view";

export default function CookiePolicyPage() {
  const lastUpdated = "May 18, 2025";
  const effectiveDate = "May 18, 2025";

  const cookiePolicyText = `
# Cookie Policy

_Last updated: ${lastUpdated}_

OnePolicy uses cookies to enhance your experience. This policy explains how and why we use them.

## 1. What Are Cookies?

Cookies are small text files stored on your device when you visit a website.

## 2. Types of Cookies We Use

- **Essential Cookies**: Necessary for core functionality.
- **Analytics Cookies**: Help us understand how visitors interact.
- **Preference Cookies**: Remember your settings and choices.

## 3. Managing Cookies

You can disable cookies in your browser settings. However, doing so may affect site functionality.

## 4. Third-Party Cookies

Some cookies may be placed by third-party services we use, like analytics providers.

## 5. Changes to This Policy

We may update this policy. Continued use of the site implies acceptance.

## 6. Contact Us

Questions? Email us at [support@policymint.com](mailto:support@policymint.com).
  `;

  return (
    <DetailsViewPage
      type="cookie"
      title="Cookie Policy"
      description="This Cookie Policy explains how OnePolicy uses cookies and similar technologies to enhance your browsing experience."
      lastUpdated={lastUpdated}
      effectiveDate={effectiveDate}
      policyText={cookiePolicyText}
    />
  );
}
