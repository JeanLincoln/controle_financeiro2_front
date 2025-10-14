import { StandardPagination } from "@/components/Pagination/Pagination.component";

import { CategoriesListSection } from "./components/CategoriesListSection/CategoriesListSection.component";
import { CategoriesListSectionEmptyState } from "./components/CategoriesListSection/CategoriesListSectionEmptyState.empty-state";
import { CategoryProviders } from "./components/CategoryProviders/CategoryProviders.provider";
import { FiltersSection } from "./components/FiltersSection/FiltersSection.component";
import { HeaderSection } from "./components/Header/HeaderSection.component";
import { useCategoryScreen } from "./hooks/useCategoryScreen.hook";

export default function CategoryScreen() {
  const { form, dataIsLoading, dataIsEmpty, response, nameSearch } =
    useCategoryScreen();

  return (
    <CategoryProviders>
      <div className="container mx-auto flex min-h-screen flex-col gap-4 p-6">
        <HeaderSection />
        <FiltersSection form={form} />
        {dataIsEmpty && (
          <CategoriesListSectionEmptyState nameSearch={nameSearch} />
        )}
        {!dataIsEmpty && (
          <>
            <CategoriesListSection
              loading={dataIsLoading}
              categories={response?.data}
            />
            <StandardPagination
              paginationProps={response?.pagination}
              onChangePage={(page: number) => form.setValue("page", page)}
            />
          </>
        )}
      </div>
    </CategoryProviders>
  );
}
