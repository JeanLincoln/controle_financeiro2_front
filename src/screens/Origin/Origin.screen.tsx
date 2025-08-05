import { useLazyFindAllOriginsQuery } from "@/store/services/origin/origin.service";
import { FiltersSection } from "./components/FiltersSection/FiltersSection.component";
import { HeaderSection } from "./components/Header/HeaderSection.component";
import { OriginsListSection } from "./components/OriginsListSection/OriginsListSection.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  originFormDefaultValues,
  OriginFormSchema,
  type OriginFormSchemaType
} from "./components/FiltersSection/origin.schema";
import { usePromiseDebounce } from "@/hooks/usePromiseDebounce.hook";
import { StandardPagination } from "@/components/Pagination/Pagination.component";
import { OriginsListSectionEmptyState } from "./components/OriginsListSection/OriginsListSectionEmptyState.empty-state";
import { Drawer } from "@/components/Drawer/Drawer.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import { OriginDrawer } from "./components/OriginDrawer/OriginDrawer.drawer";

export default function OriginScreen() {
  const { handleAddKey, handleRemoveKey } = useAppSearchParams();
  const [fetchOriginsTrigger, { data: response, isLoading }] =
    useLazyFindAllOriginsQuery();

  const form = useForm({
    resolver: zodResolver(OriginFormSchema),
    defaultValues: originFormDefaultValues
  });

  const { debounceLoading } = usePromiseDebounce<OriginFormSchemaType>({
    formWatch: form.watch,
    callback: fetchOriginsTrigger
  });

  const nameSearch = form.watch("name");
  const dataIsLoading = isLoading || debounceLoading;
  const dataIsEmpty =
    !dataIsLoading && (!response || response.data.length === 0);

  return (
    <Drawer>
      <div className="container flex flex-col min-h-screen gap-4 p-6 mx-auto">
        <HeaderSection handleRemoveSearchParam={handleRemoveKey} />
        <FiltersSection form={form} />
        {dataIsEmpty && (
          <OriginsListSectionEmptyState>
            <span className="text-muted-foreground">
              {nameSearch
                ? "Não foi encontrada nenhuma origem com este nome"
                : "Não há origens cadastradas, crie uma!"}
            </span>
          </OriginsListSectionEmptyState>
        )}
        {!dataIsEmpty && (
          <>
            <OriginsListSection
              loading={dataIsLoading}
              origins={response?.data}
              handleAddSearchParam={handleAddKey}
            />
            <StandardPagination
              paginationProps={response?.pagination}
              onChangePage={(page: number) => form.setValue("page", page)}
            />
          </>
        )}
      </div>
      <OriginDrawer />
    </Drawer>
  );
}
