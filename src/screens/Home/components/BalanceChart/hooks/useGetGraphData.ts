import { useLazyTransactionsGraphQuery } from "@/store/services/dashboard/dashboard.service";
import { handleRequest } from "@/utils/handleRequest";
import { toast } from "sonner";

interface RangeDateAPIProps {
  rangeDate: {
    from: Date;
    to: Date;
  };
}

export const useGetGraphData = () => {
  const [getGraphData, { data: graphData, isLoading }] =
    useLazyTransactionsGraphQuery();

  const fetchGraphData = async ({ rangeDate }: RangeDateAPIProps) => {
    const startDate = rangeDate.from;
    const endDate = rangeDate.to;
    const [error] = await handleRequest(
      getGraphData({ startDate, endDate }).unwrap()
    );

    if (error) {
      toast.error(
        "Houve um erro ao carregar os dados do gráfico. Tente novamente."
      );
      return;
    }
  };

  return {
    fetchGraphData,
    graphData,
    isLoading
  };
};
