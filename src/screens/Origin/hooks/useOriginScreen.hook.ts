import { usePromiseDebounce } from "@/hooks/usePromiseDebounce.hook";
import { useFindAllOrigins } from "@/store/requests/origin/useFindAllOrigins.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  OriginFormSchema,
  originFormDefaultValues,
  type OriginFormSchemaType
} from "../components/FiltersSection/origin.schema";

export function useOriginScreen() {
  const { data: response, isLoading, handleFetchOrigins } = useFindAllOrigins();

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
