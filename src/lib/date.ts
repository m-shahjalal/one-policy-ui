export const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!(d instanceof Date) || isNaN(d.getTime())) return "N/A";
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
