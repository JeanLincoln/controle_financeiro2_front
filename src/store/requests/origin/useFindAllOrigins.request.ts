import { useState } from "react";
import { toast } from "sonner";

import { useFindAllOriginsQuery } from "@/store/services/origin/origin.service";
import type { OriginFindAllParams } from "@/store/services/origin/originService.types";

export function useFindAllOrigins() {
  const [filters, setFilters] = useState<OriginFindAllParams>({});
  const {
    data: origins,
    isLoading,
    isFetching,
    isError
  } = useFindAllOriginsQuery(filters);

  if (isError) {
    toast.error(
      "Houve um erro ao buscar as origens, tente novamente mais tarde!"
    );
  }

  return {
    origins,
    setOriginsFilters: setFilters,
    isLoading: isLoading || isFetching
  };
}
