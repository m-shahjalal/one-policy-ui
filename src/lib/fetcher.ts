import { toast } from "sonner";

const url = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  return new URL(path, baseUrl).toString();
};

const headers = (otherHeaders?: HeadersInit) => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...otherHeaders,
  };
};

const handleError = async <T>(response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    const msg = `HTTP error! status: ${response.status}, message: ${errorText}`;
    toast.error(msg);
    console.error(msg);
    throw new Error(msg);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const responseText = await response.text();
    const msg = `Expected JSON response but got: ${contentType}. Response: ${responseText.substring(
      0,
      200
    )}...`;
    toast.error(msg);
    console.error(msg);
    throw new Error(msg);
  }

  const result = await response.json();
  if (!result || !result.data) {
    const msg = `Invalid response format: expected an object with a 'data' field`;
    toast.error(msg);
    console.error(msg);
    throw new Error(msg);
  }

  return result.data as T;
};

export const fetcher = {
  get: async <T>(path: string, options?: RequestInit) => {
    const response = await fetch(url(path), {
      headers: headers(options?.headers),
      method: "GET",
      ...options,
    });

    return await handleError<T>(response);
  },
  post: async <T>(path: string, body: FIX_ME, options?: RequestInit) => {
    const response = await fetch(url(path), {
      headers: headers(options?.headers),
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });

    return await handleError<T>(response);
  },
  put: async <T>(path: string, body: FIX_ME, options?: RequestInit) => {
    const response = await fetch(url(path), {
      headers: headers(options?.headers),
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });

    return await handleError<T>(response);
  },
  delete: async <T>(path: string, options?: RequestInit) => {
    const response = await fetch(url(path), {
      headers: headers(options?.headers),
      method: "DELETE",
      ...options,
    });

    return await handleError<T>(response);
  },
};

export default fetcher;
