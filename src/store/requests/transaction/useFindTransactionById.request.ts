import { toast } from "sonner";

import { useFindTransactionByIdQuery } from "@/store/services/transaction/transaction.service";

type UseFindTransactionByIdProps = {
  id?: string;
};

export function useFindTransactionById({ id }: UseFindTransactionByIdProps) {
  const {
    data: transaction,
    isLoading,
    isFetching,
    isError
  } = useFindTransactionByIdQuery({ id: Number(id) }, { skip: !id });

  if (isError) {
    toast.error("Houve um erro ao buscar a transação.");
  }

  return {
    transaction: id ? transaction : undefined,
    isLoading: isLoading || isFetching
  };
}
