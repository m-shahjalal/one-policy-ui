// lib/axios.ts
import axios from "axios";

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor for auth token from cookies
fetcher.interceptors.request.use(
  (config) => {
    const token = "token"; // Get token from cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (unchanged)
fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } else if (status === 403) {
      console.error("Access denied");
    } else if (status === 500) {
      console.error("Server error");
    } else {
      console.error("API error", error);
    }

    return Promise.reject(error);
  }
);

export default fetcher;
