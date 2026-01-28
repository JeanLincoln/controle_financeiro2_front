import { format } from "date-fns";

export const formatDateToApi = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
