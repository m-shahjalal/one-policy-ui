"use client";

import FeatureLandingPage from "@/components/shared/feature-landing";
import {
  Shield,
  Lock,
  Globe,
  UserCheck,
  RefreshCw,
  FileText,
  CheckCircle,
} from "lucide-react";

export default function PrivacyPolicyLanding() {
  return (
    <FeatureLandingPage
      type="privacy"
      title="Privacy Policy Generator"
      subtitle="Create a comprehensive, legally compliant privacy policy for your website or app in minutes. No legal expertise required."
      heroIcon={Shield}
      heroTagline="Privacy Compliance Made Simple"
      // Colors
      primaryColor="blue"
      secondaryColor="indigo"
      gradientFrom="#1d4ed8"
      gradientTo="#3b82f6"
      darkGradientFrom="#3b82f6"
      darkGradientTo="#60a5fa"
      // Features
      features={[
        {
          icon: Lock,
          title: "Data Protection",
          description:
            "Explain how you protect user data and maintain security standards",
          color: "bg-blue-50 dark:bg-blue-900/20",
          iconColor: "text-blue-500 dark:text-blue-400",
          borderColor: "border-blue-200 dark:border-blue-800",
        },
        {
          icon: Globe,
          title: "Global Compliance",
          description:
            "Meet requirements for GDPR, CCPA, and other international regulations",
          color: "bg-indigo-50 dark:bg-indigo-900/20",
          iconColor: "text-indigo-500 dark:text-indigo-400",
          borderColor: "border-indigo-200 dark:border-indigo-800",
        },
        {
          icon: UserCheck,
          title: "User Rights",
          description:
            "Clearly outline user rights regarding their personal information",
          color: "bg-sky-50 dark:bg-sky-900/20",
          iconColor: "text-sky-500 dark:text-sky-400",
          borderColor: "border-sky-200 dark:border-sky-800",
        },
        {
          icon: RefreshCw,
          title: "Regular Updates",
          description:
            "Stay compliant with automatic updates when regulations change",
          color: "bg-cyan-50 dark:bg-cyan-900/20",
          iconColor: "text-cyan-500 dark:text-cyan-400",
          borderColor: "border-cyan-200 dark:border-cyan-800",
        },
      ]}
      // How It Works
      howItWorksSteps={[
        {
          title: "Answer Questions",
          description:
            "Fill out our simple questionnaire about your business and data practices",
          icon: FileText,
        },
        {
          title: "Generate Policy",
          description:
            "Our system creates a customized privacy policy based on your answers",
          icon: RefreshCw,
        },
        {
          title: "Implement & Update",
          description:
            "Add the policy to your site and receive updates when laws change",
          icon: CheckCircle,
        },
      ]}
      // Testimonials
      testimonials={[
        {
          quote:
            "The privacy policy generator saved me hours of legal research and helped ensure my website is fully compliant.",
          author: "Sarah Johnson",
          role: "E-commerce Entrepreneur",
          rating: 5,
        },
        {
          quote:
            "Clear, comprehensive, and customized to my specific business needs. Couldn't ask for a better solution.",
          author: "Michael Chen",
          role: "App Developer",
          rating: 5,
        },
        {
          quote:
            "As a small business owner, I needed something simple yet thorough. This exceeded my expectations.",
          author: "Emma Rodriguez",
          role: "Marketing Consultant",
          rating: 4,
        },
      ]}
      // FAQ
      faqItems={[
        {
          question: "Do I really need a privacy policy?",
          answer:
            "Yes, if you collect any personal information from users (including through cookies, analytics, or contact forms), you're legally required to have a privacy policy in most jurisdictions. It's also essential for building trust with your users.",
        },
        {
          question: "How often should I update my privacy policy?",
          answer:
            "You should update your privacy policy whenever you change how you collect, use, or share user data, or when relevant privacy laws change. We recommend reviewing your policy at least every 6-12 months.",
        },
        {
          question: "Will this privacy policy work for my specific business?",
          answer:
            "Our privacy policy generator creates customized policies based on your specific business practices, the data you collect, and the jurisdictions you operate in. The result is a tailored policy that addresses your unique needs.",
        },
        {
          question: "Is the generated privacy policy legally compliant?",
          answer:
            "Yes, our privacy policies are designed to comply with major privacy regulations including GDPR, CCPA, and others. However, for complex businesses or specific legal concerns, we recommend consulting with a legal professional.",
        },
      ]}
      // CTA
      ctaTitle="Ready to Create Your Privacy Policy?"
      ctaDescription="Generate a comprehensive, legally compliant privacy policy in minutes. No legal expertise required."
      // URLs
      viewSampleUrl="/privacy-policy/view"
    />
  );
}
