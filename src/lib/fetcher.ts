// lib/axios.ts
import axios from "axios";
import Cookies from "js-cookie";

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ensure cookies are sent in requests
});

// Request interceptor for auth token from cookies
fetcher.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get token from cookie
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
        Cookies.remove("token");
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
