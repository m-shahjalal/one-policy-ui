import fetcher from "./fetcher";

export const createOrUpdatePolicy = async (
  url: string,
  options: { arg: { formData: FIX_ME } }
) => {
  try {
    return await fetcher.post<FIX_ME>(url, options.arg.formData);
  } catch (error) {
    console.info("errors", error);
    return error;
  }
};
