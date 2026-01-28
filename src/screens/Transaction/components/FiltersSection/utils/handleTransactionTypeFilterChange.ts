import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue
} from "react-hook-form";

import { TransactionType } from "@/entities/transaction.entity";

export const handleTransactionTypeFilterChange = <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  value?: TransactionType
) => {
  const clickFlow = {
    INCOME: TransactionType.EXPENSE,
    EXPENSE: "",
    EMPTY: TransactionType.INCOME
  };

  setValue(
    "type" as Path<T>,
    clickFlow[value || "EMPTY"] as PathValue<T, Path<T>>
  );
};
