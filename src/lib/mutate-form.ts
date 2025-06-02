import fetcher from "./fetcher";

export const createOrUpdatePolicy = async (
  url: string,
  options: { arg: { formData: FIX_ME } }
) => {
  console.info("data", url, options);
  const result = await fetcher.post(url, options.arg.formData);
  return result;
};
