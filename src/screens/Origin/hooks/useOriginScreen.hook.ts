import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePromiseDebounce } from "@/hooks/usePromiseDebounce.hook";
import { useLazyFindAllOrigins } from "@/store/requests/origin/useLazyFindAllOrigins.request";

import {
  originFormDefaultValues,
  OriginFormSchema,
  type OriginFormSchemaType
} from "../components/FiltersSection/Origin.schema";

export function useOriginScreen() {
  const {
    data: response,
    isLoading,
    handleFetchOrigins
  } = useLazyFindAllOrigins();

  const form = useForm({
    resolver: zodResolver(OriginFormSchema),
    defaultValues: originFormDefaultValues
  });

  const { debounceLoading } = usePromiseDebounce<OriginFormSchemaType>({
    formWatch: form.watch,
    callback: handleFetchOrigins
  });

  const nameSearch = form.watch("name");
  const dataIsLoading = isLoading || debounceLoading;
  const dataIsEmpty =
    !dataIsLoading && (!response || response.data.length === 0);

  return {
    form,
    dataIsLoading,
    dataIsEmpty,
    response,
    nameSearch
  };
}
