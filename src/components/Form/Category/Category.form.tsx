import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import { useShowAndHideSearchParamsClear } from "@/hooks/useShowAndHideSearchParamsClear.hook";
import { useFindCategoryById } from "@/store/requests/category/useFindCategoryById.request";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
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
    <div className="flex flex-col items-center justify-center w-full p-6 space-y-6 ">
      {isLoadingCategory && (
        <div className="flex items-center justify-center h-50">
          <LoadingSpinner variant="orbit" size="lg" />
        </div>
      )}
      {!isLoadingCategory && (
        <>
          <div className="w-full flex gap-6 ">
            <CategorySection category={category} />
            <SubCategorySection category={category} />
          </div>
        </>
      )}
    </div>
  );
}
