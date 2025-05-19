"use client";

import FeatureLandingPage from "@/components/shared/feature-landing";
import {
  CheckCircle,
  FileCheck,
  FileText,
  Gavel,
  RefreshCw,
  Scale,
  Shield,
} from "lucide-react";

export default function TermsLanding() {
  return (
    <FeatureLandingPage
      type="terms"
      title="Terms & Conditions Generator"
      subtitle="Create comprehensive, legally sound terms and conditions for your website or app in minutes. Protect your business without the legal complexity."
      heroIcon={Scale}
      heroTagline="Legal Protection Made Simple"
      // Colors
      primaryColor="purple"
      secondaryColor="fuchsia"
      gradientFrom="#7e22ce"
      gradientTo="#d946ef"
      darkGradientFrom="#a855f7"
      darkGradientTo="#e879f9"
      // Features
      features={[
        {
          icon: Shield,
          title: "Liability Protection",
          description:
            "Limit your liability and protect your business from potential legal issues",
          color: "bg-purple-50 dark:bg-purple-900/20",
          iconColor: "text-purple-500 dark:text-purple-400",
          borderColor: "border-purple-200 dark:border-purple-800",
        },
        {
          icon: Gavel,
          title: "Legal Compliance",
          description:
            "Ensure your terms meet all legal requirements for your jurisdiction",
          color: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
          iconColor: "text-fuchsia-500 dark:text-fuchsia-400",
          borderColor: "border-fuchsia-200 dark:border-fuchsia-800",
        },
        {
          icon: FileCheck,
          title: "User Guidelines",
          description:
            "Clearly define acceptable use policies and user responsibilities",
          color: "bg-violet-50 dark:bg-violet-900/20",
          iconColor: "text-violet-500 dark:text-violet-400",
          borderColor: "border-violet-200 dark:border-violet-800",
        },
        {
          icon: RefreshCw,
          title: "Regular Updates",
          description:
            "Stay compliant with automatic updates when regulations change",
          color: "bg-pink-50 dark:bg-pink-900/20",
          iconColor: "text-pink-500 dark:text-pink-400",
          borderColor: "border-pink-200 dark:border-pink-800",
        },
      ]}
      // How It Works
      howItWorksSteps={[
        {
          title: "Answer Questions",
          description:
            "Fill out our simple questionnaire about your business and services",
          icon: FileText,
        },
        {
          title: "Generate Terms",
          description:
            "Our system creates customized terms and conditions based on your answers",
          icon: RefreshCw,
        },
        {
          title: "Implement & Update",
          description:
            "Add the terms to your site and receive updates when needed",
          icon: CheckCircle,
        },
      ]}
      // Testimonials
      testimonials={[
        {
          quote:
            "The terms generator saved me thousands in legal fees and gave me peace of mind that my business is protected.",
          author: "David Wilson",
          role: "SaaS Founder",
          rating: 5,
        },
        {
          quote:
            "Clear, comprehensive, and customized to my specific business model. Exactly what I needed.",
          author: "Jessica Park",
          role: "Online Store Owner",
          rating: 5,
        },
        {
          quote:
            "As a freelancer, I needed solid terms without the legal complexity. This solution was perfect.",
          author: "Marcus Thompson",
          role: "Digital Consultant",
          rating: 4,
        },
      ]}
      // FAQ
      faqItems={[
        {
          question: "Why do I need Terms and Conditions?",
          answer:
            "Terms and Conditions establish the legal agreement between you and your users, protecting your business by limiting liability, setting usage rules, defining intellectual property rights, and establishing dispute resolution procedures. They're essential for any business with a website or app.",
        },
        {
          question: "How often should I update my Terms and Conditions?",
          answer:
            "You should update your Terms and Conditions whenever you change your business practices, offerings, or when relevant laws change. We recommend reviewing your terms at least every 6-12 months to ensure they remain current and compliant.",
        },
        {
          question:
            "Will these Terms and Conditions work for my specific business?",
          answer:
            "Our Terms and Conditions generator creates customized terms based on your specific business model, services offered, and jurisdictions you operate in. The result is a tailored agreement that addresses your unique needs.",
        },
        {
          question: "Are the generated Terms and Conditions legally binding?",
          answer:
            "Yes, our Terms and Conditions are designed to create a legally binding agreement between you and your users. However, for complex businesses or specific legal concerns, we recommend consulting with a legal professional.",
        },
      ]}
      // CTA
      ctaTitle="Ready to Create Your Terms & Conditions?"
      ctaDescription="Generate comprehensive, legally sound terms and conditions in minutes. No legal expertise required."
      // URLs
      viewSampleUrl="/terms/view"
    />
  );
}
