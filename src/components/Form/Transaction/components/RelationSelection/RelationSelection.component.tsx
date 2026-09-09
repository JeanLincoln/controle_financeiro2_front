import type { RefObject } from "react";
import { Building2, FolderTree, Tags } from "lucide-react";

import type { OriginFormOrigin } from "@/components/Form/Origin/Origin.form";
import type { Category } from "@/entities/category.entity";
import type { SubCategory } from "@/entities/subCategory.entity";

import { CategoryRelationSelection } from "./components/CategoryRelationSelection/CategoryRelationSelection.component";
import { OriginRelationSelection } from "./components/OriginRelationSelection/OriginRelationSelection.component";
import { RelationButton } from "./components/RelationButton/RelationButton.component";
import { SubCategoryRelationSelection } from "./components/SubCategoryRelationSelection/SubCategoryRelationSelection.component";
import { useRelationSelection } from "./hooks/useRelationSelection.hook";

type RelationSelectionProps = {
  origins: OriginFormOrigin[];
  categories: Category[];
  subCategories: SubCategory[];
  isLoadingOrigins: boolean;
  isLoadingCategories: boolean;
  isLoadingSubCategories: boolean;
  isOriginsError: boolean;
  isCategoriesError: boolean;
  isSubCategoriesError: boolean;
  onRetryOrigins: () => void;
  onRetryCategories: () => void;
  onRetrySubCategories: () => void;
  relationListElement: RefObject<HTMLDivElement | null>;
  setOriginFetchRef: RelationFetchRef;
  setCategoryFetchRef: RelationFetchRef;
  setSubCategoryFetchRef: RelationFetchRef;
};

type RelationFetchRef =
  | ((node: HTMLDivElement | HTMLButtonElement | null) => void)
  | null;

export const RELATION_GROUPS = {
  ORIGIN: "originId",
  CATEGORIES: "categoriesIds",
  SUB_CATEGORIES: "subCategoriesIds"
} as const;

export function RelationSelection({
  origins,
  categories,
  subCategories,
  isLoadingOrigins,
  isLoadingCategories,
  isLoadingSubCategories,
  isOriginsError,
  isCategoriesError,
  isSubCategoriesError,
  onRetryOrigins,
  onRetryCategories,
  onRetrySubCategories,
  relationListElement,
  setOriginFetchRef,
  setCategoryFetchRef,
  setSubCategoryFetchRef
}: RelationSelectionProps) {
  const { openRelationGroup, toggleRelationGroup, canSelectSubCategories } =
    useRelationSelection();

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <RelationButton
          icon={<Building2 className="h-5 w-5" />}
          title="Origem"
          required
          isOpen={openRelationGroup === RELATION_GROUPS.ORIGIN}
          onClick={() => toggleRelationGroup(RELATION_GROUPS.ORIGIN)}
        />
        <RelationButton
          icon={<Tags className="h-5 w-5" />}
          title="Categorias"
          isOpen={openRelationGroup === RELATION_GROUPS.CATEGORIES}
          onClick={() => toggleRelationGroup(RELATION_GROUPS.CATEGORIES)}
        />
        <RelationButton
          icon={<FolderTree className="h-5 w-5" />}
          title="Subcategorias"
          isDisabled={!canSelectSubCategories}
          isOpen={openRelationGroup === RELATION_GROUPS.SUB_CATEGORIES}
          onClick={() => toggleRelationGroup(RELATION_GROUPS.SUB_CATEGORIES)}
        />
      </div>

      {openRelationGroup && (
        <div
          ref={relationListElement}
          className="bg-card h-100 overflow-y-auto rounded-xl border p-5"
        >
          {openRelationGroup === RELATION_GROUPS.ORIGIN && (
            <OriginRelationSelection
              origins={origins}
              isLoading={isLoadingOrigins}
              isError={isOriginsError}
              onRetry={onRetryOrigins}
              setFetchRef={setOriginFetchRef}
            />
          )}
          {openRelationGroup === RELATION_GROUPS.CATEGORIES && (
            <CategoryRelationSelection
              categories={categories}
              subCategories={subCategories}
              isLoading={isLoadingCategories}
              isError={isCategoriesError}
              onRetry={onRetryCategories}
              setFetchRef={setCategoryFetchRef}
            />
          )}
          {openRelationGroup === RELATION_GROUPS.SUB_CATEGORIES && (
            <SubCategoryRelationSelection
              categories={categories}
              subCategories={subCategories}
              isLoading={isLoadingSubCategories}
              isError={isSubCategoriesError}
              onRetry={onRetrySubCategories}
              setFetchRef={setSubCategoryFetchRef}
            />
          )}
        </div>
      )}
    </div>
  );
}
