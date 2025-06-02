"use client";

import FeatureLandingPage from "@/components/shared/feature-landing";
import { pages } from "@/config/pages";
import {
  Cookie,
  Globe,
  ShieldCheck,
  FileWarning,
  RefreshCw,
  FileText,
  CheckCircle,
} from "lucide-react";

export default function CookiePolicyLanding() {
  return (
    <FeatureLandingPage
      type="cookie"
      title="Cookie Policy Generator"
      subtitle="Create a comprehensive, legally compliant cookie policy for your website in minutes. Inform your users and meet global cookie regulations."
      heroIcon={Cookie}
      heroTagline="Cookie Compliance Made Simple"
      // Colors
      primaryColor="emerald"
      secondaryColor="green"
      gradientFrom="#059669"
      gradientTo="#10b981"
      darkGradientFrom="#10b981"
      darkGradientTo="#34d399"
      // Features
      features={[
        {
          icon: Globe,
          title: "GDPR Compliance",
          description:
            "Meet EU cookie regulations with clear consent mechanisms and disclosures",
          color: "bg-emerald-50 dark:bg-emerald-900/20",
          iconColor: "text-emerald-500 dark:text-emerald-400",
          borderColor: "border-emerald-200 dark:border-emerald-800",
        },
        {
          icon: ShieldCheck,
          title: "Transparency",
          description:
            "Build trust by clearly explaining how you use cookies and tracking technologies",
          color: "bg-green-50 dark:bg-green-900/20",
          iconColor: "text-green-500 dark:text-green-400",
          borderColor: "border-green-200 dark:border-green-800",
        },
        {
          icon: FileWarning,
          title: "Risk Mitigation",
          description:
            "Avoid penalties and legal issues with a compliant cookie policy",
          color: "bg-teal-50 dark:bg-teal-900/20",
          iconColor: "text-teal-500 dark:text-teal-400",
          borderColor: "border-teal-200 dark:border-teal-800",
        },
        {
          icon: RefreshCw,
          title: "Regular Updates",
          description:
            "Stay compliant with automatic updates when regulations change",
          color: "bg-lime-50 dark:bg-lime-900/20",
          iconColor: "text-lime-500 dark:text-lime-400",
          borderColor: "border-lime-200 dark:border-lime-800",
        },
      ]}
      // How It Works
      howItWorksSteps={[
        {
          title: "Answer Questions",
          description:
            "Fill out our simple questionnaire about your website and cookie usage",
          icon: FileText,
        },
        {
          title: "Generate Policy",
          description:
            "Our system creates a customized cookie policy based on your answers",
          icon: RefreshCw,
        },
        {
          title: "Implement & Update",
          description:
            "Add the policy to your site and receive updates when regulations change",
          icon: CheckCircle,
        },
      ]}
      // Testimonials
      testimonials={[
        {
          quote:
            "The cookie policy generator made compliance simple and straightforward. Highly recommended for any website owner.",
          author: "Thomas Reynolds",
          role: "Marketing Director",
          rating: 5,
        },
        {
          quote:
            "Clear, comprehensive, and customized to my specific website needs. Exactly what I was looking for.",
          author: "Sophia Garcia",
          role: "Blog Owner",
          rating: 5,
        },
        {
          quote:
            "As a small business owner, I needed something simple yet thorough. This exceeded my expectations.",
          author: "James Wilson",
          role: "E-commerce Store Owner",
          rating: 4,
        },
      ]}
      // FAQ
      faqItems={[
        {
          question: "Why do I need a Cookie Policy?",
          answer:
            "A Cookie Policy is required by privacy laws like GDPR and ePrivacy Directive if your website uses cookies. It informs users about what cookies you use, how you use them, and gives them control over their data. Beyond legal requirements, it builds trust with your visitors by being transparent about data collection.",
        },
        {
          question: "How often should I update my Cookie Policy?",
          answer:
            "You should update your Cookie Policy whenever you change how you use cookies, add new cookies or tracking technologies, or when relevant privacy laws change. We recommend reviewing your policy at least every 6 months to ensure it remains current and compliant.",
        },
        {
          question: "Will this Cookie Policy work for my specific website?",
          answer:
            "Our Cookie Policy generator creates customized policies based on your specific website, the cookies you use, and the jurisdictions you operate in. The result is a tailored policy that addresses your unique needs.",
        },
        {
          question: "Do I need a Cookie Banner as well?",
          answer:
            "Yes, in many jurisdictions (especially under GDPR), you need both a Cookie Policy and a Cookie Consent Banner. The policy provides detailed information, while the banner obtains user consent before non-essential cookies are set. Our solution can help you implement both.",
        },
      ]}
      // CTA
      ctaTitle="Ready to Create Your Cookie Policy?"
      ctaDescription="Generate a comprehensive, legally compliant cookie policy in minutes. No legal expertise required."
      viewSampleUrl={pages.policies.cookies.index}
      generateUrl={pages.policies.cookies.create}
    />
  );
}
