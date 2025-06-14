import fetcher from "./fetcher";

export const createOrUpdatePolicy = async <T = unknown>(
  url: string,
  options: { arg: { formData: T } }
) => {
  try {
    const response = await fetcher.post<T>(url, options.arg.formData);
    return { success: true, data: response };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};
