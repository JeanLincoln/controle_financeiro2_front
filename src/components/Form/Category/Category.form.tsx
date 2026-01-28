import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { useShowAndHideSearchParamsClear } from "@/hooks/useShowAndHideSearchParamsClear.hook";
import { useFindCategoryById } from "@/store/requests/category/useFindCategoryById.request";

import { CategorySection } from "./CategorySection/CategorySection.component";
import { SubCategorySection } from "./SubCategorySection/SubCategorySection.component";

export const CATEGORY_ID_FORM_KEY = "category_id";
export const SUB_CATEGORY_ID_FORM_KEY = "sub_category_id";

export function CategoryForm() {
  const [params] = useSearchParams();
  const id = params.get(CATEGORY_ID_FORM_KEY);

  const {
    idParam,
    getCategory,
    isLoading: isLoadingCategory,
    category
  } = useFindCategoryById({ id });

  useEffect(() => {
    getCategory();
  }, [idParam]);

  useShowAndHideSearchParamsClear({
    clearOnUnmount: [CATEGORY_ID_FORM_KEY, SUB_CATEGORY_ID_FORM_KEY]
  });

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-6 p-6">
      {isLoadingCategory && (
        <div className="flex h-50 items-center justify-center">
          <LoadingSpinner variant="orbit" size="lg" />
        </div>
      )}
      {!isLoadingCategory && (
        <>
          <div className="flex w-full gap-6">
            <CategorySection category={category} />
            <SubCategorySection category={category} />
          </div>
        </>
      )}
    </div>
  );
}
