"use client";

import { DetailsViewPage } from "@/components/shared/details-view";

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 18, 2025";
  const effectiveDate = "May 18, 2025";

  const privacyPolicyText = `
# Privacy Policy

_Last updated: ${lastUpdated}_

Welcome to OnePolicy. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.

## 1. Information We Collect

We may collect the following personal information:
- Name
- Email address
- IP address
- Usage data and analytics

## 2. How We Use Your Information

We use your information to:
- Provide and maintain our service
- Notify you about changes
- Provide customer support
- Monitor usage for analytics

## 3. Sharing Your Information

We may share your data with:
- Third-party service providers (e.g., analytics tools)
- Legal authorities when required by law

## 4. GDPR & CCPA Rights

If you are a resident of the EU or California, you have the right to:
- Access your data
- Request deletion or correction
- Object to data processing

## 5. Data Security

We implement reasonable measures to protect your data, but no system is 100% secure.

## 6. Contact Us

If you have any questions, contact us at [support@policymint.com](mailto:support@policymint.com).
  `;

  return (
    <DetailsViewPage
      type="privacy"
      title="Privacy Policy"
      description="This Privacy Policy explains how OnePolicy collects, uses, and discloses your information and explains the rights you have with respect to your information."
      lastUpdated={lastUpdated}
      effectiveDate={effectiveDate}
      policyText={privacyPolicyText}
    />
  );
}
