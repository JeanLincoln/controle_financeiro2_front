import { useLazyTransactionsGraphQuery } from "@/store/services/dashboard/dashboard.service";
import { handleRequest } from "@/utils/handleRequest.utils";
import * as dateFns from "date-fns";
import { useCallback } from "react";
import { toast } from "sonner";

type RangeDateAPIProps = {
  rangeDate: {
    from: Date;
    to: Date;
  };
};

export function useGetTransactionGraphData() {
  const [getGraphData, { data: graphData, isLoading }] =
    useLazyTransactionsGraphQuery();

  const fetchGraphData = useCallback(
    async ({ rangeDate }: RangeDateAPIProps) => {
      const preferCacheValue = true;

      const startDate = dateFns.format(rangeDate.from, "yyyy-MM-dd");
      const endDate = dateFns.format(rangeDate.to, "yyyy-MM-dd");

      const [error] = await handleRequest(
        getGraphData({ startDate, endDate }, preferCacheValue).unwrap()
      );

      if (error) {
        toast.error(
          "Houve um erro ao carregar os dados do gráfico. Tente novamente."
        );
        return;
      }
    },
    [getGraphData]
  );

  return {
    fetchGraphData,
    graphData,
    isLoading
  };
}
