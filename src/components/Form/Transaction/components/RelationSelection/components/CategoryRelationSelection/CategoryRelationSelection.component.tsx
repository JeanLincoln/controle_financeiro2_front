import { CircleAlert, PackageOpen, Plus } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/Dialog/Dialog.component";
import { CategoryForm } from "@/components/Form/Category/Category.form";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner.component";
import type { Category } from "@/entities/category.entity";

import { useCategoryRelationSelection } from "../../hooks/useCategoryRelationSelection.hook";
import { RelationListHeader } from "../RelationListHeader/RelationListHeader.component";
import { RelationListState } from "../RelationListState/RelationListState.component";
import { RelationOptionCard } from "../RelationOptionCard/RelationOptionCard.component";

type CategoryRelationSelectionProps = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  setFetchRef: RelationFetchRef;
};

type RelationFetchRef =
  | ((node: HTMLDivElement | HTMLButtonElement | null) => void)
  | null;

export function CategoryRelationSelection({
  categories,
  isLoading,
  isError,
  onRetry,
  setFetchRef
}: CategoryRelationSelectionProps) {
  const {
    categoryDialogCategory,
    isCategoryDialogOpen,
    openCategoryCreationDialog,
    openCategoryEditionDialog,
    handleCategoryDialogOpenChange,
    handleCategorySuccess,
    toggleCategorySelection,
    categoriesIds
  } = useCategoryRelationSelection();

  return (
    <div className="space-y-4">
      <RelationListHeader
        title="Categorias"
        description="Escolha uma ou mais categorias para agrupar o lançamento."
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={openCategoryCreationDialog}
      >
        <Plus className="h-4 w-4" />
        Nova categoria
      </Button>
      {isLoading ? (
        <RelationListState
          icon={<LoadingSpinner variant="orbit" size="lg" />}
          title="Carregando categorias"
          description="Aguarde enquanto buscamos suas categorias."
        />
      ) : isError ? (
        <RelationListState
          icon={<CircleAlert className="text-destructive h-8 w-8" />}
          title="Não foi possível carregar as categorias"
          description="Tente novamente para exibir as categorias disponíveis."
          retryAction={onRetry}
        />
      ) : categories.length === 0 ? (
        <RelationListState
          icon={<PackageOpen className="text-muted-foreground h-8 w-8" />}
          title="Nenhuma categoria cadastrada"
          description="Cadastre categorias para organizar suas transações."
        />
      ) : (
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <RelationOptionCard
              key={category.id}
              option={category}
              isSelected={categoriesIds.includes(category.id)}
              onSelect={() => toggleCategorySelection(category.id)}
              onEdit={() => openCategoryEditionDialog(category)}
            />
          ))}
          <div ref={setFetchRef} className="h-px w-full" />
        </div>
      )}
      <Dialog
        open={isCategoryDialogOpen}
        onOpenChange={handleCategoryDialogOpenChange}
      >
        <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {categoryDialogCategory ? "Editar categoria" : "Nova categoria"}
            </DialogTitle>
            <DialogDescription>
              {categoryDialogCategory
                ? "Atualize os dados desta categoria."
                : "Preencha os dados para criar uma nova categoria."}
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            category={categoryDialogCategory ?? undefined}
            onSuccess={handleCategorySuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
