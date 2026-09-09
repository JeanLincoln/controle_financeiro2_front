import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type { CategoryFormParams } from "@/components/Form/Category/hooks/useCategoryForm.hook";
import type { SubCategory } from "@/entities/subCategory.entity";
import { useDeleteCategory } from "@/store/requests/category/useDeleteCategory.request";

import type { TransactionFormSchemaType } from "../../../TransactionForm.schema";
import { RELATION_GROUPS } from "../RelationSelection.component";

type UseCategoryRelationSelectionProps = {
  subCategories: SubCategory[];
};

export const useCategoryRelationSelection = ({
  subCategories
}: UseCategoryRelationSelectionProps) => {
  const { control, setValue } = useFormContext<TransactionFormSchemaType>();
  const { handleDeleteCategory, isLoading: isDeletingCategory } =
    useDeleteCategory();

  const [categoryDialogCategory, setCategoryDialogCategory] =
    useState<CategoryFormParams | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categoryPendingDeletion, setCategoryPendingDeletion] =
    useState<CategoryFormParams | null>(null);

  const categoriesIds = useWatch({
    control,
    name: RELATION_GROUPS.CATEGORIES
  });
  const subCategoriesIds = useWatch({
    control,
    name: RELATION_GROUPS.SUB_CATEGORIES
  });

  const openCategoryCreationDialog = () => {
    setCategoryDialogCategory(null);
    setIsCategoryDialogOpen(true);
  };

  const openCategoryEditionDialog = (category: CategoryFormParams) => {
    setCategoryDialogCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleCategoryDialogOpenChange = (isOpen: boolean) => {
    setIsCategoryDialogOpen(isOpen);

    if (!isOpen) {
      setCategoryDialogCategory(null);
    }
  };

  const toggleCategorySelection = (categoryId: number) => {
    const isRemovingCategory = categoriesIds.includes(categoryId);
    const updatedValues = isRemovingCategory
      ? categoriesIds.filter((selectedValue) => selectedValue !== categoryId)
      : [...categoriesIds, categoryId];

    setValue(RELATION_GROUPS.CATEGORIES, updatedValues, {
      shouldDirty: true
    });

    if (isRemovingCategory) {
      removeOrphanSubCategories(categoryId);
    }
  };

  const removeOrphanSubCategories = (removedCategoryId: number) => {
    const updatedSubCategoriesIds = subCategoriesIds.filter((subCategoryId) => {
      const subCategory = subCategories.find(
        (item) => item.id === subCategoryId
      );

      return subCategory?.categoryId !== removedCategoryId;
    });

    if (updatedSubCategoriesIds.length === subCategoriesIds.length) {
      return;
    }

    setValue(RELATION_GROUPS.SUB_CATEGORIES, updatedSubCategoriesIds, {
      shouldDirty: true
    });
  };

  const handleCategorySuccess = (categoryId?: number) => {
    if (categoryId) {
      toggleCategorySelection(categoryId);
    }

    handleCategoryDialogOpenChange(false);
  };

  const openCategoryDeletionDialog = (category: CategoryFormParams) => {
    setCategoryPendingDeletion(category);
  };

  const handleCategoryDeletionDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setCategoryPendingDeletion(null);
    }
  };

  const confirmCategoryDeletion = async () => {
    if (!categoryPendingDeletion) return;

    await handleDeleteCategory(categoryPendingDeletion.id);

    if (categoriesIds.includes(categoryPendingDeletion.id)) {
      const updatedValues = categoriesIds.filter(
        (selectedValue) => selectedValue !== categoryPendingDeletion.id
      );

      setValue(RELATION_GROUPS.CATEGORIES, updatedValues, {
        shouldDirty: true
      });
      removeOrphanSubCategories(categoryPendingDeletion.id);
    }

    setCategoryPendingDeletion(null);
  };

  return {
    categoryDialogCategory,
    isCategoryDialogOpen,
    openCategoryCreationDialog,
    openCategoryEditionDialog,
    handleCategoryDialogOpenChange,
    handleCategorySuccess,
    categoriesIds,
    toggleCategorySelection,
    categoryPendingDeletion,
    isDeletingCategory,
    openCategoryDeletionDialog,
    handleCategoryDeletionDialogOpenChange,
    confirmCategoryDeletion
  };
};
