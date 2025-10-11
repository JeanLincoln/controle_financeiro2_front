import { formatDateToApi } from "@/utils/formatDateToApi.utils";

export const validateRequestFields = (fields: Record<string, unknown>) =>
  Object.entries(fields).reduce(
    (acc, [key, value]) => {
      const isAnArray = value instanceof Array;

      if (!value || (isAnArray && !value.length)) return acc;

      if (value instanceof Date) {
        acc[key] = formatDateToApi(value);
        return acc;
      }

      if (isAnArray) {
        acc[`${key}[]`] = value;
        return acc;
      }

      acc[key] = value || undefined;
      return acc;
    },
    {} as Record<string, unknown>
  );
