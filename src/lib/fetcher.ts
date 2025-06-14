export type ApiResponse = {
  status: number;
  message: string;
  data: FIX_ME;
};

export const url = (path: string) => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }

  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  if (path.startsWith("http")) return path;
  return `${baseUrl}/${path}`;
};

const options = (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data = {}
): RequestInit => {
  const obj = {
    method,
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  } as RequestInit;

  if (method !== "GET") {
    obj.body = JSON.stringify(data);
  }

  return obj;
};

export const fetcher = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(url(path), options("GET"));
    return response.json();
  },

  post: async <T>(path: string, data: FIX_ME): Promise<T> => {
    const response = await fetch(url(path), options("POST", data));
    return response.json();
  },

  put: async <T>(path: string, data: FIX_ME): Promise<T> => {
    const response = await fetch(url(path), options("PUT", data));
    return response.json();
  },

  delete: async <T>(path: string): Promise<T> => {
    const response = await fetch(url(path), options("DELETE"));
    return response.json();
  },

  patch: async <T>(path: string, data: FIX_ME): Promise<T> => {
    const response = await fetch(url(path), options("PATCH", data));
    return response.json();
  },
};

export default fetcher;
