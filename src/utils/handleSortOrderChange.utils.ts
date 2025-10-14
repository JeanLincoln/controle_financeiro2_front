import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue
} from "react-hook-form";

import { SortOrder } from "@/store/services/services.types";

export const handleSortOrderChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  value: SortOrder
) => {
  const clickFlow = {
    DESC: SortOrder.ASC,
    ASC: SortOrder.DESC
  };

  setValue("sortOrder" as Path<T>, clickFlow[value] as PathValue<T, Path<T>>);
};
