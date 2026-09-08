import { CircleAlert, PackageOpen, Plus } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/Dialog/Dialog.component";
import { SubCategoryForm } from "@/components/Form/SubCategory/SubCategory.form";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import type { Category } from "@/entities/category.entity";
import type { SubCategory } from "@/entities/subCategory.entity";

import { useSubCategoryRelationSelection } from "../../hooks/useSubCategoryRelationSelection.hook";
import { RelationListHeader } from "../RelationListHeader/RelationListHeader.component";
import { RelationListState } from "../RelationListState/RelationListState.component";
import { RelationOptionCard } from "../RelationOptionCard/RelationOptionCard.component";

type SubCategoryRelationSelectionProps = {
  categories: Category[];
  subCategories: SubCategory[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  setFetchRef: RelationFetchRef;
};

type RelationFetchRef =
  | ((node: HTMLDivElement | HTMLButtonElement | null) => void)
  | null;

export function SubCategoryRelationSelection({
  categories,
  subCategories,
  isLoading,
  isError,
  onRetry,
  setFetchRef
}: SubCategoryRelationSelectionProps) {
  const {
    subCategoryDialogSubCategory,
    isSubCategoryDialogOpen,
    openSubCategoryCreationDialog,
    openSubCategoryEditionDialog,
    handleSubCategoryDialogOpenChange,
    handleSubCategorySuccess,
    subCategoriesIds,
    categoriesIds,
    toggleSubCategorySelection
  } = useSubCategoryRelationSelection();
  const selectedCategories = categories.filter((category) =>
    categoriesIds.includes(category.id)
  );

  return (
    <div className="space-y-4">
      <RelationListHeader
        title="Subcategorias"
        description="Refine ainda mais a organização deste lançamento."
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={openSubCategoryCreationDialog}
      >
        <Plus className="h-4 w-4" />
        Nova subcategoria
      </Button>
      {isLoading ? (
        <RelationListState
          icon={<LoadingSpinner variant="orbit" size="lg" />}
          title="Carregando subcategorias"
          description="Aguarde enquanto buscamos as subcategorias."
        />
      ) : isError ? (
        <RelationListState
          icon={<CircleAlert className="text-destructive h-8 w-8" />}
          title="Não foi possível carregar as subcategorias"
          description="Tente novamente para exibir as subcategorias disponíveis."
          retryAction={onRetry}
        />
      ) : subCategories.length === 0 ? (
        <RelationListState
          icon={<PackageOpen className="text-muted-foreground h-8 w-8" />}
          title="Nenhuma subcategoria disponível"
          description="Não há subcategorias vinculadas às categorias selecionadas."
        />
      ) : (
        <div className="flex flex-wrap gap-3">
          {subCategories.map((subCategory) => (
            <RelationOptionCard
              key={subCategory.id}
              option={subCategory}
              isSelected={subCategoriesIds.includes(subCategory.id)}
              onSelect={() => toggleSubCategorySelection(subCategory.id)}
              onEdit={() =>
                openSubCategoryEditionDialog({
                  categories: selectedCategories,
                  subCategory,
                  onSuccess: handleSubCategorySuccess
                })
              }
            />
          ))}
          <div ref={setFetchRef} className="h-px w-full" />
        </div>
      )}
      <Dialog
        open={isSubCategoryDialogOpen}
        onOpenChange={handleSubCategoryDialogOpenChange}
      >
        <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {subCategoryDialogSubCategory
                ? "Editar subcategoria"
                : "Nova subcategoria"}
            </DialogTitle>
            <DialogDescription>
              {subCategoryDialogSubCategory
                ? "Atualize os dados desta subcategoria."
                : "Preencha os dados para criar uma nova subcategoria."}
            </DialogDescription>
          </DialogHeader>
          <SubCategoryForm
            categories={
              subCategoryDialogSubCategory?.categories ?? selectedCategories
            }
            subCategory={subCategoryDialogSubCategory?.subCategory}
            onSuccess={handleSubCategorySuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
