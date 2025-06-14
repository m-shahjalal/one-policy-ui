"use client";

import { toast } from "sonner";

// This ensures toast is only used on the client side
const safeToast = {
  error: (message: string) => {
    if (typeof window !== "undefined") {
      toast.error(message);
    }
  },
  success: (message: string) => {
    if (typeof window !== "undefined") {
      toast.success(message);
    }
  },
  info: (message: string) => {
    if (typeof window !== "undefined") {
      toast.info(message);
    }
  },
};

export default safeToast;
