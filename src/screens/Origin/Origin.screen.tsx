import { StandardPagination } from "@/components/Pagination/Pagination.component";
import { useAppSearchParams } from "@/hooks/useAppSearchParams";
import { FiltersSection } from "./components/FiltersSection/FiltersSection.component";
import { HeaderSection } from "./components/Header/HeaderSection.component";
import { OriginAlertDialog } from "./components/OriginAlertDialog/OriginAlertDialog.component";
import { OriginDrawer } from "./components/OriginDrawer/OriginDrawer.drawer";
import { OriginsListSection } from "./components/OriginsListSection/OriginsListSection.component";
import { OriginsListSectionEmptyState } from "./components/OriginsListSection/OriginsListSectionEmptyState.empty-state";
import { OriginProviders } from "./components/providers/origin.providers";
import { useOriginScreen } from "./hooks/useOriginScreen.hook";

export default function OriginScreen() {
  const { handleAddKey, handleRemoveKey } = useAppSearchParams();

  const { form, dataIsLoading, dataIsEmpty, response, nameSearch } =
    useOriginScreen();

  return (
    <OriginProviders>
      <div className="container flex flex-col min-h-screen gap-4 p-6 mx-auto">
        <HeaderSection handleRemoveSearchParam={handleRemoveKey} />
        <FiltersSection form={form} />
        {dataIsEmpty && (
          <OriginsListSectionEmptyState nameSearch={nameSearch} />
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
      <OriginAlertDialog />
    </OriginProviders>
  );
}
