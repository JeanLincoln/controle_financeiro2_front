import { useSearchParams } from "react-router";
import { toast } from "sonner";

import { handleInitialRangeDate } from "@/screens/Home/components/BalanceChart/utils/handleInitialDate.utils";
import { useTransactionsGraphQuery } from "@/store/services/dashboard/dashboard.service";

const { from, to } = handleInitialRangeDate();
const defaultFrom = from.toISOString();
const defaultTo = to.toISOString();

export function useGetTransactionGraphData() {
  const [params] = useSearchParams();

  const graphDate = params.get("graphDate");

  const [startDate, endDate] = graphDate
    ? graphDate.split("_")
    : [defaultFrom, defaultTo];

  const {
    data: graphData,
    isLoading,
    isError
  } = useTransactionsGraphQuery({
    startDate,
    endDate
  });

  if (isError) {
    toast.error(
      "Houve um erro ao buscar os dados do gráfico, tente novamente mais tarde!"
    );
  }

  return {
    graphData,
    isLoading
  };
}
