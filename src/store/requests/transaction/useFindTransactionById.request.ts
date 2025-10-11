import { useFindTransactionByIdQuery } from "@/store/services/transaction/transaction.service";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export function useFindTransactionById() {
  const [params] = useSearchParams();
  const id = params.get("id");

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
    transaction,
    isLoading: isLoading || isFetching
  };
}
