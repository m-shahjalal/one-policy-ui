import fetcher from "./fetcher";

export const createOrUpdatePolicy = async (
  url: string,
  options: { arg: { formData: FIX_ME } }
) => {
  try {
    const result = await fetcher.post(url, options.arg.formData);
    return result.data.data;
  } catch (error) {
    console.info("errors", error);
    return error;
  }
};
