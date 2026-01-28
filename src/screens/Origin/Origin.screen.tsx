import { StandardPagination } from "@/components/Pagination/Pagination.component";

import { FiltersSection } from "./components/FiltersSection/FiltersSection.component";
import { HeaderSection } from "./components/Header/HeaderSection.component";
import { OriginProviders } from "./components/OriginProviders/OriginProviders.provider";
import { OriginsListSection } from "./components/OriginsListSection/OriginsListSection.component";
import { OriginsListSectionEmptyState } from "./components/OriginsListSection/OriginsListSectionEmptyState.empty-state";
import { useOriginScreen } from "./hooks/useOriginScreen.hook";

export default function OriginScreen() {
  const { form, dataIsLoading, dataIsEmpty, response, nameSearch } =
    useOriginScreen();

  return (
    <OriginProviders>
      <div className="container mx-auto flex min-h-screen flex-col gap-4 p-6">
        <HeaderSection />
        <FiltersSection form={form} />
        {dataIsEmpty && (
          <OriginsListSectionEmptyState nameSearch={nameSearch} />
        )}
        {!dataIsEmpty && (
          <>
            <OriginsListSection
              loading={dataIsLoading}
              origins={response?.data}
            />
            <StandardPagination
              paginationProps={response?.pagination}
              onChangePage={(page: number) => form.setValue("page", page)}
            />
          </>
        )}
      </div>
    </OriginProviders>
  );
}
