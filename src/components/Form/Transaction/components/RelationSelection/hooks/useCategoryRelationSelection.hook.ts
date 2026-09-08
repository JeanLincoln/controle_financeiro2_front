import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type { CategoryFormParams } from "@/components/Form/Category/hooks/useCategoryForm.hook";

import type { TransactionFormSchemaType } from "../../../TransactionForm.schema";
import { RELATION_GROUPS } from "../RelationSelection.component";

export const useCategoryRelationSelection = () => {
  const { control, setValue } = useFormContext<TransactionFormSchemaType>();

  const [categoryDialogCategory, setCategoryDialogCategory] =
    useState<CategoryFormParams | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const categoriesIds = useWatch({
    control,
    name: RELATION_GROUPS.CATEGORIES
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
    const updatedValues = categoriesIds.includes(categoryId)
      ? categoriesIds.filter((selectedValue) => selectedValue !== categoryId)
      : [...categoriesIds, categoryId];

    setValue(RELATION_GROUPS.CATEGORIES, updatedValues, {
      shouldDirty: true
    });
  };

  const handleCategorySuccess = (categoryId?: number) => {
    if (categoryId) {
      toggleCategorySelection(categoryId);
    }

    handleCategoryDialogOpenChange(false);
  };

  return {
    categoryDialogCategory,
    isCategoryDialogOpen,
    openCategoryCreationDialog,
    openCategoryEditionDialog,
    handleCategoryDialogOpenChange,
    handleCategorySuccess,
    categoriesIds,
    toggleCategorySelection
  };
};
