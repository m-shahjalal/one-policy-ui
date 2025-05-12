"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Send, CheckCircle, Building, Phone, User } from "lucide-react";
import ResponsiveMap from "./maps";

// Define the form schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val),
      { message: "Please enter a valid phone number" }
    ),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

// Infer the type from the schema
type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    startTransition(() => {
      console.info("Form submitted:", data);
    });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.1) 2px, transparent 0)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white pt-20">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Have questions about OnePolicy? Our team is here to help you with
              any inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact form section */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center items-center">
            {/* Contact information */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Fill out the form and our team will get back to you within 24
                  hours.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-md opacity-80" />
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      support@onepolicy.com
                    </p>
                    <a
                      href="mailto:support@onepolicy.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-1 inline-block"
                    >
                      Send an email
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/50 rounded-full blur-md opacity-80" />
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md">
                      <Phone className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">
                      Phone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Monday - Friday, 9AM - 5PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/50 rounded-full blur-md opacity-80" />
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
                      <Building className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">
                      Office
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Legal Avenue, Suite 101
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                {/* Decorative top border */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

                <div className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="relative mx-auto w-16 h-16 mb-6">
                        <div className="absolute inset-0 bg-green-100 dark:bg-green-900/50 rounded-full blur-md opacity-80" />
                        <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-md">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 dark:text-white">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Thank you for contacting us. We&apos;ll get back to you
                        as soon as possible.
                      </p>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6 dark:text-white">
                        Send us a Message
                      </h2>

                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="Your name"
                                        {...field}
                                        className="pl-10"
                                      />
                                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="your.email@example.com"
                                        type="email"
                                        {...field}
                                        className="pl-10"
                                      />
                                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Company{" "}
                                    <span className="text-gray-400">
                                      (Optional)
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="Your company"
                                        {...field}
                                        className="pl-10"
                                      />
                                      <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Phone{" "}
                                    <span className="text-gray-400">
                                      (Optional)
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="(123) 456-7890"
                                        {...field}
                                        className="pl-10"
                                      />
                                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="general">
                                      General Inquiry
                                    </SelectItem>
                                    <SelectItem value="support">
                                      Technical Support
                                    </SelectItem>
                                    <SelectItem value="billing">
                                      Billing Question
                                    </SelectItem>
                                    <SelectItem value="partnership">
                                      Partnership Opportunity
                                    </SelectItem>
                                    <SelectItem value="feedback">
                                      Feedback
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="How can we help you?"
                                    className="min-h-[120px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Please provide as much detail as possible.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="pt-2">
                            <Button
                              type="submit"
                              disabled={isPending}
                              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 h-12"
                            >
                              {isPending ? (
                                <div className="flex items-center">
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                  </svg>
                                  Sending...
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Send className="mr-2 h-5 w-5" />
                                  Send Message
                                </div>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ResponsiveMap />
    </div>
  );
}
